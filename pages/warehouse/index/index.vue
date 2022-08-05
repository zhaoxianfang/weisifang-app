<template>
	<view class="container">
		<view class="header">
			<view class="title">Tabbar</view>
			<view class="sub-title">类似uni-app原生tabbar组件，可用于自定义tabbar</view>
			<view class="sub-title">库存根据 tab 切换仓库，以及管理员可在tab 右侧编辑仓库</view>
		</view>
		
		<view style="height: 300px;"></view>
		<image src="/static/images/my/mine_bg_3x.png" class="tui-image" mode="widthFix"></image>

		<tui-tabbar :current="current" @click="tabbarSwitch" isFixed hump :backgroundColor="backgroundColor" :tabBar="tabBar" color="#646464" selectedColor="#5677FC"></tui-tabbar>
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
					text: '库存',
					iconPath: '/static/images/tabbar/warehouse_gray.png',
					selectedIconPath: '/static/images/tabbar/warehouse_active.png'
				},
				{
					pagePath: '/pages/tabbar/index/index',
					text: '库存记录',
					iconPath: '/static/images/tabbar/log_gray.png',
					selectedIconPath: '/static/images/tabbar/log_active.png'
				},
				{
					pagePath: '',
					text: '出入库',
					iconPath: '/static/images/tabbar/scan_gray.png',
					hump: true,
					selectedIconPath: '/static/images/tabbar/scan_active.png'
				},
				{
					pagePath: '/pages/tabbar/index/index',
					text: '团队',
					iconPath: '/static/images/tabbar/users_gray.png',
					selectedIconPath: '/static/images/tabbar/users_active.png'
				},
				{
					pagePath: '/pages/tabbar/my/my',
					text: '我的',
					iconPath: '/static/images/tabbar/user_gray.png',
					selectedIconPath: '/static/images/tabbar/user_active.png',
					num: 2,
					isDot: true,
					verify: true
				}
			],
			backgroundColor: 'rgba(248,248,248,.7)'
		};
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
			let isLogin = false;
			if (e.verify && !isLogin) {
				this.tui.toast('您还未登录，请先登录');
			} else {
				this.current = e.index;
			}
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
</style>
