const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp();

Page({
	data: {},
	async onLoad() {
		await delay();
	},
	onShow() {
		app.checkSession();
	},
});
