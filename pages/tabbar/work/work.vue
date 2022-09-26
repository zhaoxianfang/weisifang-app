<template>
	<view class="container">
		<tui-grid>
			<block v-for="(item, index) in dataList" :key="index">
				<navigator :url="item.page" class="tui-cell tui-cell_access" v-show="item.page">
					<tui-grid-item :cell="gridColumn">
						<view class="tui-grid-icon"><tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon></view>
						<text class="tui-grid-label">{{ item.label || item.name }}</text>
					</tui-grid-item>
				</navigator>
				<tui-grid-item :cell="gridColumn" @click="more(item)" v-show="!item.page">
					<view class="tui-grid-icon"><tui-icon :name="item.name" :size="item.size" color="#999"></tui-icon></view>
					<text class="tui-grid-label">{{ item.label || item.name }}</text>
				</tui-grid-item>
			</block>
		</tui-grid>
	</view>
</template>

<script>
// #ifdef APP-PLUS
// const officeViewModule = uni.requireNativePlugin("Seal-OfficeOnline")
const imageEditor = uni.requireNativePlugin('Ba-ImageEditor')
const mediaPicker = uni.requireNativePlugin('Ba-MediaPicker') // 图文选择
const filePicker = uni.requireNativePlugin('Ba-FilePicker') // 文件选择
const floatWindow = uni.requireNativePlugin('Ba-FloatWindow') // 悬浮框
// 已经安装的应用列表
import wxy from '@/js_sdk/weisifang/wxy-android.js';
// #endif
import download from '@/js_sdk/weisifang/download.js'
  
import notify from '@/js_sdk/weisifang/notify.js';
export default {
	data() {
		return {
      baSelectedList:[], // ba 图片文件选择返回值
			gridColumn: 2,
			dataList: [
				{
					name: 'picture',
					label: '相册',
					color: '#8a5966',
					page: '/pagesA/picture/index/index',
					size: 30
				},
				{
					name: 'shop',
					label: '仓库管理',
					color: '#8a5966',
					page: '/pagesA/wms/index/index',
					size: 30
				},
				{
					name: 'strategy',
					label: '文档',
					color: '#8a5966',
          page: '/pagesA/docs/index/index',
					size: 30
				},
				{
					name: 'addressbook',
					label: '通讯录',
					color: '#8a5966',
					size: 30
				},
				{
					name: 'tool',
					label: '音乐-图片选择',
					color: '#8a5966',
					size: 30,
          type:'img'
				},
				{
					name: 'feedback',
					label: '笔记、备忘',
					color: '#8a5966',
					size: 30,
          page: '/pagesA/calendar/index/index',
				},
				{
					name: 'weather',
					label: '天气-预览-office',
					color: '#8a5966',
					size: 30,
          type:'office'
				},
				{
					name: 'gps',
					label: '附近-notify',
					color: '#8a5966',
					size: 30,
          type:'notify'
				},
        {
        	name: 'gps',
        	label: '已安装的app',
        	color: '#8a5966',
        	size: 28,
          type:'app_list'
        },
        {
					name: 'more-fill',
					label: '文件选择',
					color: '#999',
					size: 30,
          type:'files'
				},
        {
        	name: 'more-fill',
        	label: 'editimg',
        	color: '#999',
        	size: 30,
          type:'editimg'
        },{
        	name: 'more-fill',
        	label: '悬浮框',
        	color: '#999',
        	size: 30,
          type:'window'
        },{
        	name: 'more-fill',
        	label: '分享图片',
        	color: '#999',
        	size: 30,
          type:'share'
        }
			],
      
      // 悬浮框参数
      widthRatio: 0.1,
      heightRatio: 0.1,
      xRatio: 0.8,
      yRatio: 0.8,
      moveType: 3,
      slideLeftMargin: 0,
      slideRightMargin: 0,
      duration: 500,
      desktopShow: true,
      tag: "weisifang_default", // 为该弹窗设置标识，以做区分，用于多个
      iconPath: "ba_float_win_icon", // 默认 ba_float_win_icon | custom
      // 悬浮框参数 end
             
    };
	},
  mounted() {
    // #ifdef APP-PLUS
    // 初始化悬浮框
    floatWindow.initIcon({
        widthRatio: this.widthRatio,
        heightRatio: this.heightRatio,
        xRatio: this.xRatio,
        yRatio: this.yRatio,
        moveType: this.moveType,
        slideLeftMargin: this.slideLeftMargin,
        slideRightMargin: this.slideRightMargin,
        duration: this.duration,
        desktopShow: this.desktopShow,
        tag: this.tag,
        iconPath: this.iconPath
    },(res) => {
        console.log('初始化悬浮框',res);
        uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
        })
    });
    // #endif
  },
	methods: {
		jump_page: function(e) {
			// (1)uni.navigateTo(OBJECT) 保留当前页面，跳转到应用内的某个页面
			// (2)uni.redirectTo(OBJECT) 关闭当前页面，跳转到应用内的某个页面
			// (3)uni.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面
			// (4)uni.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
			// (5)uni.navigateBack(OBJECT) 关闭当前页面，返回上一页面或多级页面
			if (e.page) {
				uni.navigateTo({
					url: e.page
				});
			} else {
				this.more();
			}
		},
		more: function(e) {
			this.tui.toast('敬请期待~');
      // #ifdef APP-PLUS
      
      if(e.type == 'img'){
        // 图片视频选择
        mediaPicker.selectPicture({
            'onlyCamera': false, // 是否仅拍照
            'mediaType': 0, // 选择媒体类型 0:所有 1:图片 2:视频 3:音频
            'single': false, // 是否单选
            'singleBack': false, // 单选模式直接返回
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
            'isOriginalControl': false, // 是否开启原图功能
            'isOpenClickSound': false, // 是否开启点击声音
            'isMaxSelectEnabledMask': false, // 是否显示蒙层(达到最大可选数量，默认false,弹窗提示)
            'selectedList': this.baSelectedList,//已选择项回显，注意：需传选择回调返回的data数组
            'position': 0,//初始显示第几项（已选择预览时使用）
        },
        (ret) => {//回调参数
            console.log('文件选择',ret);
            if (ret.data) {
                ret.data.forEach(item => {
                    //文件名： item.fileName
                    //初始路径： item.path
                    //绝对路径： item.realPath
                    //压缩文件路径： item.compressPath
                    //...等等，参照：回调函数表
                })
            }
        });
      }
      if(e.type == 'files'){
        filePicker.selectFile({
            'selectType': 1, // 选择类型：默认为0（ 0：浏览文件目录 1：文件分类）
            'maxCount': 9,
            'filetypes':'png,jpg,gif,mp3,mp4,txt,doc,apk,zip' // 文件类型，多个英文","隔开
        },(ret) => {
            console.log(ret)
            if (ret.data) {
                this.selectedList = ret.data;
            }
        });
      }
      if(e.type=='office'){
        // 文件预览组件
        
          // 方式一：直接在openFile接口中传递在线url
          // officeViewModule.openFile({
          //     url: 'http://silianpan.cn/upload/2022/01/01/1.docx', // 同时支持在线和本地文档，三种参数传递方式，具体查看文档说明
          //     isTopBar: true, // 是否显示顶栏，默认为：true（显示）
          //     title: 'Office文档在线预览', // 顶栏标题，默认为：APP名称
          //     topBarBgColor: '#3394EC', // 顶栏背景颜色，默认为：#177cb0（靛青）
          //     isBackArrow: true, // 是否显示返回按钮，默认为：true（显示）
          //     isDeleteFile: true, // 退出是否删除缓存的文件，默认为true（删除缓存文件）
          //     waterMarkText: '你好，世界\n准备好了吗？时刻准备着', // 水印文本
          // });
          
          
      }
      if(e.type=='notify'){
          notify.send({
          	title:'您有一条新的消息',
          	text:'消息内容',
          	bigText:'君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜奔白发，朝如青丝暮成雪。',
          })
        
      }
      if(e.type=='editimg'){
        var _this = this
        this.helper.files.chooseFile({'mediaType': 1,'max': 1},function(file){
          if(file === false){
            console.log('选择文件出错啦 ')
            return false
          }
          var img_path = file[0].realPath
          var out_path = plus.io.convertLocalFileSystemURL('_downloads/image_edit.png')
            imageEditor.imageEdit({
                'path': img_path,//原始图片路径
                'outputPath': out_path,//保存图片路径
                // 'outputPath': '/storage/emulated/0/Pictures/BaImageEditor/tietu123.png',//保存图片路径
                // 'outputPath': '_downloads/image_edit.png',//保存图片路径
            },
            (ret) => {
                if (ret.outputPath && ret.isImageEdit) {
                  console.log('isImageEdit ',ret.outputPath)
                    // this.path = ret.outputPath;
                    // 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
                    uni.saveImageToPhotosAlbum({
                      filePath: ret.outputPath,
                      success: () => {
                        uni.showToast({
                          title: "保存成功！",
                        });
                        // 再删除保存文件
                        _this.helper.download.delFile(ret.outputPath)
                      },
                      fail: () => {
                        uni.showToast({
                          title: "保存失败",
                        });
                      },
                    });
                }
            });
            
          
        })
        
      }
      if(e.type == 'app_list'){
        
        let appArr=[];
        uni.showLoading({
        	title: '获取中',
        	mask: true,
        	success:(res)=>{
        		appArr = wxy.getApplication();
            console.log('已经安装的应用列表',appArr)
        		// this.num = appArr.length;
        		// this.appArr = appArr;
        		uni.hideLoading();					
        	}
        });			
      }
      if(e.type == 'window'){
        var _this = this
          this.helper.permissions.check_overlays(function(){
            // //显示 悬浮框
            floatWindow.showIcon({
                tag: _this.tag
            }, (res) => {
                console.log(res);
                // if(res.code && res.code==2){
                if(res.code){
                  console.log('点击',res);
                    //点击事件
                    
                    // 唤醒app
                    _this.helper.utils.openApp()
                    
                }
                // uni.showToast({
                //     title: res.msg,
                //     icon: "none",
                //     duration: 3000
                // })
            });
            //隐藏
            // floatWindow.hideIcon({
            //     tag: this.tag
            // });
          })
      }
      if(e.type == 'share'){
        // 图片视频选择
        this.helper.files.chooseFile({'mediaType': 1,'max': 1},function(file){
          console.log('选择',file[0])
          // 分享
          uni.shareWithSystem({
            type:'image', // 分享类型，只支持text，image，默认为text
            summary: '我正在使用威四方相册，你也赶紧来试试吧~', // 分享的文字内容
            // href: 'https://weisifang.com', // 分享链接，ios端分享到微信时必填此字段
            imageUrl: file[0].realPath, // 分享图片，仅支持本地路径
            success(res){
              // 分享完成，请注意此时不一定是成功分享
              console.log('分享完成，请注意此时不一定是成功分享',res)
            },
            fail(err){
              // 分享失败
              console.log('分享失败',err)
            },
            complete(res){
              // 成功或失败都调用
              console.log('成功或失败都调用',res)
            }
          })
        })
      }
      // #endif
			
		}
	}
};
</script>

<style>
.container {
	padding-bottom: env(safe-area-inset-bottom);
}
.tui-title {
	padding: 50rpx 30rpx 30rpx 30rpx;
	font-size: 32rpx;
	color: #333;
	box-sizing: border-box;
	font-weight: bold;
	clear: both;
}

.tui-grid-icon {
	width: 64rpx;
	height: 64rpx;
	margin: 0 auto;
	text-align: center;
	vertical-align: middle;
}

.tui-grid-label {
	display: block;
	text-align: center;
	font-weight: 400;
	color: #333;
	font-size: 28rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-top: 10rpx;
}
.tui-grid-2,
.tui-grid-3,
.tui-grid-4,
.tui-grid-5 {
	margin-top: 0 !important;
	color: #8a5966 !important;
}
</style>
<style scoped>
  .tui-grid{
    line-height: 100rpx !important;
    overflow: hidden;
  }
</style>