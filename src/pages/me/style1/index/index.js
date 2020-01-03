import { flow } from "lodash";
import util from "../../../../utils/util";
const delay = (t = 0) => new Promise(resolve => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
  data: {
    swiper: {
      duration: 1000,
      current: 0
    },
    data: {},
    num: 2,
    flag: false,
    userInfo: {},
    userList: [
      {
        title: "测试链接1",
        path: "/pages/me/coupon/index",
        icon: "icon1"
      },
      {
        title: "测试链接2",
        path: "/pages/me/business/form/index",
        icon: "icon2"
      }
    ]
  },
  // 事件处理函数
  onShareAppMessage: function(res) {},
  async onLoad() {
    await delay();
  },
  async onShow() {
    await delay();
    let that = this;
    setTimeout(function() {
      that.setData({
        flag: true
      });
    }, 1000);
    // that.getDataByServe()
    if (wx.getStorageSync("token")) {
      that.getData();
    }
  },
  getData() {
    let that = this;
	app.checkSession().then(function(res){
		that.setData({
		  userInfo: res
		});
	}).catch(function(err){
		console.log(err)
	})
  },
  getUserInfo(e) {
    console.log(e)
	let that = this
	app.checkSession().then(function(res){
		that.setData({
		  userInfo: res
		});
	}).catch(function(err){
		console.log(err)
	})
    // this.setData({
    // 	userInfo: e.detail.userInfo
    // });
  }
});
