import util from '../../utils/util.js';

const app = getApp();
Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		name: {
			type: String,
			value: 0,
		},
	},
	data: {
		progress: 0,
		flag: false,
	},
	methods: {
		init: function() {
			// let that = this;
		},
		upload: function() {
			var that = this;
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					var tempFilePaths = res.tempFilePaths;
					// 这里是上传操作
					that.setData({
						flag: true,
					});
					const upload_task = wx.uploadFile({
						url: app.globalData.api + '/UpFiles/upload',
						filePath: tempFilePaths[0],
						name: that.data.name,
						header: {
							'Content-Type': 'multipart/form-data',
							token: wx.getStorageSync('token'),
							Cookie: wx.getStorageSync('sessionId'),
						},
						success: function(res) {
							let data = JSON.parse(res.data);
							if (res.statusCode === 200) {
								that.setData({
									flag: false,
								});
								that.triggerEvent('showResult', {
									url: data.url,
									name: that.data.name,
								});
							} else {
								// 返回错误提示信息
								wx.showToast({
									title: '请求错误请重试',
									icon: 'none',
									duration: 2000,
								});
							}
						},
					});

					upload_task.onProgressUpdate((res) => {
						that.setData({
							progress: res.progress,
						});
					});
				},
			});
		},
	},
	ready: function() {
		this.init();
	},
});
