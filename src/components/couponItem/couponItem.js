import util from '../../utils/util.js';

const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		item: {
			type: Object,
			value: {},
		},
	},
	data: {},
	methods: {
		hexiao(e) {
			this.triggerEvent('hexiao', { id: e.currentTarget.dataset.id });
		},
		del(e) {
			this.triggerEvent('del', { id: e.currentTarget.dataset.id });
		},
	},
	ready: function () {},
});
