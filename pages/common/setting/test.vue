<template>
	<view class="container">
		
		<view class="tui-title">扩展色</view>
		<view class="tui-btn-box"><tui-button bold type="gray-primary" @click="detail">选择图片并识别</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-green" @click="restart">重启</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-danger" @click="unregister">注销</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="isRunning">是否正在运行</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="getWhiteList">获取当前设备白名单项</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="openWhiteList">打开白名单</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="whiteList">获取并打开白名单</tui-button></view>

	</view>
</template>

<script>

export default {
	data() {
		return {
      channelId: 'weisifang',
      channelName: "weisifang",
      title: "威四方",
      content: "",
      dataResult: "",
      type: undefined
    };
	},
	methods: {
		detail: function() {
			console.log('click~');
			this.tui.toast('click~');
		},
    register() { //注册
        
    },
    isRunning() { //是否正在运行
        
    },
    restart() { //重启
        
    },
    unregister() { //注销
        
    },
    whiteList() { //获取并打开白名单
        
    },
    openWhiteList() { //打开白名单
        
    },
    getWhiteList() { //获取白名单项
        
    }
	}
};
</script>

<style>
.container {
	padding: 20rpx 30rpx 40rpx 30rpx;
	box-sizing: border-box;
}

.tui-title {
	padding: 30rpx 0;
	font-size: 32rpx;
	color: #333;
	font-weight: bold;
}

.tui-btn-box {
	margin-bottom: 26rpx;
}

.tui-flex-box {
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
</style>
