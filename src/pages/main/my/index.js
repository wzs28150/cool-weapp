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
		context: null
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
		canvasLoad() {
			var canvas = {
				width: 300,
				height: 300,
			};
			var boHeight = canvas.height / 10;
			var posHeight = canvas.height / 1.2;
			//初始角度为0
			var step = 0;
			//定义三条不同波浪的颜色
			var lines = ["rgba(255,255,255, 0.2)",
				"rgba(255,255,255, 0.2)",
				"rgba(255,255,255, 0.2)"
			];
			var context = wx.createContext();
			let requestAnimFrame = (function () {
				return function (callback) {
					setTimeout(callback, 1000 / 60);
				};
			})();

			function loop () {
				context.clearRect(0, 0, canvas.width, canvas.height);
				step++;
				//画3个不同颜色的矩形
				for (var j = lines.length - 1; j >= 0; j--) {
					context.fillStyle = lines[j];
					//每个矩形的角度都不同，每个之间相差45度
					var angle = (step + j * 50) * Math.PI / 180;
					var deltaHeight = Math.sin(angle) * boHeight;
					var deltaHeightRight = Math.cos(angle) * boHeight;
					context.beginPath();
					context.moveTo(0, posHeight + deltaHeight);
					context.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight +
						deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
					context.lineTo(canvas.width, canvas.height);
					context.lineTo(0, canvas.height);
					context.lineTo(0, posHeight + deltaHeight);
					context.closePath();
					context.fill();
				}
				wx.drawCanvas({
					canvasId: 'canvas',
					actions: context.getActions()
				})

				requestAnimFrame(loop);
			}
			loop();
		},
		getRandomNum() {
			return Math.random() * (this.data.width - this.data.radius * 2) + this.data.radius;
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
		that.canvasLoad()

		if (wx.getStorageSync("token")) {
			that.init();
		}
	}
});
