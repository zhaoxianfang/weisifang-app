// 文件操作相关。例如选择文件等
// #ifdef APP-PLUS
const mediaPicker = uni.requireNativePlugin('Ba-MediaPicker') // 图文选择
// #endif

const files = {
  // 选择资源文件
  chooseFile(options = {}, callbackFun) {
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
  }
}
export default files
