import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		item: {
			type: Object,
			value: {},
		},
		type: {
			type: String,
			value: {},
		}
	},
	data: {},
	methods: {
		init: function () {
			let that = this;
		},
		goInfo: function () {
			wx.navigateTo({
				url: '/pages/' + this.data.type + '/info/index?id=' + this.data.item.id,
			});
		}
	},
	ready: function () {
		this.init();
	}
});
