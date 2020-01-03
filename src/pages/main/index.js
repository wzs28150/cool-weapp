import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		swiper: {
		  duration: 1000,
		  current: 0
		},
		num: 0,
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
	animationfinish(e){
		console.log(e)
	}
});
