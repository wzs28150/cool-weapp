Component({
	options: {
		multipleSlots: true,
	},
	properties: {
		title: {
			type: String,
			value: 'page Component',
		}
	},
	data: {
		isInfoTipShow: false,
	},
	methods: {
		init() {
			if (wx.getStorageSync('isInfoTipShow')) {
				this.setData({
					isInfoTipShow: true
				})
			}
		},
		close() {
			wx.setStorageSync('isInfoTipShow', true);
			this.setData({
				isInfoTipShow: true
			})
		},
		moveToLeft() {},
		moveToRight() {
			wx.navigateBack({
				delta: 1
			});
		}
	},
	ready() {
		this.init()
	}
});
