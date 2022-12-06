// 实时定位（系统、后台运行、支持息屏）
// https://ext.dcloud.net.cn/plugin?id=10330

// #ifdef APP-PLUS
const location = uni.requireNativePlugin('Ba-Location')
const minTimeMs = 30
const minDistanceM = 1
import helper from './helper.js'
// #endif

const baLocation = {
    startL() { //开启定位
        location.start(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            }, {
                minTimeMs: minTimeMs,
                minDistanceM: minDistanceM
            });
    },
    stopL() { //关闭定位
        location.stop(res => {
            console.log(res);
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    isLocationService() { //定位服务是否开启
        location.isLocationService(
            res => {
                console.log(res);
                if (res.data) {
                    this.msgList.unshift(JSON.stringify(res.data))
                    this.msgList.unshift(dateUtil.now())
                }
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    isLocationEnable() { //定位开关是否打开
        location.isLocationEnable(
            res => {
                console.log(res);
                if (res.data) {
                    this.msgList.unshift(JSON.stringify(res.data))
                    this.msgList.unshift(dateUtil.now())
                }
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    goSetting() { //跳转到定位服务设置界面
        location.goSetting(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    subLocation() { //订阅定位信息
        location.subLocation(res => {
            console.log(res);
            if (res.data) {
                this.msgList.unshift(JSON.stringify(res.data))
                this.msgList.unshift(dateUtil.now())
            }
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    subLocationStatus() { //订阅定位状态变化
        location.subLocationStatus(res => {
            console.log(res);
            if (res.data) {
                this.msgList.unshift(JSON.stringify(res.data))
                this.msgList.unshift(dateUtil.now())
            }
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    subGpsStatus() { //订阅 gps和 搜星变化
        location.subGpsStatus(res => {
            console.log(res);
            if (res.data) {
                this.msgList.unshift(JSON.stringify(res.data))
                this.msgList.unshift(dateUtil.now())
            }
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
}
export default baLocation
