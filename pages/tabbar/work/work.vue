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
  const tts = uni.requireNativePlugin("nrb-tts-plugin")
  const FvvUniTTS = uni.requireNativePlugin("Fvv-UniTTS")
  const FileShare= uni.requireNativePlugin('life-FileShare');// 文件分享
  
  import download from '@/js_sdk/weisifang/download.js'
  
import notice from '@/js_sdk/weisifang/notice.js';
export default {
	data() {
		return {
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
					label: '音乐-files',
					color: '#8a5966',
					size: 30,
          type:'files'
				},
				{
					name: 'feedback',
					label: '笔记-live-不行',
					color: '#8a5966',
					size: 30,
          type:'live'
				},
				{
					name: 'weather',
					label: '天气-share',
					color: '#8a5966',
					size: 30,
          type:'share'
				},
				{
					name: 'gps',
					label: '附近-notice',
					color: '#8a5966',
					size: 30,
          type:'notice'
				},
				{
					name: 'more-fill',
					label: '更多',
					color: '#999',
					size: 30
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
      if(e.type){
        if(e.type == 'tts'){
          tts && tts.init({ "lang":"ZH", "country":"CN" }, res => {
              if(res.success == 0){
                  console.log('初始化TTS成功')
              }
          })
          
          tts && tts.speak('测试语音播报,利年冻品网', {}, e => {
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
                text:"hello f v v 利年冻品网"
            });
            FvvUniTTS.openSettings();
            console.log('获取最大支持合成的字符数',FvvUniTTS.getMaxSpeechInputLength());
        });
      }
      if(e.type == 'files'){
        var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
        AfDocument.openMode({
            size: '10', //选择总数量
            // paths:['/storage/emulated/0/Download','/storage/emulated/0/A',],   //自定义选择目录
            isDown:true,//是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
            types:[{
                name:'文档',
                value:["doc","wps","docx","xls","xlsx","pdf"]
            },{
                name:'视频',
                value:["mp4"] 
            },{
                name:'音乐',
                value:['mp3','flac'] 
            },{
                name:'图片',
                value:['jpg','png'] 
            }]
        },(res)=>{
            this.data = JSON.stringify(res);
        })
      }
      if(e.type=='share'){
        // download.downloadFile('https://weisifang.com/static/system/logo/logo-sm.png')
        FileShare.render({
          type:"",//QQ为QQ，微信为WX，系统默认是SYSTEM，不填写默认SYSTEM
          // filePath:plus.io.convertLocalFileSystemURL(d.filename),
          filePath:'/storage/emulated/0/Android/data/com.weisifang/downloads/image/logo-sm.png',
          }, result => {
            console.log('share result',result)
          })
      }
      if(e.type=='notice'){
        
          notice.send({
          	title:'您有一条新的消息',
          	text:'消息内容',
          	bigText:'君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜奔白发，朝如青丝暮成雪。',
          })
        
      }
			
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
