import util from '../../utils/util.js';

const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {},
	data: {
		flag: true,
	},
	methods: {
		show() {
			this.setData({
				flag: false,
			});
		},
		close() {
			this.setData({
				flag: true,
			});
		},
	},
	ready: function () {},
});
