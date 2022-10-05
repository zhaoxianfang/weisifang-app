<template>
	<view class="container">
		<!--左抽屉 设置文档目录-->
		<tui-drawer mode="left" :visible="showMenu" @close="closeMenu">
			<view class="d-container">
				<tui-button height="80rpx"  type="green" shape="circle" @click="closeMenu">关闭文档目录</tui-button>
			</view>
		</tui-drawer>
    
    
    <tui-fab :left="0" :right="60" :bottom="140" :width="80" :height="80" bgColor="#5677fc" :btnList="btnList" @click="openMenu" custom maskClosable><tui-icon name="screen" color="#fff" class="menu-fab"></tui-icon></tui-fab>
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMenu: false,
        btnList: []
			}
		},
		methods: {
			closeMenu(e) {
				this.showMenu = false
			},
			openMenu() {
				this.showMenu = !this.showMenu
			}
		}
	}
</script>

<style>
	.d-container {
		width: 400rpx;
		padding: 80rpx 30rpx
	}
  .menu-fab{
    font-size: 36rpx!important;
  }
</style>
