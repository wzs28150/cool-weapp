const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		userInfo: {},
		userList: [{
				title: "测试链接1",
				path: "/pages/me/coupon/index",
				icon: "icon1"
			},
			{
				title: "测试链接2",
				path: "/pages/me/business/form/index",
				icon: "icon2"
			}
		]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getData() {
			let that = this;
			setTimeout(() => {
				if (app.globalData.userInfo) {
					that.setData({
						userInfo: app.globalData.userInfo
					});
				} else {
					// app.userInfoReadyCallback = (res) => {
					// 	console.log(res)
					// }
					app.checkSession().then(function (res) {
						that.setData({
							userInfo: res
						});
					}).catch(function (err) {
						console.log(err)
					})
				}
			}, 500)
		},
		getUserInfo(e) {
			console.log(e)
			let that = this
			app.checkSession().then(function (res) {
				that.setData({
					userInfo: res
				});
			}).catch(function (err) {
				console.log(err)
			})
			// this.setData({
			// 	userInfo: e.detail.userInfo
			// });
		}
	},
	ready: function () {
		let that = this;
		if (wx.getStorageSync("token")) {
			that.getData();
		}
	}
});
