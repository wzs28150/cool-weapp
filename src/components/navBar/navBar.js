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
			observer: function(newVal) {},
		},
	},
	data: {
		list: [],
	},
	methods: {
		init: function() {
			let that = this;
			that.setData({
				flag: false,
			});
			if (app.globalData.navbar.length > 0) {
				that.setData({
					list: app.globalData.navbar
				});
			} else {
				util
					.get(app.globalData.api + '/index/navbar')
					.then((res) => {
						let data = res.data;
						app.globalData.navbar = data.data
						that.setData({
							list: data.data
						});
					})
					.catch(() => {});
			}

		},
		change: function(flag) {
			let that = this;
			that.setData({
				flaga: flag,
			});
		},
		hide: function() {
			let that = this;
			that.setData({
				flag: false,
			});
		},
	},
	ready: function() {
		this.init();
	},
});
