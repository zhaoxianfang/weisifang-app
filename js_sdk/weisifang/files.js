// 文件操作相关。例如选择文件等
// #ifdef APP-PLUS
const mediaPicker = uni.requireNativePlugin('Ba-MediaPicker') // 图文选择
const filePicker = uni.requireNativePlugin('Ba-FilePicker') // 文件选择
// #endif

const files = {
  // 选择资源文件 主要是 图片，视频，音频
  selectImgOrVideo(options = {}, callbackFun) {
    // #ifdef APP-PLUS
    var defautl_options = {
      'onlyCamera': false, // 是否仅拍照
      'mediaType': 0, // 选择媒体类型 0:所有 1:图片 2:视频 3:音频
      'single': false, // 是否单选
      'singleBack': true, // 单选模式直接返回
      'max': 9, // 多选最大选择数
      'maxVideo': 1, // 多选最大选择数（视频）
      'compress': false, // 是否压缩
      'crop': false, // 是否裁剪
      'cropScale': 0, // 裁剪比例 0(默认) 1(1:1) 2(3:4) 3(3:2) 4(16:9)
      'cropRound': false, // 是否裁剪圆形
      'gif': false, // 是否显示gif图片
      'language': 0, // 语言 0简体中文 1繁体中文 2英语 3韩语 4德语 5法语 6日语 7越语 8西班牙语 9葡萄牙语 10阿拉伯语 11俄语
      'slide': true, // 滑动选择
      'isCamera': true, // 显示拍摄、拍照、录音
      'isDisplayTimeAxis': false, // 显示资源时间轴
      'isOriginalControl': true, // 是否开启原图功能
      'isOpenClickSound': true, // 是否开启点击声音
      'isMaxSelectEnabledMask': true, // 是否显示蒙层(达到最大可选数量，默认false,弹窗提示)
      'selectedList': [], //已选择项回显，注意：需传选择回调返回的data数组
      'position': 0, //初始显示第几项（已选择预览时使用）
    }
    var opts = Object.assign({}, defautl_options, options)
    // 图片视频选择
    mediaPicker.selectPicture(opts, (ret) => { //回调参数
      if (ret.data) {
        if (opts.single) {
          callbackFun && callbackFun(ret.data[0])
        } else {
          callbackFun && callbackFun(ret.data)
        }
        // ret.data.forEach(item => {
        // item.fileName	文件名
        // item.path	初始路径
        // item.realPath	绝对路径
        // item.compressed	是否压缩
        // item.compressPath	压缩文件路径
        // item.isCut	是否裁剪
        // item.cutPath	裁剪路径
        // item.isOriginal	是否开启原图
        // item.originalPath	原图路径
        // item.videoThumbnailPath	视频缩略图
        // item.size	文件大小
        // item.duration	文件时长
        // })
      } else {
        callbackFun && callbackFun(false)
      }
    });
    // #endif

    // #ifndef APP-PLUS
    uni.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图original还是压缩图compressed，默认二者都有
      // sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        //注：uni.chooseImage返回的地址为：“file://+路径”格式，需要转一下，如下
        res.real_path = res.tempFilePaths[0].replace("file://", "");
        callbackFun && callbackFun(res)
      },
      fail: function(err) {
        callbackFun && callbackFun(false)
      },
      complete: function(res) {}
    });
    // #endif
    
    
  },
  // 选择文件
  selectFiles(options = {}, callbackFun){
    var defautl_options = {
      'selectType':  1, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类）
      'maxCount': 1,
      'filetypes':'doc,docx,ppt,xls,xlsx,zip,mp3,mp4,avi,mov,rmvb,rm,flv,wmv' // 文件类型，多个英文","隔开
    }
    var opts = Object.assign({}, defautl_options, options)

    // #ifdef APP-PLUS
    filePicker.selectFile(opts,(ret) => {
        callbackFun && callbackFun(ret.data)
    });
    // #endif
    
    // #ifndef APP-PLUS
    uni.chooseFile({
      count: opts.maxCount || 9,
      extension: opts.filetypes || ['.zip','.doc','.docx','.ppt','.pptx','.xls','.xlsx','.mp3','.mp4','.avi','.mov','.rmvb','.rm','.flv','.wmv'],
    	success: function (res) {
    		callbackFun && callbackFun(res)
      },
      fail: function(err) {
        callbackFun && callbackFun(false)
      },
      complete: function(res) {}
    });
    // #endif
    
  },
  // #ifndef APP-PLUS
  // 创建文件夹 例如：path='_downloads/images' 以"_downloads/"、"_doc/"、"_documents/" 开头
  createDir(path, callback) {
  	plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function(success) {
  		success.root.getDirectory(path, { create: true }, function(entry) {
  			callback && callback()
  		}, function(e) {
  			// console.log('文件夹创建出错')
  			plus.nativeUI.toast('文件下载失败')
  		})
  	})
  },
  /* 根据后缀判断文件类型 */
  getFileType(fileName) {
  	let suffix = '' // 后缀获取
  	let result = '' // 获取类型结果
  	if (fileName) {
  		//获取最后一个.的位置
  		var index = fileName.lastIndexOf('.')
  		//获取后缀
  		suffix = fileName.substr(index + 1)
  	}
  
  	if (!suffix) return 'other' // fileName无后缀返回false
  	suffix = suffix.toLocaleLowerCase() // 将后缀所有字母改为小写方便操作
  	// 匹配图片
  	const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif'] // 图片格式
  	result = imgList.find(item => item === suffix)
  	if (result) return 'image'
  	// 匹配txt
  	const txtList = ['txt']
  	result = txtList.find(item => item === suffix)
  	if (result) return 'txt'
  	// 匹配excel
  	const excelList = ['xls', 'xlsx']
  	result = excelList.find(item => item === suffix)
  	if (result) return 'excel'
  	// 匹配word
  	const wordList = ['doc', 'docx']
  	result = wordList.find(item => item === suffix)
  	if (result) return 'word'
  	// 匹配pdf
  	const pdfList = ['pdf']
  	result = pdfList.find(item => item === suffix)
  	if (result) return 'pdf'
  	// 匹配ppt
  	const pptList = ['ppt', 'pptx']
  	result = pptList.find(item => item === suffix)
  	if (result) return 'ppt'
  	// 匹配zip
  	const zipList = ['rar', 'zip', '7z']
  	result = zipList.find(item => item === suffix)
  	if (result) return 'zip'
  	// 匹配视频
  	const videoList = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v']
  	result = videoList.find(item => item === suffix)
  	if (result) return 'video'
  	// 匹配音频
  	const radioList = ['mp3', 'wav', 'wmv']
  	result = radioList.find(item => item === suffix)
  	if (result) return 'radio'
  	// 其他文件类型
  	return 'other'
  },
  // 删除文件 例如：relativePath 以"_downloads/"、"_doc/"、"_documents/" 开头
  delFile(relativePath, callback) {
  	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
  		entry.remove(function(entry) {
  			// console.log('文件删除成功==' + relativePath)
  			callback && callback()
  		}, function(e) {
  			// console.log('文件删除失败=' + relativePath)
  			plus.nativeUI.toast('文件删除失败')
  		})
  	})
  }
  // #endif
}
export default files
