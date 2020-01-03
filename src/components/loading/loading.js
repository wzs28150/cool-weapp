import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		flag: {
			type: Boolean,
			value: false,
			observer: function (newVal, oldVal) {
				// console.log(newVal);
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
		},
		change: function (flag) {
			let that = this;
			that.setData({
				flag: flag,
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
		// this.init();
	},
});
