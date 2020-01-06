/**
 * 小程序异步获取方法封装
 * apiUrl  String   接口基础路径
 * post    function post请求方法  携带token
 * get     function get 请求方法  携带token
 * login   function login登录方法 不带token
 */

let apiUrl = "http://114.115.177.23:9090/mock/68/api";

const post = (url, data) => {
	var promise = new Promise((resolve, reject) => {
		wx.request({
			url: apiUrl + url,
			data: data,
			method: 'POST',
			header: {
				// 'content-type': 'application/x-www-form-urlencoded',
				token: wx.getStorageSync('token'),
			},
			success: function (res) {
				// 服务器返回数据
				if (res.statusCode == 200) {
					let resData = res.data;
					if (resData.statusCode == 1) {
						resolve(resData);
					} else {
						wx.showToast({
						  title: resData.msg,
						  icon: 'none',
						  duration: 2000
						})
					}
				} else {
					// 返回错误提示信息
					wx.showToast({
					  title: '请求错误请重试!',
					  icon: 'none',
					  duration: 2000
					})
					reject('请求错误请重试!');
				}
			},
			error: function (e) {
				reject('网络出错!');
			},
		});
	});
	return promise;
};

const get = (url, data) => {
	var promise = new Promise((resolve, reject) => {
		wx.request({
			url: apiUrl + url,
			data: data,
			header: {
				'content-type': 'application/json',
				token: wx.getStorageSync('token'),
			},
			success: function (res) {
				if (res.statusCode == 200) {
					let resData = res.data;
					if (resData.statusCode == 1) {
						resolve(resData);
					} else {
						wx.showToast({
						  title: resData.msg,
						  icon: 'none',
						  duration: 2000
						})
						reject('请求错误请重试!');
					}
				} else {
					wx.showToast({
					  title: '请求错误请重试!',
					  icon: 'none',
					  duration: 2000
					})
				}
			},
			error: function (e) {
				reject('网络出错');
			},
		});
	});
	return promise;
};

const login = (url, data) => {
	var promise = new Promise((resolve, reject) => {
		// 网络请求
		wx.request({
			url: apiUrl + url,
			data: data,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				// 'token':wx.getStorageSync('token')
			},
			success: function (res) {
				if (res.statusCode == 200) {
					let resData = res.data;
					if (resData.statusCode == 1) {
						console.log(resData)
						resolve(resData);
					} else {
						wx.showToast({
						  title: resData.msg,
						  icon: 'none',
						  duration: 2000
						})
						reject('请求错误请重试!');
					}
				} else {
					// 返回错误提示信息
					reject(res.data);
				}
			},
			error: function (e) {
				reject('网络出错');
			},
		});
	});
	return promise;
};

module.exports = {
	post,
	get,
	login
};
