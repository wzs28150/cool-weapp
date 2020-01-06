import api from './config.js';
// 获取底部菜单
export const getList = ({
	page_id
}) => {
	return api.get("/list?page_id=" +
		page_id);
};

export const getShopList = ({
	page_id
}) => {
	return api.get("/shoplist?page_id=" +
		page_id);
};
