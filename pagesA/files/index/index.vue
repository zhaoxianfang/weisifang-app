<template>
	<view class="container">
		<view class="no-data" v-if="current < 1">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png"  btnText="查看本地文件"  @click="openLoaclFiles">
				<text class="tui-color__black">点击下方按钮查看本地文件~</text>
			</tui-no-data>
		</view>
    
    <!--=======在线文件 start=======-->
    <view class="tui-padding" v-if="current > 0">
      <view v-for="(item,index) in filesList" :key="index"  class="tui-classify-box">
        <tui-collapse :index="index" :current="collapseCurrent" :disabled="item.disabled" @click="changeCollapse">
          <template v-slot:title>
            <tui-list-cell padding="30rpx" :hover="false" unlined><view class="tui-classify__main">{{item.name}}</view></tui-list-cell>
          </template>
          <template v-slot:content>
            <view class="tui-classify__sub"  >
              <view class="tui-classify__item" @tap="previewFile(file)" v-for="(file,key) in item.list" :key="key">{{file.title}}</view>
            </view>
          </template>
        </tui-collapse>
      </view>
      
    	
    </view>
    <!--=======在线文件 end=======-->

		<tui-tabbar :current="current" @click="tabbarSwitch"  backdropFilter :backgroundColor="backgroundColor" :tabBar="tabBar" color="#646464" selectedColor="#5677FC"></tui-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			tabBar: [
				{
					pagePath: '/pages/tabbar/index/index',
					text: '本地文件',
					iconPath: '/static/images/tabbar/files_gray.png',
					selectedIconPath: '/static/images/tabbar/files_active.png',
					// num: 1,
					// isDot: false
				},
				{
					pagePath: '/pages/tabbar/my/my',
					text: '在线文件',
					iconPath: '/static/images/tabbar/files_gray.png',
					selectedIconPath: '/static/images/tabbar/files_active.png',
					// verify: true
				}
			],
			backgroundColor: 'rgba(248,248,248,.7)',
			
      collapseCurrent: 0, // 手风琴
      
      filesList: [],
      // filesList: [{
      // 		name: "杜甫",
      // 		current: 0,
      // 		disabled: false,
      //     list:[{
      //       title:'李清照出生于书香门第李清照出生于书香门第李清照出生于书香门第',
      //       url:'http://silianpan.cn/upload/2022/01/01/1.docx'
      //     }]
      // 	}
      // ],
		};
	},
	onShow() {
	},
	mounted() {
    this.getList()
	},
	onLoad() {
		// #ifdef H5
		this.backgroundColor = '#f8f8f8';
		// #endif
		// #ifndef H5
		if (this.tui.isAndroid()) {
			this.backgroundColor = '#f8f8f8';
		}
		// #endif
	},
	methods: {
		// 获取我的相册列表
		getList(){
			this.$api.my_files.jdwz({}).then(res => {
        // console.log(res)
					if(res.code == 200){
						this.filesList = res.data
					}
				})
				.catch(e => {
					console.log('出错啦', e);
					this.tui.toast('出错啦')
				});
		},
		tabbarSwitch(e) {
      // console.log(e)
			//获取登录状态，此处默认未登录
			if (e.verify) {
				this.tui.toast('此功能暂未开通~');
			} else {
				this.current = e.index;
			}
		},
		// 打开本地文件
		openLoaclFiles() {
      var _this = this
			this.helper.files.selectFiles({
        'selectType':  1, // 选择类型：默认为0（ 0：浏览文件目录 1：文件在线文件）
        'maxCount': 1,
        'filetypes':'jpg,png,doc,ppt,xls,mp3,mp4,avi,mov,rmvb,rm,flv,wmv' // 文件类型，多个英文","隔开
      },function(file){
			  if(file === false){
			    console.log('选择文件出错啦 ')
			    return false
			  }
        _this.helper.files.preview(file[0].absolutePath,file[0].name)
			})
		},
    detail(e) {
    	
    },
    changeCollapse(e) {
    	//可关闭自身
    	this.collapseCurrent = this.collapseCurrent == e.index ? -1 : e.index
    },
    previewFile(file){
      // console.log(file)
      this.helper.files.preview(file.url,file.title)
    }
	}
};
</script>

<style>
/* page {
		background: #EDEDED;
	}
 */
  .container {
    padding: 20rpx 0 120rpx 0;
    box-sizing: border-box;
  }

  .tui-flex {
    display: flex;
    align-items: center;
  }
  
  /* 在线文件 */
  
  .tui-padding {
  	width: 100%;
  	padding: 0 25rpx 30rpx;
  	box-sizing: border-box;
  }
  /*=======在线文件===== start*/
  .tui-classify-box {
  	margin-top: 20rpx;
  	border-radius: 12rpx;
  	overflow: hidden;
  	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
  }
  .tui-classify__main {
  	font-size: 30rpx;
  	line-height: 30rpx;
  	position: relative;
  }
  .tui-classify__main::before {
  	content: '';
  	position: absolute;
  	height: 80%;
  	width: 6rpx;
  	left: -16rpx;
  	top: 10%;
  	background-color: #eb0909;
  }
  .tui-classify__sub {
  	width: 100%;
  	padding: 0 30rpx 15rpx;
  	box-sizing: border-box;
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	flex-wrap: wrap;
  	background-color: #fff;
  }
  .tui-classify__item {
  	width: 98%;
  	padding: 16rpx;
  	box-sizing: border-box;
  	background-color: #f5f5f5;
  	font-size: 26rpx;
  	color: #555;
  	margin-bottom: 2%;
  	border-radius: 6rpx;
  	white-space: nowrap;
  	overflow: hidden;
  	text-overflow: ellipsis;
  }
  /*======在线文件====== end*/
</style>
