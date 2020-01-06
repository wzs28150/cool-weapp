/**
 * globalData     obj	     公共数据
 * userInfo	      obj      用户信息
 * navbar         obj      底部菜单数据
 * checkSession   function 检查是否登录
 * initLoginState function 已授权自动登录
 */
import {
	getNavList,
	getMyInfo,
	dologin
} from '@/api/common.js'
App({
	onLaunch() {
		let that = this;
		if (wx.getStorageSync("token")) {
			that
				.checkSession()
				.then(function (res) {})
				.catch(function (err) {
					that.initLoginState();
				});
		}
		that.getNav()
	},
	globalData: {
		userInfo: null,
		navbar: []
	},
	checkSession: function () {
		const that = this;
		var promise = new Promise((resolve, reject) => {
			wx.checkSession({
				success: () => {
					// session 未过期，并且在本生命周期一直有效
					that.globalData.token = wx.getStorageSync("token");
					getMyInfo().then(res => {
							let userInfo = res.user_info;
							that.globalData.userInfo = userInfo;
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(userInfo)
							}
							resolve(userInfo);
						})
						.catch(err => {
							reject(err);
						});
				},
				fail: e => {
					reject(e);
				}
			});
		});
		return promise;
	},
	initLoginState: function () {
		const that = this;
		var promise = new Promise((resolve, reject) => {
			wx.login({
				success: (result) => {
					console.log(result);
					wx.getSetting({
						success: (res) => {
							// console.log(
							// 	'是否授权',
							// 	res.authSetting['scope.userInfo'] !== undefined,
							// );
							if (res.authSetting['scope.userInfo'] !== undefined) {
								// console.log('已授权');
								wx.getUserInfo({
									lang: 'zh_CN',
									success: (e) => {
											dologin({
												code: result.code,
												nickname: e.userInfo.nickName,
												avatarUrl: e.userInfo.avatarUrl,
											}).then((resu) => {
												wx.setStorageSync('token', resu.data.token);
												resolve(resu);
											})
											.catch((err) => {
												reject(err);
											});
									},
								});
							} else {
								reject(res);
							}
						}
					});
				}
			});
		});
		return promise;
	},
	getNav() {
		let that = this
		getNavList().then((res) => {
				that.globalData.navbar = res.data
				if (this.getNavReadyCallback) {
					this.getNavReadyCallback(res.data);
				}
			})
			.catch(() => {});
	}
});
