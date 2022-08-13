var isIos = false
// #ifdef APP-PLUS
import { checkUpdate } from '../../components/app-upgrade/js/app-update-check.js'
isIos = (plus.os.name === 'iOS')
// #endif

const helper = {
    debounceTime: null, // 防抖计时器
    debounceOldArgs: [], // 防抖老参数
    init() {
    // #ifdef APP-PLUS
    // 判断通知权限
        this.judgeIosPermissionPush()
        // app 检测版本更新
        this.checkAppUpgrade(0)
        this.clickToBack()
        this.checkWhiteList()

        // var main = plus.android.runtimeMainActivity(); //获取activity  
        // var Intent = plus.android.importClass('android.content.Intent');  
        // var Settings = plus.android.importClass('android.provider.Settings');  
        // var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);//可设置表中所有Action字段  
        // main.startActivity(intent);

        this.requestPermission()
    // #endif
    },
    // 返回键如何进入后台
    clickToBack() {
        var main = plus.android.runtimeMainActivity()
        main.moveTaskToBack(false)
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
        console.log('是否在白名单：', pm.isIgnoringBatteryOptimizations(packName)) //是否白名单  
        let whiteList = pm.isIgnoringBatteryOptimizations(packName)
        try {
            var Uri = plus.android.importClass('android.net.Uri')
            var Settings = plus.android.importClass('android.provider.Settings')
            var packageURI = Uri.parse('package:' + packName)
            var intents = plus.android.newObject('android.content.Intent', Settings
                .ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, packageURI) // 电池  
            main.startActivity(intents)
        } catch {
            console.log('调起失败')
        }
    },
    // 判断权限
    requestPermission() {
        plus.android.requestPermissions(
            ['android.permission.ACCESS_FINE_LOCATION', 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
                'android.permission.WAKE_LOCK',
                'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.RECEIVE_BOOT_COMPLETED'
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
            function(error) {
                console.log('申请权限错误：' + error.code + ' = ' + error.message)
            })
    },
    // 检测app 版本更新
    //获取线上APP版本信息  参数type 0自动检查  1手动检查（手动检查时，之前取消更新的版本也会提示出来）
    checkAppUpgrade: (type = 0) => {
    // #ifdef APP-PLUS
        const system_info = uni.getSystemInfoSync()
        let params = { os: system_info.platform } //本机设备操作系统  （android || ios） 
        if (params.os !== 'ios' && params.os !== 'android') false //如果不是安卓或ios 返回false

        //这里自行请求API获取版本信息 建议传入操作系统标识，返回本机对应的操作系统最新版本信息，也就是安卓的返回就是安卓的版本信息  ios返回就是ios的版本信息

        //请求获取最新版本
        setTimeout(() => {
            let update_info = {
                version: '1.0.2', //线上版本
                now_url: 'https://dldir1.qq.com/weixin/android/weixin802android1860_arm64.apk', //更新链接
                silent: 1, //是否是静默更新
                force: 0, //是否是强制更新 1是 0否(有关闭按钮)
                net_check: 1, //非WIfi是否提示
                note: '产品汪汪要改这个字的颜色<br />1、...<br />2、...<br />3、...', //更新内容
            }
            checkUpdate(update_info, type).then(res => {
                if (res.msg) {
                    plus.nativeUI.toast(res.msg)
                }
            }) ///检查更新  
            //checkUpdate 这个方法会做什么？：线上版本号 与 本地版本号做对比 ，如果需要更新  根据静默，强制、wifi等信息执行静默更新或跳转到升级页面
            //跳转升级页面的前提是，需要新建并在pages.json中配置升级页面，配置方法请查看插件详情
        }, 200)
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
                if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(false, result, null)
                isInvoke = true
            } else {
                _this.debounceTime = setTimeout(() => {
                    const result = fn.apply(this, arg)
                    if (resOrArgsCallback && typeof resOrArgsCallback === 'function') resOrArgsCallback(false, result,
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
