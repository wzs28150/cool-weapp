import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		item: {
			type: Object,
			value: {},
		},
	},
	data: {},
	methods: {
		init: function () {},
		goInfo: function (e) {
			wx.navigateTo({
				url: this.data.item.url
			});
		},
		getUserInfo: function (e) {
			this.triggerEvent('reload');
		},
	},
});
