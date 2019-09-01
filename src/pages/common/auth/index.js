import util from '../../../utils/util';
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		code: '',
		appName:''
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs',
		});
	},
	async onLoad(option) {
		await delay();
		console.log(option)
		if (option.code) {
      this.setData({
        code: option.code,
				appName: app.globalData.appName
      })
    } else {
      app.initLoginState();
    }
		// const log = flow(() => {
		// 	console.log('is wechat mini program: ', __WECHAT__);
		// 	console.log('is alipay mini program: ', __ALIPAY__);
		// 	console.log('DEV: ', __DEV__);
		// });
		//
		// log();
	},
	getUserInfo: function (e) {
    console.log(e)
    let that = this;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.showLoading({
      title: '加载中',
    })
    util.login(app.globalData.api + '/oauth/login', {
      code: that.data.code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      rawData: e.detail.rawData,
      signature: e.detail.signature
    }).then(res => {
      let data = res.data;
      console.log(data);
      if (data.code == 200) {
        wx.setStorageSync('token', data.data.token);
        wx.setStorageSync('userInfo', data.data.user_info);
        wx.hideLoading()
        app.checkSession();
      }
    })
  }
});
