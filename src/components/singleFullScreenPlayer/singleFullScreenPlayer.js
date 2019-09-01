import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		title: {
			type: String,
			value: '',
		},
		src: {
			type: String,
			value:
				'http://v.dongaocloud.com/2a86/2a86/fe5/acf/8f9ca48cf7f953a932a0eeab141ca7c8.mp4',
		},
	},
	data: {
		isPlay: false,
	},
	methods: {
		init: function () {
			let that = this;
			that.videoContext = wx.createVideoContext('myVideo');
		},
		goInfo: function () {
			wx.navigateTo({
				url: '/pages/' + this.data.type + '/info/index?id=' + this.data.item.id,
			});
		},
		playVideo() {
			console.log(this.videoContext);

			// this.videoContext.requestFullScreen({ direction: 90 });
			this.setData({
				isPlay: true,
			});
			console.log(this.videoContext.play);

			this.videoContext.play();
		},
		fullscreen() {
			console.log(1);
			if (this.data.isPlay) {
				this.setData({
					isPlay: false,
				});
				this.videoContext.stop();
			}
			else {
				this.setData({
					isPlay: true,
				});
			}
		},
	},
	ready: function () {
		this.init();
	},
});
