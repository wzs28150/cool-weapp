import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		type: {
			type: String,
			value: '',
		},
		focus: {
			type: Boolean,
			value: '',
		},
	},
	data: {
		list: [],
	},
	methods: {
		init: function () {
			let that = this;
		},
		bindKeyInput: function (e) {
			this.triggerEvent('KeyInput', {
				key: e.detail.value,
			});
		},
	},
	ready: function () {
		this.init();
	},
});
