import util from '../../utils/util.js';
const app = getApp();
Component({
	properties: {
		item: {
			type: Object,
			value: {}
		}
	},
	data: {

	},
	methods: {
		init: function () {
			// let that = this;
		},
		goToInfo: function () {
			wx.navigateTo({
				url: '/pages/class/' + this.data.item.type + '/index?id=' + this.data.item.id,
			});
		}
	},
	ready: function () {
		this.init();

	}
});
