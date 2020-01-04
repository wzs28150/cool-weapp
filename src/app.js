import util from 'utils/util.js';

App({
	onLaunch() {
		let that = this;
		if (wx.getStorageSync("token")) {
			this
				.checkSession()
				.then(function (res) {})
				.catch(function (err) {
					console.log(err)
					that.initLoginState();
				});
		}
		this.getNav()

	},
	globalData: {
		userInfo: null,
		navbar: [],
		api: 'http://114.115.177.23:9090/mock/68/api',
		appName: 'Cool小程序框架'
	},
	checkSession: function (url = "") {
		const that = this;
		var promise = new Promise((resolve, reject) => {
			wx.checkSession({
				success: () => {
					// session 未过期，并且在本生命周期一直有效
					that.globalData.token = wx.getStorageSync("token");
					util
						.get(that.globalData.api + "/myInfo")
						.then(response => {
							let data = response.data;
							if (data.statusCode == 1) {
								let userInfo = data.user_info;
								that.globalData.userInfo = userInfo;
								if (this.userInfoReadyCallback) {
									this.userInfoReadyCallback(userInfo)
								}
								resolve(data);
							} else {
								// that.initLoginState();
								reject(data);
							}
						})
						.catch(err => {
							// that.initLoginState();
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
					// 调用获取用户信息接口
					wx.getSetting({
						success: (res) => {
							console.log(
								'是否授权',
								res.authSetting['scope.userInfo'] !== undefined,
							);
							if (res.authSetting['scope.userInfo'] !== undefined) {
								console.log('已授权');
								// 检查token 获取用户信息
								wx.getUserInfo({
									lang: 'zh_CN',
									success: (e) => {
										util
											.login(that.globalData.api + '/login', {
												code: result.code,
												nickname: e.userInfo.nickName,
												avatarUrl: e.userInfo.avatarUrl,
											})
											.then((res) => {
												let data = res.data;
												wx.setStorageSync('token', data.token);
												resolve(data);
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
		util
			.get(that.globalData.api + '/index/navbar')
			.then((res) => {
				let data = res.data;
				that.globalData.navbar = data.data
				if (this.getNavReadyCallback) {
					this.getNavReadyCallback(data.data);
				}
			})
			.catch(() => {});

	}
});
