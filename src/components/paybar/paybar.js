import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		sfk: {
			type: String,
			value: '0.00',
		},
		dikou: {
			type: String,
			value: '0.00',
		},
		index: {
			type: Number,
			value: 1,
		},
		text: {
			type: String,
			value: '提交订单',
		},
	},
	data: {
		list: [],
	},
	methods: {
		gopay: function () {
			this.triggerEvent('gopay');
		},
	},
	ready: function () {},
});
