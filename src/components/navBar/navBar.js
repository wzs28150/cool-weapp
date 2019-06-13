Component({
	properties: {
		num: {
      type: Number,
      value: 0
    },
		flag: {
      type: Boolean,
      value: false,
			observer: function(newVal, oldVal) {
				console.log(newVal);
      }
    }
	},
	data: {

	},
	methods: {
		init: function () {
			let that = this;
			that.setData({
				flag: false
			})
		},
		change:function (flag) {
			let that = this;
			that.setData({
				flaga: flag
			})
		},
		hide:function () {
			let that = this;
			that.setData({
				flag: false
			})
		}
	},
	ready: function () {
		this.init();

	}
});
