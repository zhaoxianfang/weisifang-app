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
const tts = uni.requireNativePlugin("nrb-tts-plugin")
const FvvUniTTS = uni.requireNativePlugin("Fvv-UniTTS")
const officeViewModule = uni.requireNativePlugin("Seal-OfficeOnline")
const imageEditor = uni.requireNativePlugin('Ba-ImageEditor')
 const mediaPicker = uni.requireNativePlugin('Ba-MediaPicker') // 图文选择
 const filePicker = uni.requireNativePlugin('Ba-FilePicker') // 文件选择
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
					label: '文档-tts',
					color: '#8a5966',
          page: '/pagesA/docs/index/index',
					size: 30,
          type:'tts'
				},
				{
					name: 'addressbook',
					label: '通讯录-fvv-tts',
					color: '#8a5966',
					size: 30,
          type:'fvv-tts'
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
          type:'share'
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
        	size: 30,
          type:'app_list'
        },
        {
        	name: 'gps',
        	label: 'OCR',
        	color: '#8a5966',
          page: '/pagesA/ocr/index/index',
        	size: 30
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
        }
			]
		};
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
      if(e.type){
        if(e.type == 'tts'){
          tts && tts.init({ "lang":"ZH", "country":"CN" }, res => {
              if(res.success == 0){
                  console.log('初始化TTS成功')
              }
          })
          
          tts && tts.speak('测试语音播报,欢迎使用威四方app,我们致力于为您提供更优质的服务', {}, e => {
              console.log(e)
          
          })
          
          //停止播放
          // tts && tts.stop()
        }
      }
      if(e.type=='fvv-tts'){
        // 初始化
        FvvUniTTS.init((res) => {
            console.log(res)
            FvvUniTTS.speak({
                text:"欢迎使用威四方app,我们致力于为您提供更优质的服务"
            });
            // FvvUniTTS.openSettings();
            console.log('获取最大支持合成的字符数',FvvUniTTS.getMaxSpeechInputLength());
        });
      }
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
      if(e.type=='share'){
        // download.downloadFile('https://weisifang.com/static/system/logo/logo-sm.png')
        // let filePlugin = uni.requireNativePlugin('leruge-file')
        // filePlugin.open({
        //     num: 1, // 一次分享只能选择一张图
        //     list: [
        //         {name: '文档', values: ["doc","wps","docx","xls","xlsx","pdf"]},
        //         {name: '图片', values: ['jpg','png','jpeg']},
        //         {name: '音频', values: ['mp3','flac']},
        //         {name: '视频', values: ["mp4"]}
        //     ]
        // }, res => {
        //   // console.log('选择文件',res)
        //   // console.log('file_path',res.list[0])
        //     //注：返回的地址为：“file://+路径”格式，需要转一下，如下
        //     var file_path = res.list[0].replace("file://", "");
        //     console.log('file_path',file_path)
        //     FileShare.render({
        //       type:"",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
        //       filePath:plus.io.convertLocalFileSystemURL(file_path),
        //       // filePath:'/storage/emulated/0/Android/data/com.weisifang/downloads/image/logo-sm.png',
        //       // filePath:file_path,
        //       }, result => {
        //         console.log('share result',result)
        //       })
        // })
        // uni.chooseImage({
        //     count: 1, //默认9
        //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        //     sourceType: ['album'], //从相册选择
        //     success: function(res) {
        //       //注：uni.chooseImage返回的地址为：“file://+路径”格式，需要转一下，如下
        //       var img_path = res.tempFilePaths[0].replace("file://", "");
        //       console.log('img_path',img_path)
        //       FileShare.render({
        //         type:"",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
        //         filePath:plus.io.convertLocalFileSystemURL(img_path),
        //         // filePath:img_path,
        //         }, result => {
        //           console.log('share result',result)
        //         })
        //     }
        // });
        
          // 方式一：直接在openFile接口中传递在线url
          officeViewModule.openFile({
              url: 'http://silianpan.cn/upload/2022/01/01/1.docx', // 同时支持在线和本地文档，三种参数传递方式，具体查看文档说明
              isTopBar: true, // 是否显示顶栏，默认为：true（显示）
              title: 'Office文档在线预览', // 顶栏标题，默认为：APP名称
              topBarBgColor: '#3394EC', // 顶栏背景颜色，默认为：#177cb0（靛青）
              isBackArrow: true, // 是否显示返回按钮，默认为：true（显示）
              isDeleteFile: true, // 退出是否删除缓存的文件，默认为true（删除缓存文件）
              waterMarkText: '你好，世界\n准备好了吗？时刻准备着', // 水印文本
          });
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
        // 无法保存图片
        uni.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: function(res) {
                //注：uni.chooseImage返回的地址为：“file://+路径”格式，需要转一下，如下
                var img_path = res.tempFilePaths[0].replace("file://", "");
                
                var out_path = plus.io.convertLocalFileSystemURL('_downloads/image_edit.png')
                // console.log('out_path',out_path)
                // console.log('img_path', img_path, res)
                  imageEditor.imageEdit({
                      'path': img_path,//原始图片路径
                      'outputPath': out_path,//保存图片路径
                      // 'outputPath': '/storage/emulated/0/Pictures/BaImageEditor/tietu123.png',//保存图片路径
                      // 'outputPath': '_downloads/image_edit.png',//保存图片路径
                  },
                  (ret) => {
                      console.log(ret)
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
            }
        });
        // //获取 SD卡绝对路径
        // var sd_path = plus.io.convertLocalFileSystemURL('_www/static/images/tabbar/work_active.png')
        
        
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
