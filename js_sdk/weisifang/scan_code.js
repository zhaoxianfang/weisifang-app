// 扫码相关的
import helper from './helper.js'
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
				if(_this.checkIsOnlineFile(res.result)){
					console.log('预览文件：' + res.result);
					return _this.previewFileHandle(res.result)
				}
        if(_this.checkIsUrl(res.result)){
					console.log('打开网页：' + res.result);
          return _this.urlHandle(res.result)
        }else{
					return _this.textHandle(res.result)
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
	// 检查是否为可读文件
	checkIsOnlineFile(url){
		var index = url.lastIndexOf('.') // 获取指定字符串最后一次出现的位置，返回index
		if(index < 0){
			return false;
		}
		var ext = url.substr(index + 1, 4); // substr(start, length) 抽取从start下标开始的length个字符，返回新的字符串
		let isImages = ['png','png?', 'jpg','jpg?','jpeg', 'bmp','bmp?', 'gif','gif?', 'webp', 'psd','psd?', 'svg','svg?', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
		let isVideo = ['mp4','mp4?','avi','avi?','mov','mov?','rmvb','rm','flv','flv?','wmv','wmv?'].indexOf(ext.toLowerCase()) !== -1;
		let isPdf = ['pdf','pdf?'].indexOf(ext.toLowerCase()) !== -1;
		let isAudio = ['mp3','mp3?'].indexOf(ext.toLowerCase()) !== -1; // 音频
		
		return isImages || isVideo || isPdf || isAudio
	},
  // url 操作
  urlHandle(url){
    uni.navigateTo({ url: '/pages/common/webview/webview?url='+encodeURI(url) })
  },
	textHandle(text){
		uni.navigateTo({ url: '/pages/common/msg/msg?text='+text })
	},
	// 预览文件 操作
  previewFileHandle(url){
    helper.files.preview(url,'预览')
  },
}
export default scanCode