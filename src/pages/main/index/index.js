import {
	flow
} from 'lodash';
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));
const app = getApp();

Page({
	data: {
		swiper: {
			duration: 1000,
			current: 2
		},
		num: 2,
		flag: false,
		isTipShow: false,
		pageList: []
	},
	async onLoad () {
		await delay();
		this.position = {
			x: 150,
			y: 150,
			vx: 2,
			vy: 2
		}
		this.x = -100

		// 通过 SelectorQuery 获取 Canvas 节点
		let query = wx.createSelectorQuery().in(this)
			.select('#canvas')
			.fields({
				node: true,
				size: true,
			})
			console.log(query)

	},
	init(res){
		console.log(res)
	},
	async onShow () {
		await delay();
		let that = this;
		if (wx.getStorageSync('isTipShow')) {
			this.setData({
				isTipShow: true
			})
		}
		setTimeout(function () {
			that.setData({
				flag: true,
			});
		}, 1000);
		if (app.globalData.navbar && app.globalData.navbar != '') {
			that.setData({
				pageList: app.globalData.navbar
			});
			that.page(that.data.num)
		} else {
			app.getNavReadyCallback = (res) => {
				that.setData({
					pageList: res
				});
				that.page(that.data.num)
			};
		}
	},
	animationfinish(e) {
		let that = this
		that.setData({
			num: e.detail.current
		});
		that.page(e.detail.current)
	},
	page(id) {
		let that = this
		switch (id) {
			case 0:
				that.page0()
				break;
			case 1:
				that.page1()
				break;
			case 2:
				that.page2()
				break;
			default:
				that.page0()
				break;
		}
	},
	page0() {
		let that = this
		wx.setNavigationBarTitle({
			title: that.data.pageList[0].title
		})
		let index = that.selectComponent('#index');
		index.init()
	},
	page1() {
		let that = this
		wx.setNavigationBarTitle({
			title: that.data.pageList[1].title
		})
		let list = that.selectComponent('#list');
		list.init()
	},
	page2() {
		let that = this
		wx.setNavigationBarTitle({
			title: that.data.pageList[2].title
		})
		let me = that.selectComponent('#me');
		if (wx.getStorageSync("token")) {
			me.init()
		}
	},
	swiperCallback(e) {
		console.log(e.detail.id)
		let that = this
		let swiper = that.data.swiper;
		swiper.current = e.detail.id
		that.setData({
			num: e.detail.id,
			swiper: swiper
		});
		that.page(e.detail.id)
	},
	close: function () {
		wx.setStorageSync('isTipShow', true);
		this.setData({
			isTipShow: true
		})
	}
});
