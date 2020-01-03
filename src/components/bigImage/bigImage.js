import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		src: {
			type: String,
			value: 0,
		},
		list: {
			type: Object,
			value: [],
		},
	},
	data: {},
	methods: {
		topic_preview: function (e) {
			console.log(e);
			let that = this;
			let url = e.currentTarget.dataset.url;
			// 通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
			let data = that.data.list;
			wx.previewImage({
				current: url,
				urls: data,
			});
		},
	},
	ready: function () {},
});
