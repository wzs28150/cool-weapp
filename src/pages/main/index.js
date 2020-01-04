import {
	flow
} from 'lodash';
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		swiper: {
			duration: 1000,
			current: 1
		},
		num: 1,
		flag: false,
		pageList: []
	},
	async onLoad () {
		await delay();
	},
	async onShow () {
		await delay();
		let that = this;
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
		switch (id){
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
		console.log(that.data.pageList[0].title)
		wx.setNavigationBarTitle({
			title: that.data.pageList[0].title
		})
	},
	page1() {
		let that = this
		console.log(that.data.pageList[1].title)
		wx.setNavigationBarTitle({
			title: that.data.pageList[1].title
		})
	},
	page2() {
		let that = this
		console.log(that.data.pageList[2].title)
		wx.setNavigationBarTitle({
			title: that.data.pageList[2].title
		})
	},
	swiperCallback(e){
		console.log(e.detail.id)
		let that = this
		let swiper = that.data.swiper;
		swiper.current = e.detail.id
		that.setData({
			num: e.detail.id,
			swiper: swiper
		});
		that.page(e.detail.id)
	}
});
