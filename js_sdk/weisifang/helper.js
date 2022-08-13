// #ifdef APP-PLUS
import { checkUpdate } from '../../components/app-upgrade/js/app-update-check.js'
// #endif
const helper = {
    debounceTime: null, // 防抖计时器
    debounceOldArgs: [], // 防抖老参数
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
    }
}
export default helper
