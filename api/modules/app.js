import fetch from '@/common/httpRequest'


/* 系统接口 列表 */
var apiList = {
	// 获取app 最新版本
	app_latest_version(data){
		return fetch.request("app/version", "POST", data)
	}
}

// 默认全部导入
export default apiList