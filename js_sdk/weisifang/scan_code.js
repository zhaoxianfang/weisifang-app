// 扫码相关的

const scanCode = {
  // 扫码
  scan(onlyCamera = false) {
    var _this = this;
    // 调起条码扫描
    uni.scanCode({
      onlyFromCamera: onlyCamera, // 只能从相机
    	// scanType: ['barCode'], // barCode	一维码,qrCode	二维码,datamatrix	Data Matrix 码,pdf417	PDF417 条码
    	success: function (res) {
    		console.log('条码类型：' + res.scanType);
    		console.log('条码内容：' + res.result);
        if(_this.checkIsUrl(res.result)){
          return _this.urlHandle(res.result)
        }else{
          uni.showToast({
          	// #ifndef MP-ALIPAY
          	duration: 2500,
          	// #endif
          	title: res.result || '识别有误',
          	icon: 'none'
          })
        }
    	},
      complete: function (res) {
    		// console.log('complete' + res);
    		// console.log('条码内容：' + res.result);
    	}
    });
  },
  // 检查是否为url
  checkIsUrl(str){
    var v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
    return v.test(str);
  },
  // url 操作
  urlHandle(url){
    uni.navigateTo({ url: '/pages/common/webview/webview?url='+encodeURI(url) })
  },
}
export default scanCode