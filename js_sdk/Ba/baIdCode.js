// 获取设备唯一标识（OAID、AAID、IMEI等）
// https://ext.dcloud.net.cn/plugin?id=10318

// #ifdef APP-PLUS
const idCode = uni.requireNativePlugin('Ba-IdCode')

import helper from '../weisifang/helper.js'
// #endif

const baIdCode = {
    register() { //注册，先注册再获取，注意APP合规性，若最终用户未同意隐私政策则不要调用
        idCode.register(
            res => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    getIdCodes() { //获取设备的各种标识码
        idCode.getIdCodes(res => {
            console.log(res);
            if (res.data) {
                this.msgList.unshift(JSON.stringify(res.data))
            }
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
    getOAID() { //异步获取 OAID
        idCode.getOAID(res => {
            console.log(res);
            if (res.data) {
                this.msgList.unshift(JSON.stringify(res.data))
            }
            uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 3000
            })
        });
    },
}
export default baIdCode
