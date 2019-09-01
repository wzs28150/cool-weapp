import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		flag: {
			type: Boolean,
			value: false,
			observer: function(newVal) {
				// console.log(newVal);
			},
		},
		position: {
			type: String,
			value: 'fixed',
			observer: function(newVal) {
				// console.log(newVal);
			},
		},
		bgColor: {
			type: String,
			value: '#fff',
			observer: function(newVal) {
				// console.log(newVal);
			},
		},
		loadColor: {
			type: String,
			value: '#3783e3',
			observer: function(newVal) {
				// console.log(newVal);
			},
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
		},
		change: function(flag) {
			let that = this;
			that.setData({
				flag: flag,
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
