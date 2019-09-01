import util from '../../utils/util.js';
const app = getApp();
Component({
	options: {
		multipleSlots: true
	},
	properties: {
		page: {
			type : Number,
			value: 0
		},
		isRefreshLoading: {
			type : Boolean,
			value: false
		},
		isLoadMoreLoading: {
			type : Boolean,
			value: false
		},
		isEmpty: {
			type : Number,
			value: 0
		},
		stylestr: {
			type : String,
			value: 0
		}
	},
	data: {
		lastX: 0,
		lastY: 0
	},
	methods: {
		upper: function () {
			this.setData({
				isRefreshLoading: true
			})
			this.triggerEvent('upper', {
				page: this.data.page
			})
		},
		lower: function () {
			this.triggerEvent('lower', {
				page: this.data.page
			})
		},
		scroll: function (e) {
			// console.log(e);
			this.setData({
				isLoadMoreLoading: true
			})
		}
	},
	ready: function () {

	}
});
