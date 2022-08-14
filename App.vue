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
		// 检测app 最新版本
		helper.checkAppUpgrade(0);

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
		if(!this.$store.state.user.isLogin){
			// 未登录
			console.log('请登录')
			uni.navigateTo({
				url: '/pages/common/login/login'
			});
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
