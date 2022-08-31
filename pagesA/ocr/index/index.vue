<template>
  <view class="content">

    <button type="default" @click="ocr">传图片文件进行ocr识别</button>

    <button type="default" @click="base64ocr">传base64图片进行OCR识别 </button>
    <image :src="imgsrc" />
    <view style="padding: 10px;margin: 10px;word-break: break-all;">
      {{ ocrresult }}
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ocrresult: '识别结果',
      imgsrc: ''
    }
  },
  onLoad() {

  },
  methods: {
    ocr() {
      var that = this
      const ocrmodule = uni.requireNativePlugin('guang-ocrmodule')
      uni.chooseImage({
        count: 1, // 单张识别
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          const filepath = res.tempFilePaths[0]
          const fullpath = plus.io.convertLocalFileSystemURL(filepath)
          console.log(JSON.stringify(res.tempFilePaths))
          console.log(fullpath)
          that.imgsrc = fullpath
          uni.showLoading({
            title: '识别中'
          })

          var ret = ocrmodule.ocr({
            'file': fullpath
          }, e => {
            console.log(JSON.stringify(e))
            that.ocrresult = JSON.stringify(e)
            uni.hideLoading()
          })
        }

      })
    },
    base64ocr() {
      var that = this
      const ocrmodule = uni.requireNativePlugin('guang-ocrmodule')
      uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const path = res.tempFilePaths[0]
          var bitmap = new plus.nativeObj.Bitmap('test')
          bitmap.load(path, function() {
            var base64 = bitmap.toBase64Data()
            that.imgsrc = base64
            uni.showLoading({
              title: '识别中'
            })
            var ret = ocrmodule.ocr({
              'base64': base64
            }, e => {
              that.ocrresult = JSON.stringify(e)
              console.log(JSON.stringify(e))
              uni.hideLoading()
            })
          })
        }
      })
    }
  }
}
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50rpx;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>
