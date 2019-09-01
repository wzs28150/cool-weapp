import util from 'utils/util.js';

App({
	onLaunch() {
		this.checkSession();
	},
	checkSession: function(url = '') {
		const that = this;
		wx.checkSession({
			success: () => {
				// session 未过期，并且在本生命周期一直有效
				that.globalData.token = wx.getStorageSync('token');
				util
					.get(that.globalData.api + '/oauth')
					.then((response) => {
						let data = response.data.data;

						if (response.data.code == 200) {
							wx.setStorageSync('userInfo', data.info);
							wx.setStorageSync('sessionId', data.sid);
							if (url) {
								wx.reLaunch({
									url: url,
								});
							} else {
								wx.reLaunch({
									url: '/pages/main/index',
									// url: '/pages/me/index/index',
								});
							}
						} else {
							that.initLoginState();
						}
					})
					.catch(() => {
						console.log('自动登录失败, 重新登录');
						that.initLoginState();
					});
				that.globalData.userInfo = wx.getStorageSync('userInfo');
			},
			fail: (e) => {
				console.log(e);
				that.initLoginState();
			},
		});
	},
	initLoginState: function() {
		const that = this;
		// 登录
		wx.login({
			success: (result) => {
				console.log(result);
				// 调用获取用户信息接口
				wx.getSetting({
					success: (res) => {
						console.log(
							'是否授权',
							res.authSetting['scope.userInfo'] !== undefined
						);
						if (res.authSetting['scope.userInfo'] !== undefined) {
							console.log('已授权');
							// 检查token 获取用户信息
							wx.getUserInfo({
								lang: 'zh_CN',
								success: (e) => {
									// 发送 res.code 到后台换取 openId, sessionKey, unionId
									// console.log(e);
									util
										.login(that.globalData.api + '/oauth/login', {
											code: result.code,
											encryptedData: e.encryptedData,
											iv: e.iv,
											rawData: e.rawData,
											signature: e.signature,
										})
										.then((res) => {
											let data = res.data;
											console.log(data);
											if (data.code == 200) {
												wx.setStorageSync('token', data.data.token);
												wx.setStorageSync('userInfo', data.data.user_info);
												that.checkSession();
											}
										})
										.catch(() => {
											wx.showToast({
												title: '请求错误请重试',
												icon: 'none',
												duration: 2000,
											});
										});
								},
							});
						} else {
							console.log('未授权');
							wx.navigateTo({
								url: '/pages/common/auth/index?code=' + result.code,
							});
						}
					},
				});
			},
		});
	},
	globalData: {
		token: '',
		userInfo: null,
		// api: 'http://47.95.228.57:9091/mock/50',
		api: 'http://114.115.177.23:9090/mock/68/api',
		appName: 'Cool小程序框架',
	},
	/**
	 * 设置监听器
	 */
	setWatcher(page) {
		let data = page.data;
		let watch = page.watch;
		Object.keys(watch).forEach((v) => {
			let key = v.split('.'); // 将watch中的属性以'.'切分成数组
			let nowData = data; // 将data赋值给nowData
			for (let i = 0; i < key.length - 1; i++) {
				// 遍历key数组的元素，除了最后一个！
				nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
			}
			let lastKey = key[key.length - 1];
			// 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
			let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法
			let deep = watch[v].deep; // 若未设置deep,则为undefine
			this.observe(nowData, lastKey, watchFun, deep, page); // 监听nowData对象的lastKey
		});
	},
	/**
	 * 监听属性 并执行监听函数
	 */
	observe(obj, key, watchFun, deep, page) {
		var val = obj[key];
		// 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
		if (deep && val != null && typeof val === 'object') {
			Object.keys(val).forEach((childKey) => {
				// 遍历val对象下的每一个key
				this.observe(val, childKey, watchFun, deep, page); // 递归调用监听函数
			});
		}
		var that = this;
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: true,
			set: function(value) {
				// 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
				watchFun.call(page, value, val); // value是新值，val是旧值
				val = value;
				if (deep) {
					// 若是深度监听,重新监听该对象，以便监听其属性。
					that.observe(obj, key, watchFun, deep, page);
				}
			},
			get: function() {
				return val;
			},
		});
	},
});
