import fetch from '../common/httpRequest'

/* 将所有接口统一起来便于维护 */
var apiList = {
	post(url,data){
		return fetch.request(url, "POST", data)
	},
	get(url){
		return fetch.request(url, "GET", {})
	},
	// 获取app 最新版本
	app_latest_version(data){
		return fetch.request("app/version", "POST", data)
	},
	login(data){
		return fetch.request('users/auth/login', "POST", data)
	},
}

// 默认全部导入
export default apiList
