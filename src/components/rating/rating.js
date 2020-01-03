// component/rating/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		num: {
			type: Number,
			value: 5,
		},
		size: {
			type: Number,
			value: 28,
		},
		readonly: {
			type: Boolean,
			value: false,
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		imgs: [
			{
				id: 1,
			},
			{
				id: 2,
			},
			{
				id: 3,
			},
			{
				id: 4,
			},
			{
				id: 5,
			},
		],
		src1: 'http://api.coolwl.net/chwl/public/uploads/star.png',
		src2: 'http://api.coolwl.net/chwl/public/uploads/star_2.png',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		select(e) {
			let that = this;
			if (!this.data.readonly) {
				this.data.num = e.currentTarget.dataset.index;
				this.setData({
					num: this.data.num,
				});
				this.triggerEvent('getNum', {
					num: that.data.num,
				});
			}
		},
	},
});
