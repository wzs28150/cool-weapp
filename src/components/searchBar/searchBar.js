Component({
	properties: {
		type: {
			type: String,
			value: '',
		},
	},
	data: {
		key: '',
	},
	methods: {
		init: function() {},
		search: function() {
			wx.navigateTo({
				url: '/pages/search/list/index?key=' + this.data.key,
			});
		},
		bindKeyInput: function(e) {
			console.log(e.detail.value);
			this.setData({
				key: e.detail.value,
			});
		},
	},
	ready: function() {
		this.init();
	},
});
