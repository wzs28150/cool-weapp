import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		top: {
			type: String,
			value: 0,
		},
		bottom: {
			type: String,
			value: 0,
		},
		left: {
			type: String,
			value: 0,
		},
		right: {
			type: String,
			value: 0,
		},
		tip: {
			type: String,
			value: 0,
		},
	},
	data: {
		isTipShow: false,
	},
	methods: {
		close: function () {
			this.triggerEvent('close');
		},
	},
	ready: function () {},
});
