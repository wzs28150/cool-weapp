import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		num: {
			type: Number,
			value: 0,
		},
		flag: {
			type: Boolean,
			value: false,
			observer: function (newVal) {
				console.log(newVal);
			},
		},
	},
	data: {
		list: [],
	},
	methods: {
		init: function () {
			let that = this;
			that.setData({
				flag: false,
			});
			util.get(app.globalData.api + '/index/navbar').then((res) => {
				let data = res.data;
				that.setData({
					list: data.data,
				});
			}).catch(() => {});
		},
		change: function (flag) {
			let that = this;
			that.setData({
				flaga: flag,
			});
		},
		hide: function () {
			let that = this;
			that.setData({
				flag: false,
			});
		},
	},
	ready: function () {
		this.init();
	},
});
