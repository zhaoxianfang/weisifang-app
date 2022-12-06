// ba 组件合集
// https://ext.dcloud.net.cn/publisher?id=114807

import baBeep from '@/js_sdk/ba/baBeep.js'
import baChangeIcon from '@/js_sdk/ba/baChangeIcon.js'
import baIdCode from '@/js_sdk/ba/baIdCode.js'
import baLocation from '@/js_sdk/ba/baLocation.js'
import baNotify from '@/js_sdk/ba/baNotify.js'
import baScanner from '@/js_sdk/ba/baScanner.js'

const ba = {
    beep: baBeep,
    changeIcon: baChangeIcon,
    idCode: baIdCode,
    location: baLocation,
    notify: baNotify,
    scanner: baScanner
}
export default ba
