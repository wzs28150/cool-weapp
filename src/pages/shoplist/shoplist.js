import {
	getShopList
} from "@/api/list.js";
const app = getApp();
Page({
	data: {
		list: [],
		key: "",
		page: 1,
		current: 0,
		type: 0,
		isLoadMoreLoading: false,
		isRefreshLoading: false,
		isTipShow: false,
		stylestr: "margin-top:0;margin-bottom:1rpx;height: calc(100vh - 1rpx);",
		catid: 0
	},

	onLoad(params) {
		wx.setNavigationBarTitle({
			title: "店铺列表"
		})
		this.getDataByServer()
	},
	getDataByServer: function () {
		let that = this;
		// 获取经纬度
		let position = app.globalData.position;
		// console.log(that.data.category[that.data.current].catid)
		getShopList({
				page_id: that.data.page
			}).then(res => {
				wx.hideLoading();
				let list = that.data.list;
				if (that.data.page == 1) {
					setTimeout(() => {
						that.setData({
							list: res.list,
							isRefreshLoading: false,
							isLoadMoreLoading: false
						});
					}, 500)
				} else {
					that.setData({
						list: list.concat(res.list)
					});
					setTimeout(() => {
						that.setData({
							isRefreshLoading: false,
							isLoadMoreLoading: false
						});
					}, 500)
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
	}
});
