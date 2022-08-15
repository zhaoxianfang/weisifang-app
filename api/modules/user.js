import fetch from '@/common/httpRequest'


/* 系统接口 列表 */
var apiList = {
	// 登录
	login(data){
		return fetch.request('users/auth/login', "POST", data)
	},
}

// 默认全部导入
export default apiList