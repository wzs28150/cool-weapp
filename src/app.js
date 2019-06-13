import {
	camelCase
} from 'lodash';
import util from 'utils/util.js';
App({
	onLaunch() {
		this.checkSession();
	},
	checkSession: function() {
		const that = this;
		wx.checkSession({
			success: () => {
				//session 未过期，并且在本生命周期一直有效
				that.globalData.token = wx.getStorageSync('token');
				util.get(that.globalData.api + '/oauth').then(response => {
					let data = response.data.data;
					if (response.data.code == 200) {
						wx.setStorageSync('userInfo', data);
						wx.reLaunch({
							url: '/pages/main/index'
						})
					} else {
						that.initLoginState();
					}
				}).catch(err => {
					console.log(`自动登录失败, 重新登录`)
					that.initLoginState();
				})
				that.globalData.userInfo = wx.getStorageSync('userInfo');
			},
			fail: (e) => {
				console.log(e);
				that.initLoginState();
			}
		});
	},
	initLoginState: function() {
		const that = this;
		// 登录
		wx.login({
			success: (result) => {
				console.log(result);
				// 调用获取用户信息接口
				wx.getSetting({
					success: (res) => {
						console.log('是否授权', res.authSetting['scope.userInfo'] !== undefined);
						if (res.authSetting['scope.userInfo'] !== undefined) {
							console.log('已授权');
							//检查token 获取用户信息
							wx.getUserInfo({
								lang: 'zh_CN',
								success: (e) => {
									// 发送 res.code 到后台换取 openId, sessionKey, unionId
									// console.log(e);
									util.login(that.globalData.api + '/oauth/login', {
										code: result.code,
										encryptedData: e.encryptedData,
										iv: e.iv,
										rawData: e.rawData,
										signature: e.signature
									}).then(res => {
										let data = res.data;
										console.log(data);
										if (data.code == 200) {
											wx.setStorageSync('token', data.data.token);
											wx.setStorageSync('userInfo', data.data.user_info);
											that.checkSession();
										}
									})
								}
							});
						} else {
							console.log('未授权');
							wx.navigateTo({
								url: '/pages/common/auth/index?code=' + result.code
							})
						}
					}
				})
			}
		});
	},
	globalData: {
		token: '',
		userInfo: null,
		api: 'https://api.hrbkcwl.com/coolweapp/api',
		appName: 'Cool小程序框架'
	},
});
