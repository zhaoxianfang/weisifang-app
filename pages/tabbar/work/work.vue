<template>
	<view class="container">
		<tui-grid>
			<block v-for="(item,index) in dataList" :key="index">
				<navigator :url="item.page" class="tui-cell tui-cell_access" v-show="item.page">
					<tui-grid-item :cell="gridColumn">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.label || item.name}}</text>
					</tui-grid-item>
				</navigator>
				<tui-grid-item :cell="gridColumn" @click="more" v-show="!item.page">
					<view class="tui-grid-icon">
						<tui-icon :name="item.name" :size="item.size" color="#999"></tui-icon>
					</view>
					<text class="tui-grid-label">{{item.label || item.name}}</text>
				</tui-grid-item>
			</block>
		</tui-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridColumn: 2,
				dataList: [{
					name: "strategy",
					label: "文档",
					color: "#8a5966",
					size: 30
				}, {
					name: "addressbook",
					label: "通讯录",
					color: "#8a5966",
					size: 30
				}, {
					name: "picture",
					label: "相册",
					color: "#8a5966",
					size: 30
				}, {
					name: "shop",
					label: "仓库管理",
					color: "#8a5966",
					page: "/pages/warehouse/index/index",
					size: 30
				}, {
					name: "more-fill",
					label: "更多",
					color: "#999",
					size: 30
				}]
			}
		},
		methods: {
			jump_page: function(e){
				// (1)uni.navigateTo(OBJECT) 保留当前页面，跳转到应用内的某个页面
				// (2)uni.redirectTo(OBJECT) 关闭当前页面，跳转到应用内的某个页面
				// (3)uni.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面
				// (4)uni.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				// (5)uni.navigateBack(OBJECT) 关闭当前页面，返回上一页面或多级页面
				if(e.page){
					uni.redirectTo({
					    url: e.page
					});
				}else{
					this.more()
				}
				
			},
			more: function(e) {
				this.tui.toast("敬请期待~");
			}
		}
	}
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
	.tui-grid-2,.tui-grid-3,.tui-grid-4,.tui-grid-5 {
		margin-top: 0 !important;
		color: #8a5966 !important;
	}
</style>
