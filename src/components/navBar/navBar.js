import util from '../../utils/util.js';

const app = getApp();
Component({
	properties: {
		num: {
			type: Number,
			value: 0,
		},
		flag: {
			type: Boolean,
			value: false
		},
		swiper: {
			type: Boolean,
			value: false
		}
	},
	data: {
		list: [],
	},
	methods: {
		init: function() {
			let that = this;
			that.setData({
				flag: false,
			});
			if (app.globalData.navbar && app.globalData.navbar != '') {
				that.setData({
					list: app.globalData.navbar
				});
			} else {
				app.getNavReadyCallback = (res) => {
					console.log(res)
					that.setData({
						list: res
					});
				};
			}
		},
		change: function(flag) {
			let that = this;
			that.setData({
				flaga: flag,
			});
		},
		hide: function() {
			let that = this;
			that.setData({
				flag: false,
			});
		},
		navTap: function(e) {
			console.log(e.currentTarget.dataset.url)
			if (this.data.swiper){
				this.triggerEvent("swiperCallback", {
				  id: e.currentTarget.dataset.id
				});
			}else{
				wx.reLaunch({
				  url: e.currentTarget.dataset.url
				})
			}
		}
	},
	ready: function() {
		this.init();
	},
});
