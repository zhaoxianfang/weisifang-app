var isIos = false
import download from '@/js_sdk/weisifang/download.js'
import files from '@/js_sdk/weisifang/files.js'
import permissions from '@/js_sdk/weisifang/permissions.js'
// #ifdef APP-PLUS
import { checkUpdate } from '../../components/app-upgrade/js/app-update-check.js'
import utils from '@/js_sdk/weisifang/utils.js'
isIos = (plus.os.name === 'iOS')

import api from '@/api/index.js'

// #endif

const helper = {
	debounceTime: null, // 防抖计时器
	debounceOldArgs: [], // 防抖动上次传入的参数
  download:download,
  files:files,
  permissions:permissions,
	// #ifdef APP-PLUS
  utils:utils,
	// #endif
	init() {
		// #ifdef APP-PLUS
		// plus.screen.lockOrientation('portrait-primary') //锁定竖屏
		// plus.navigator.setFullscreen(false); // 设置应用全屏显示！ 

		// 判断通知权限 移到 notify 里面去触发
		// this.judgeIosPermissionPush()
		this.clickToBack()
		// this.checkWhiteList()

		// this.requestPermission()
    // this.openPermissionSetting()
		// 测试下载文件
		// download.downloadFile('https://weisifang.com/static/system/logo/logo-sm.png')
    // setTimeout(() => {
    //     this.keeplive()
    // }, 10000);
		// #endif
	},
  test_live(){
    api.app.test_live({'name':"test setInterval live"})
  },
	fullscreen() {
		// 设置应用全屏显示！  
		plus.navigator.setFullscreen(true);
	},
	unfullscreen() {
		// 设置应用非全屏显示！  
		plus.navigator.setFullscreen(false);
	},
	isfullscreen() {
		// 查询应用当前是否全屏显示！  
		console.log("是否全屏：" + (plus.navigator.isFullscreen() ? "是" : "否"));
	},
	// 返回键如何进入后台
	// uniapp退出应用改变为后台运行
	clickToBack() {
		let main = plus.android.runtimeMainActivity()
		//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
		plus.runtime.quit = function() {
			main.moveTaskToBack(false)
		}
		//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast
		// plus.nativeUI.toast = (function(str) {
		// 	if (str == '再次返回退出应用') {
		// 		plus.runtime.quit()
		// 	} else {
		// 		uni.showToast({
		// 			title: '再次返回退出应用',
		// 			icon: 'none'
		// 		})
		// 	}
		// })
	},
	
	// app 检测版本更新
	//获取线上APP版本信息  参数type 0自动检查  1手动检查（手动检查时，之前取消更新的版本也会提示出来）
	checkAppUpgrade: (type = 0) => {
		// #ifdef APP-PLUS
		//app检测更新
		let platform = plus.os.name.toLocaleLowerCase();
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			api.app.app_latest_version({
					platform: platform,
					version: widgetInfo.version //资源版本号
				})
				.then(res => {
					if (res.code === 200 && res.data && res.data.latest && res.data.latest.url) {
						let update_info = res.data.latest
						// console.log('app/version:', update_info);
						checkUpdate(update_info, type).then(res => {
							if (res.msg) {
								plus.nativeUI.toast(res.msg)
							}
						})
					} else {
						console.log('获取app/version:失败');
					}
				})
				.catch(e => {
					console.log('出错啦', e);
				});
		});

		// 	let update_info = {
		// 		version: '1.0.2', //线上版本
		// 		now_url: 'https://dldir1.qq.com/weixin/android/weixin802android1860_arm64.apk', //更新链接
		// 		silent: 1, //是否是静默更新
		// 		force: 0, //是否是强制更新 1是 0否(有关闭按钮)
		// 		net_check: 1, //非WIfi是否提示
		// 		note: '产品汪汪要改这个字的颜色<br />1、...<br />2、...<br />3、...', //更新内容
		// 	}

		// #endif
	},
	toast: (title = '提示', duration = 'long', align = 'center') => {
		// #ifdef APP-PLUS
		plus.nativeUI.toast(title, {
			verticalAlign: align, // "top"、"center"、"bottom"
			duration: duration // "long"3.5s、"short"2s，
		})
		// #endif
	},
	/*
	 * 防抖 函数
	 * 
	 * fn: 回调函数
	 * delay：延迟执行时间
	 * resOrArgsCallback：回调函数，
	 *     会传递三个返回参数(isClear,resFnOrNewArgs,oldArgsOrNull)
	 *         isClear:(bool类型，true:有未执行的fn被清除 false:fn已被执行
	 *         resFnOrNewArgs: isClear为「true」时表示 最后一次fn的传递参数,isClear为「false」时表示 最后一次fn的执行结果
	 *         oldArgsOrNull: isClear为「true」时表示未被执行的fn的传递参数,,isClear为「false」时返回 null
	 * immdiate：是否无须等待，立即执行,默认为false
	 * 
	 * 使用：
	 *    立即执行：helper.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... },true)(params)
	 *    正常调用：helper.debounce(fn, 400,(isClear,resFnOrNewArgs,oldArgsOrNull) => { ... })(params)
	 *    取消执行 ：let debounceChange = helper.debounce(...)(params); debounceChange.cancel()
	 */
	debounce(fn, delay, resOrArgsCallback, immdiate = false) {
		var _this = this
		let isInvoke = false

		function _debounce(...arg) {
			if (_this.debounceTime) {
				clearTimeout(_this.debounceTime)
				if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(true, arg, _this
					.debounceOldArgs)
			}
			setTimeout(() => {
				_this.debounceOldArgs = arg
			}, 80)
			if (immdiate && !isInvoke) {
				const result = fn.apply(this, arg)
				if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(false, result,
					null)
				isInvoke = true
			} else {
				_this.debounceTime = setTimeout(() => {
					const result = fn.apply(this, arg)
					if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(
						false, result,
						null)
					isInvoke = false
					_this.debounceTime = null
				}, delay)
			}
		}
		_debounce.cancel = function() {
			if (_this.debounceTime) clearTimeout(_this.debounceTime)
			_this.debounceTime = null
			isInvoke = false
		}

		return _debounce
	},
	
}
export default helper
