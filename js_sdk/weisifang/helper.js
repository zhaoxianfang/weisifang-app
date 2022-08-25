var isIos = false
// #ifdef APP-PLUS
import { checkUpdate } from '../../components/app-upgrade/js/app-update-check.js'
isIos = (plus.os.name === 'iOS')

import download from '@/js_sdk/weisifang/download.js'
import api from '@/api/index.js'

// #endif

const helper = {
	debounceTime: null, // 防抖计时器
	debounceOldArgs: [], // 防抖老参数
	init() {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary') //锁定竖屏
		plus.navigator.setFullscreen(false); // 设置应用全屏显示！ 

		// 判断通知权限
		this.judgeIosPermissionPush()
		this.clickToBack()
		this.checkWhiteList()

		this.requestPermission()
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
		plus.nativeUI.toast = (function(str) {
			if (str == '再次返回退出应用') {
				plus.runtime.quit()
			} else {
				uni.showToast({
					title: '再次返回退出应用',
					icon: 'none'
				})
			}
		})
	},
	// 判断是否在白名单中
	checkWhiteList() {
		// 白名单  
		var main = plus.android.runtimeMainActivity()
		var packName = main.getPackageName()
		var Context = plus.android.importClass('android.content.Context')
		var PowerManager = plus.android.importClass('android.os.PowerManager')
		// 获取电源类
		var pm = main.getSystemService(Context.POWER_SERVICE)
		let inWhiteList = pm.isIgnoringBatteryOptimizations(packName)
		console.log('是否在白名单：', inWhiteList) //是否白名单  
		try {
			var Uri = plus.android.importClass('android.net.Uri')
			var Settings = plus.android.importClass('android.provider.Settings')
			var packageURI = Uri.parse('package:' + packName)
			var intents = plus.android.newObject('android.content.Intent', Settings
				.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, packageURI) // 电池  
			main.startActivity(intents)
			// console.log('调起end')
		} catch {
			console.log('白名单调起失败')
		}
		// if (pm.isIgnoringBatteryOptimizations(packName)) {
		//     console.log(11)
		// } else {
		// uni.showModal({
		//     title: '提示',
		//     content: '请开启自启动权限和省电策略设置无限制!',
		//     success: function(res) {
		//         if (res.confirm) {
		//             Settings.openAppSetting()
		//         } else if (res.cancel) {
		//             console.log('用户点击取消')
		//         }
		//     }
		// })
		// }
	},
	// 判断权限
	requestPermission() {
		plus.android.requestPermissions(
			[
				// 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
				// 'android.permission.WAKE_LOCK', //唤醒锁定 允许程序在手机屏幕关闭后后台进程仍然运行
				// 'android.permission.WRITE_EXTERNAL_STORAGE', // 写入外部存储 允许程序写入外部存储,如SD卡上写文件
				// 'android.permission.RECEIVE_BOOT_COMPLETED', // 开机自动允许 允许程序开机自动运行
				// 'android.intent.action.BOOT_COMPLETED',
				// 'android.permission.DEVICE_POWER' // 电源管理
				// 'android.permission.ACCESS_FINE_LOCATION', // 位置权限
				// 'android.permission.ACCESS_COARSE_LOCATION', // 模糊位置权限(蓝牙\ble依赖)</button>
				// 'android.permission.CAMERA', // 摄像头权限</button>
				// 'android.permission.READ_EXTERNAL_STORAGE', // 外部存储(含相册)读取权限</button>
				// 'android.permission.RECORD_AUDIO', // 麦克风权限</button>
				// 'android.permission.READ_CONTACTS', // 通讯录读取权限</button>
				// 'android.permission.WRITE_CONTACTS', // 通讯录写入权限</button>
				// 'android.permission.READ_CALENDAR', // 日历读取权限</button>
				// 'android.permission.WRITE_CALENDAR', // 日历写入权限</button>
				// 'android.permission.READ_SMS', // 短信读取权限</button>
				// 'android.permission.SEND_SMS', // 短信发送权限</button>
				// 'android.permission.RECEIVE_SMS', // 接收新短信权限</button>
				// 'android.permission.READ_PHONE_STATE', // 获取手机识别码等信息的权限</button>
				// 'android.permission.CALL_PHONE', // 拨打电话权限</button>
				// 'android.permission.READ_CALL_LOG', // 获取通话记录权限</button>
			],
			function(resultObj) {
				for (var i = 0; i < resultObj.granted.length; i++) {
					var grantedPermission = resultObj.granted[i]
					console.log('已获取的权限：' + grantedPermission)
				}
				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
					var deniedPresentPermission = resultObj.deniedPresent[i]
					console.log('拒绝本次申请的权限：' + deniedPresentPermission)
				}
				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
					var deniedAlwaysPermission = resultObj.deniedAlways[i]
					console.log('永久拒绝申请的权限：' + deniedAlwaysPermission)
				}
				// 若所需权限被永久拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限  
				if (resultObj.deniedAlways.length > 0) {
					this.openAppSetting()
				}
			},
			function(error) {
				console.log('申请权限错误：' + error.code + ' = ' + error.message)
			})
	},
	// 打开当前APP应用信息设置页面 
	openAppSetting() {
		if (isIos) {
			var UIApplication = plus.ios.import('UIApplication')
			var application2 = UIApplication.sharedApplication()
			var NSURL2 = plus.ios.import('NSURL')
			// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
			var setting2 = NSURL2.URLWithString('app-settings:')
			application2.openURL(setting2)

			plus.ios.deleteObject(setting2)
			plus.ios.deleteObject(NSURL2)
			plus.ios.deleteObject(application2)
		} else {
			// console.log(plus.device.vendor);
			var Intent = plus.android.importClass('android.content.Intent')
			var Settings = plus.android.importClass('android.provider.Settings')
			var Uri = plus.android.importClass('android.net.Uri')
			var mainActivity = plus.android.runtimeMainActivity()
			var intent = new Intent()
			intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
			var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
			intent.setData(uri)
			mainActivity.startActivity(intent)
		}
	},
	// 打开安卓各种权限设置页面
	openPermissionSetting() {
		// ACTION_APPLICATION_DEVELOPMENT_SETTINGS 开发者选项
		// ACTION_ACCESSIBILITY_SETTINGS 无障碍
		// ACTION_ADD_ACCOUNT 添加账号
		// ACTION_AIRPLANE_MODE_SETTINGS 无线和网络 飞行模式
		// ACTION_APN_SETTINGS apn 网络节点
		// ACTION_APPLICATION_SETTINGS 应用列表
		// ACTION_BLUETOOTH_SETTINGS 蓝牙开关
		// sim 卡网络与流量管理
		// ACTION_DATE_SETTINGS 日期和时间 设置
		// ACTION_DEVICE_INFO_SETTINGS 关于手机
		// ACTION_DISPLAY_SETTINGS 显示与亮度设置
		// ACTION_INPUT_METHOD_SETTINGS 输入法管理
		// ACTION_INPUT_METHOD_SUBTYPE_SETTINGS 输入法设置
		// ACTION_INTERNAL_STORAGE_SETTINGS 存储空间
		// ACTION_LOCALE_SETTINGS 选择语言
		// ACTION_LOCATION_SOURCE_SETTINGS 位置信息
		// ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS 所有应用列表
		// ACTION_MANAGE_APPLICATIONS_SETTINGS 安装的应用列表
		// ACTION_MEMORY_CARD_SETTINGS 存储空间
		// ACTION_NETWORK_OPERATOR_SETTINGS sim卡与流量
		// ACTION_PRIVACY_SETTINGS 隐私权
		// ACTION_SEARCH_SETTINGS 全局搜索
		// ACTION_SECURITY_SETTINGS 安全
		// ACTION_SETTINGS 手机设置
		// ACTION_SOUND_SETTINGS 声音与震动
		// ACTION_SYNC_SETTINGS 用户与账号
		// ACTION_USER_DICTIONARY_SETTINGS 个人字典
		// ACTION_WIFI_SETTINGS wlan wifi 设置
		// ACTION_WIRELESS_SETTINGS 无线和网络、飞行模式

		var main = plus.android.runtimeMainActivity() //获取activity
		var Intent = plus.android.importClass('android.content.Intent')
		var Settings = plus.android.importClass('android.provider.Settings')
		var intent = new Intent(Settings
			.ACTION_WIRELESS_SETTINGS) //可设置http://ask.dcloud.net.cn/question/14732这里所有Action字段
		main.startActivity(intent)
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
	// 判断推送权限是否开启
	judgeIosPermissionPush() {
		if (isIos) { //ios
			var result = false
			var UIApplication = plus.ios.import('UIApplication')
			var app = UIApplication.sharedApplication()
			var enabledTypes = 0
			if (app.currentUserNotificationSettings) {
				var settings = app.currentUserNotificationSettings()
				enabledTypes = settings.plusGetAttribute('types')
				console.log('enabledTypes1:' + enabledTypes)
				if (enabledTypes === 0) {
					// gotoAppPermissionSetting()
					console.log('推送权限没有开启')
				} else {
					result = true
					console.log('已经开启推送功能!')
				}
				plus.ios.deleteObject(settings)
			} else {
				enabledTypes = app.enabledRemoteNotificationTypes()
				if (enabledTypes === 0) {
					// gotoAppPermissionSetting()
					console.log('推送权限没有开启!')
				} else {
					result = true
					console.log('已经开启推送功能!')
				}
				console.log('enabledTypes2:' + enabledTypes)
			}
			plus.ios.deleteObject(app)
			plus.ios.deleteObject(UIApplication)
			return result
		} else { //android
			var result = false
			var main = plus.android.runtimeMainActivity()
			var pkName = main.getPackageName()
			var uid = main.getApplicationInfo().plusGetAttribute('uid')
			var NotificationManagerCompat = plus.android.importClass('androidx.core.app.NotificationManagerCompat')
			//("android.support.v4.app.NotificationManagerCompat");
			var areNotificationsEnabled = NotificationManagerCompat.from(main)
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
			if (!areNotificationsEnabled.areNotificationsEnabled()) {
				uni.showModal({
					title: '通知权限开启提醒',
					content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
					showCancel: false,
					confirmText: '去设置',
					success: function(res) {
						if (res.confirm) {
							var Intent = plus.android.importClass('android.content.Intent')
							var Build = plus.android.importClass('android.os.Build')
							//android 8.0引导  
							if (Build.VERSION.SDK_INT >= 26) {
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
								intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
							} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
								intent.putExtra('app_package', pkName)
								intent.putExtra('app_uid', uid)
							} else { //(<21)其他--跳转到该应用管理的详情页
								var Settings = plus.android.importClass('android.provider.Settings')
								var Uri = plus.android.importClass('android.net.Uri')
								var intent = new Intent()
								intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
								var uri = Uri.fromParts('package', main.getPackageName(), null)
								intent.setData(uri)
							}
							// 跳转到该应用的系统通知设置页  
							main.startActivity(intent)
							return result
						}
					}
				})
			} else {
				result = true
				return result
			}
		}
	}
}
export default helper
