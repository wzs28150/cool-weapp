import api from './config.js';
// 获取底部菜单
export const getNavList = () => {
	return api.get('/index/navbar');
};
// 获取个人信息
export const getMyInfo = () => {
	return api.get('/myInfo');
};
// 执行登录
export const dologin = ({
	code,
	nickname,
	avatarUrl
}) => {
	return api.login('/login', {
		code: code,
		nickname: nickname,
		avatarUrl: avatarUrl,
	});
};
