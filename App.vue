<script>
// #ifdef APP-PLUS
import helper from '@/js_sdk/weisifang/helper.js';
// #endif
export default {
	onLaunch: function() {
		let that = this;
		// #ifdef APP-PLUS
		/* 5+环境锁定屏幕方向 */

		// app 辅助功能初始化
		helper.init();

		/* 5+环境升级提示 */
		//app检测更新
		let platform = plus.os.name.toLocaleLowerCase();
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			that.tui
				.request(
					'/test/app/live',
					'POST',
					{
						title: 'app onLaunch 保活测试',
						platform: platform,
						version: widgetInfo.version //资源版本号
					},
					false,
					false,
					true
				)
				.then(res => {
					// console.log('返回', res)
				})
				.catch(e => {});

			setInterval(() => {
				that.tui
					.request(
						'/test/app/live',
						'POST',
						{
							title: 'app onLaunch 保活测试 定时每半小时发送',
							platform: platform,
							version: widgetInfo.version //资源版本号
						},
						false,
						false,
						true
					)
					.then(res => {
						console.log('返回', res);
					})
					.catch(e => {});
			}, 1800000);

			return false;
			that.tui
				.request(
					'/config/getNewestVersion',
					'POST',
					{
						platform: platform,
						version: widgetInfo.version //资源版本号
					},
					false,
					false,
					true
				)
				.then(res => {
					if (res.code === 200 && res.data && (res.data.updateUrl || res.data.partUpdateUrl)) {
						let data = res.data;
						that.tui.modal('检测到新版本', data.updateLog ? data.updateLog : '请您先更新再进行操作，若不及时更新可能导致部分功能无法正常使用。', false, res => {
							if (data.hasPartUpdate === 0) {
								//应用市场更新
								plus.runtime.openURL(data.updateUrl);
								plus.runtime.restart();
							} else if (data.hasPartUpdate === 1) {
								//资源更新（服务器端更新）
								that.tui.href(`/pages/common/update/update?url=${data.partUpdateUrl}`);
							}
						});
					}
				})
				.catch(e => {});
		});

		// #endif

		// #ifdef MP-WEIXIN
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						});
					});
					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false, res => {});
					});
				}
			});
		}
		// #endif
	},
	onShow: function() {
		// 获取完整的urlscheme字符串
		// #ifdef APP-PLUS
		var args = plus.runtime.arguments;
		if (args) {
			// 处理args参数，如直达到某新页面等
			if (args.substring(0, 6) === 'wsf://' || args.substring(0, 12) === 'weisifang://') {
				var urlschemeContent = args.substring(0, 6) === 'wsf://' ? args.slice(6) : args.slice(12);
				this.tui.modal('urlscheme', urlschemeContent, false, res => {});
				plus.runtime.arguments = '';
			}
		}
		// #endif
	},
	onHide: function() {
		//console.log('App Hide')
	},
	onError: function(err) {
		//全局错误监听
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			const res = uni.getSystemInfoSync();
			let errMsg = `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
			console.log('发生错误：' + errMsg);
		});
		// #endif
	}
};
</script>

<style>
/*每个页面公共css uParse为优化版本*/
@import './common/app.css';
/* #ifndef APP-NVUE */
@import './components/uni/uParse/src/wxParse.css';
/* #endif */
</style>
