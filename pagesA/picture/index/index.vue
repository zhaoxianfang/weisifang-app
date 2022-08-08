<template>
	<view class="container">
		<view class="no-data">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png"  btnText="新建相册"  @click="folderModal = true">
				<text class="tui-color__black">您还没有添加任何相册~</text>
			</tui-no-data>
		</view>
		
		<block>
			<view class="tui-ranking__list tui-justify__start" >
				<view class="tui-ranking__item tui-item-mr__16" @tap="openFolder" v-for="(item, key) in folderList" :key="key">
					<image :src="item.img"></image>
					<view class="tui-ranking__gtitle">{{ item.title }}</view>
					<view class="tui-ranking__sub">2022-01-01</view>
				</view>
			</view>
		</block>

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
		
		<view class="tui-btn-back" @click="folderModal = true">+</view>
		
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
			
			// 相册列表
			folderList: [
				{
					img: '/static/images/tabbar/picture_gray.png',
					title: '我的相册一',
					sales: 100000
				},
				{
					img: '/static/images/tabbar/picture_active.png',
					title: '我的相册二',
					sales: 98000
				},
				{
					img: '/static/images/tabbar/picture_active.png',
					title: '我的相册三',
					sales: 90000
				},
				{
					img: '/static/images/tabbar/picture_gray.png',
					title: '我的相册一',
					sales: 100000
				},
				{
					img: '/static/images/tabbar/picture_active.png',
					title: '我的相册二',
					sales: 98000
				},
				{
					img: '/static/images/tabbar/picture_active.png',
					title: '我的相册三',
					sales: 90000
				}
			]
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
		
		// 打开相册
		openFolder() {
			console.log('openFolder')
			uni.navigateTo({
			    url: 'detail?id=99'
			});
		},
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
	
	/* 相册列表 */
	.tui-ranking__list {
		padding-left: 16px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-justify__start {
		justify-content: flex-start !important;
	}
	
	.tui-item-mr__16 {
		margin-right: 16rpx;
	}
	
	.tui-ranking__item {
		width: 224rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #fff;
		padding-bottom: 20rpx;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}
	
	.tui-ranking__item image {
		width: 224rpx;
		height: 224rpx;
		display: block;
	}
	.tui-ranking__gtitle {
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 24rpx 12rpx 8rpx;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.tui-ranking__sub {
		font-size: 25rpx;
		line-height: 25rpx;
		padding: 8rpx 18rpx 8rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
		color: #999;
	}
	/* 没数据 */
	.no-data{
		margin-top: 30%;
	}
</style>
