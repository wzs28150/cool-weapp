import util from '../../utils/util.js';

const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		title: {
			type: String,
			value: 0,
		},
		name: {
			type: String,
			value: 0,
		},
		multiple: {
			type: Boolean,
			value: false,
		},
		url: {
			type: String,
			value: 0,
		},
	},
	data: {},
	methods: {
		upload() {
			let that = this;
			wx.chooseImage({
				success: function (res) {
					var tempFilePaths = res.tempFilePaths;
					wx.uploadFile({
						url: app.globalData.api + '/editUpload',
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							token: wx.getStorageSync('token'),
						},
						success: function (res) {
							var data = JSON.parse(res.data);
							// console.log(data);
							// return false;
							if (data.res == 1) {
								that.setData({
									url: data.src,
								});
								that.triggerEvent('geturl', {
									url: data.src,
									name: that.data.name,
								});
							}
							// do something
						},
					});
				},
			});
		},
	},
	ready: function () {},
});
