import {
	getList
} from "@/api/list.js";
const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {},

	/**
	 * 组件的初始数据
	 */
	data: {
		list: [],
		key: "",
		page: 1,
		current: 0,
		type: 0,
		isLoadMoreLoading: false,
		isRefreshLoading: false,
		isTipShow: false,
		stylestr: "margin-top:0;margin-bottom:120rpx;height: calc(100vh - 120rpx);",
		catid: 0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		init: function () {
			let that = this;
			// 获取经纬度
			let position = app.globalData.position;
			// console.log(that.data.category[that.data.current].catid)
			getList({
					page_id: that.data.page
				}).then(res => {
					wx.hideLoading();
					let list = that.data.list;
					if (that.data.page == 1) {
						that.setData({
							list: res.list,
							isRefreshLoading: false,
							isLoadMoreLoading: false
						});
					} else {
						that.setData({
							list: list.concat(res.list),
							isRefreshLoading: false,
							isLoadMoreLoading: false
						});
					}
				})
				.catch(err => {
					console.log(`数据请求失败`);
				});
		},
		// 下拉刷新
		upper: function (e) {
			console.log(e);
			let that = this;
			that.setData({
				page: 1,
				list: []
			});
			that.getDataByServer();
		},
		// 上拉加载
		lower: function (e) {
			let that = this;
			that.setData({
				page: that.data.page + 1
			});
			that.getDataByServer();
		},
	},
	ready: function () {
		let that = this;
		that.init();
	}
});
