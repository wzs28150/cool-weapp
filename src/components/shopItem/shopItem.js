import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		item: {
			type: Object,
			value: {},
		},
	},
	data: {
		starpic: 'http://api.coolwl.net/chwl/public/uploads/star.png',
	},
	methods: {
		init: function () {},
		goInfo: function (e) {
			wx.navigateTo({
				url: '/pages/shop/index?id=' + this.data.item.seller_id,
			});
		},
		getUserInfo: function (e) {
			this.triggerEvent('reload');
		},
	},
});
