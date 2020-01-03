import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		num: 1,
		flag: false,
	},
	async onLoad() {
		await delay();
	},
	async onShow() {
		await delay();
		let that = this;
		setTimeout(function () {
			that.setData({
				flag: true,
			});
		}, 1000);
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
