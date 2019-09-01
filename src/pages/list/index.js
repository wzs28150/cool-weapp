import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		num:1,
		flag: false
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs',
		});
	},
	async onLoad() {
		await delay();
		const log = flow(() => {
			console.log('is wechat mini program: ', __WECHAT__);
			console.log('is alipay mini program: ', __ALIPAY__);
			console.log('DEV: ', __DEV__);
		});

		log();
	},
	async onShow() {
		await delay();
		let that = this;
		setTimeout(function () {
			that.setData({
				flag: true
			})
		},1000)
	},
	// async onHide() {
	// 	await delay();
	// 	let that = this;
	// 	setTimeout(function () {
	// 		that.setData({
	// 			flag: false
	// 		})
	// 	},200)
	// }
});
