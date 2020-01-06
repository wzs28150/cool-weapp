const delay = (t = 0) => new Promise(resolve => setTimeout(resolve, t));
const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		param: {
			type: Object,
			value: {},
		},
	},
	data: {
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
	},
	methods: {
		getUserInfo: function (e) {
			let that = this;
			if (e.detail.userInfo) {
				app.globalData.userInfo = e.detail.userInfo;
				that.setData({
					userInfo: e.detail.userInfo,
					hasUserInfo: true,
				});
				wx.showLoading({
					title: '加载中',
				});
				app.initLoginState().then(function (res) {
					if (res.statusCode == 1) {
						app.checkSession().then(function (data) {
							if (that.data.param) {
								that.triggerEvent("getUserInfo", {
									param: that.data.param
								});
							} else {
								that.triggerEvent("getUserInfo");
							}
							wx.hideLoading();
						}).catch(function (err) {
							console.log(err)
						})
					}
				}).catch(function (err) {
					console.log(err)
				})
			}
		},
		changeStatus() {
			setTimeout(()=>{
				if (app.globalData.userInfo) {
					this.setData({
						hasUserInfo: true
					})
				} else if (this.data.canIUse) {
					app.userInfoReadyCallback = res => {
						this.setData({
							hasUserInfo: true
						})
					}
				} else {
					wx.getUserInfo({
						success: res => {
							app.globalData.userInfo = res.userInfo
							this.setData({
								hasUserInfo: true
							})
						}
					})
				}
			},500)
		}
	},
	ready: function () {
		this.changeStatus()
	},
});
