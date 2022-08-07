<template>
	<view class="container">
		<view class="header">
			<view class="title">相册</view>
			<view class="sub-title">类似uni-app原生tabbar组件，可用于自定义tabbar</view>
		</view>


		<tui-modal :show="folderModal" @cancel="hideFolder" :custom="true" fadeIn>
			<view class="tui-modal-custom">
				<view class="tui-prompt-title">新建一个相册</view>
				<view class="tui-input__box">
					<input placeholder="请填写相册名称" class="tui-modal-input" v-if="folderModal" v-model="folder_name" />
				</view>
				<tui-button class="modal-button" height="72rpx" :size="28" shape="circle" width="50%" type="white" @click="hideFolder">取消</tui-button>
				<tui-button class="modal-button" height="72rpx" :size="28" shape="circle" width="50%" @click="handleCreateddFolder">确定</tui-button>
			</view>
		</tui-modal>
		
		<view class="tui-box-upload">
			<tui-upload :value="value" :limit="99" :size="8" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
		</view>
		
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
					text: '我的相册',
					iconPath: '/static/images/tabbar/picture_gray.png',
					selectedIconPath: '/static/images/tabbar/picture_active.png',
					num: 1,
					isDot: false
				},
				{
					pagePath: '/pages/tabbar/my/my',
					text: '好友相册',
					iconPath: '/static/images/tabbar/users_gray.png',
					selectedIconPath: '/static/images/tabbar/users_active.png',
					verify: true
				}
			],
			backgroundColor: 'rgba(248,248,248,.7)',
			
			// 新建文件夹 名称
			folder_name:"",
			folderModal:false,
			// 上传文件
			imageData: [],
			//上传接口地址
			serverUrl: "https://api.thorui.cn/",
			 //初始化图片
			value:[]
		};
	},
	onNavigationBarButtonTap(e) {
		if(e.name == 'create_picture'){
			// 新建文件夹 相册
			this.folder_name = '';
			this.folderModal = true;
		}
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
		tabbarSwitch(e) {
			//获取登录状态，此处默认未登录
			if (e.verify) {
				this.tui.toast('此功能暂未开通~');
			} else {
				this.current = e.index;
			}
		},
		// 新建相册
		hideFolder() {
			this.folderModal = false;
		},
		handleCreateddFolder() {
			if (this.folder_name) {
				this.tui.toast('您想创建一个相册：' + this.folder_name);
			}
			this.hideFolder();
		},
		// 上传文件
		result: function(e) {
			console.log(e)
			this.imageData = e.imgArr;
		},
		remove: function(e) {
			//移除图片
			console.log(e)
			let index = e.index
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

.header {
	padding: 80rpx 90rpx 60rpx 90rpx;
	box-sizing: border-box;
}

.title {
	font-size: 34rpx;
	color: #333;
	font-weight: 500;
}

.sub-title {
	font-size: 24rpx;
	color: #7a7a7a;
	padding-top: 18rpx;
}

.tui-mtop {
	margin-top: 80rpx;
}
.tui-image{
	width: 100%;
	height: auto;
}

/* 新建相册 */

	.tui-modal-custom {
		text-align: center;
	}

	.tui-prompt-title {
		padding-bottom: 20rpx;
		font-size: 34rpx;
	}

	.tui-input__box {
		width: 80%;
		height: 82rpx;
		margin: 30rpx auto 50rpx;
	}

	.tui-modal-input {
		border-bottom: 1rpx solid #e6e6e6;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
	}
	.tui-modal-custom .modal-button{
		float: left;
	}
	/* 上传文件 */
	.tui-box-upload {
		padding-left: 25rpx;
		box-sizing: border-box;
	}
</style>
