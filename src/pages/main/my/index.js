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
		],
		radius: 60,
		width: 0,
		height: 0,
		context: null,
		// 开始角度
		startAngle: -(1 / 2 * Math.PI),
		// 结束角度
		endAngle: 3 / 2 * Math.PI,
		// 偏移角度
		xAngle: Math.PI / 180
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		init() {
			let that = this;
			setTimeout(() => {
				let loginPannel = that.selectComponent('.loginPannel');
				loginPannel.changeStatus();
				if (app.globalData.userInfo) {
					that.setData({
						userInfo: app.globalData.userInfo
					});
				} else {
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
				console.log(res)
				that.setData({
					userInfo: res
				});
			}).catch(function (err) {
				console.log(err)
			})
		},
		canvasLoad(res) {
			let that = this;
			console.log(res)
			const ctx = wx.createCanvasContext('canvas', this);
			// Draw coordinates
			ctx.arc(that.getRandomNum(), that.getRandomNum(), 60, 0, 2 * Math.PI)
			ctx.setFillStyle('rgba(255,255,255,0.2)')
			ctx.fill()
			ctx.arc(that.getRandomNum(), that.getRandomNum(), 60, 0, 2 * Math.PI)
			ctx.setFillStyle('rgba(255,255,255,0.2)')
			ctx.fill()
			ctx.arc(that.getRandomNum(), that.getRandomNum(), 60, 0, 2 * Math.PI)
			ctx.setFillStyle('rgba(255,255,255,0.2)')
			ctx.fill()
			ctx.draw()
		},
		getRandomNum() {
			return Math.random() * (this.data.width - this.data.radius * 2) + this.data.radius;
			const ctx = wx.createCanvasContext('canvas', this);
			// Draw coordinates
			ctx.arc(100, 75, 50, 0, 2 * Math.PI)
			ctx.setFillStyle('rgba(255,255,255,0.2)')
			ctx.fill()
			ctx.draw()
		},
		clearCanvas() {
			if (this.data.context) {
				this.data.context.clearRect(0, 0, this.data.width, this.data.height);
			}
		}
	},

	ready: function () {
		let that = this;
		wx.getSystemInfo({
			success: res => {
				that.setData({
					width: res.screenWidth,
					height: res.screenHeight
				});
			}
		})
		// wx.createSelectorQuery().in(this)
		// 	.select('#canvas')
		// 	.fields({
		// 		node: true,
		// 	})
		// 	.exec(this.canvasLoad.bind(this))
		const query = wx.createSelectorQuery().in(this)
		setTimeout(function () {
			query.select('#canvas').boundingClientRect(function (res) {
				console.log(res)
			}).exec()
		}, 1000)
		if (wx.getStorageSync("token")) {
			that.init();
		}
	}
});
