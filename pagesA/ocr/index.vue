
<template>
    <view class="container">
      
        <image :src="imgsrc" class="tui-flex-box priview-img" mode="aspectFit"></image>

        <view class="msg-content">
        	<view class="tips">
        		{{ocrresult}}
        	</view>
        </view>
        
        <tui-fab bgColor="#5677fc" :btnList="[]" @click="ocr" custom maskClosable><tui-icon name="refresh" color="#fff" class="menu-fab"></tui-icon></tui-fab>
        
    </view>
</template>

<script>

export default {
  data() {
      return {
          ocrresult:'识别内容展示区...', 
          imgsrc:''
      }
  },
  onLoad() {
    this.ocr()
  },
  methods: {
      // 识别图片
      ocr()
      {
          var that=this;
          let ocrmodule = uni.requireNativePlugin('guang-ocrmodule');
          uni.chooseImage({
            count: 1, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album','camera'], 
            success: function (res) {
                let filepath= res.tempFilePaths[0];
                let fullpath = plus.io.convertLocalFileSystemURL(filepath);
                // console.log(JSON.stringify(res.tempFilePaths))
                // console.log(fullpath);
                that.imgsrc=fullpath;

                uni.showLoading({
                    title: '识别中'
                });

                var ret = ocrmodule.ocr({"file":fullpath,},e=>{
                  // console.log(JSON.stringify(e));
                  // that.ocrresult=JSON.stringify(e);
                  // that.ocrresult=JSON.stringify(e.fullresult);
                  that.ocrresult=JSON.stringify(e.textresult);
                  uni.hideLoading();
                })
            }
        });
      },
      // 识别base64图片
      base64ocr()
      {
        var that=this;
        let ocrmodule = uni.requireNativePlugin('guang-ocrmodule');
        uni.chooseImage({  
          count: 1, 
          sizeType: ['original', 'compressed'], 
          sourceType: ['album', 'camera'], 
          success(res) {
             let path= res.tempFilePaths[0];
             var bitmap = new plus.nativeObj.Bitmap("test");
             bitmap.load(path,function(){
               var base64=bitmap.toBase64Data();
               that.imgsrc=base64
               uni.showLoading({
                   title: '识别中'
               });
               var ret = ocrmodule.ocr({ "base64":base64 },e=>{
                  that.ocrresult=JSON.stringify(e);
                  console.log(JSON.stringify(e));
                  uni.hideLoading();
               })
            })
          } 
      });
    }
  }
}
</script>

<style>
   .container {
   	padding: 20rpx 30rpx 40rpx 30rpx;
   	box-sizing: border-box;
   }

 
   .tui-flex-box {
   	width: 100%;
   	display: flex;
   	align-items: center;
   	flex-wrap: wrap;
   }
    .priview-img{
      width: 100%;
      height: 600upx
    }
    
    .msg-content{
    	width: 90%;
    	min-height: 100upx;
    	line-height: 100upx;
    	text-align: center;
    	border-top: 2rpx solid #ffaa00;
    	border-bottom: 2rpx solid #ffaa00;
    	margin: 30rpx auto;
    	padding: 20upx 30upx;
      vertical-align: middle;
    }
    .tips{
      width: 100%;
    	line-height: 1.5;
    	display: inline-block;
    	vertical-align: middle;
      word-wrap: break-word;
    }
</style>