<template>
	<view class="container">
		<view class="tui-box-upload">
			<tui-upload :value="value" :limit="99" :size="8" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 上传文件
				imageData: [],
				//上传接口地址
				serverUrl: "https://api.thorui.cn/",
				 //初始化图片
				value:[],
			}
		},
		onLoad(option) {
		  if (option) {
			console.log(option)
			// 设置标题
			// uni.setNavigationBarTitle({
			// 	title: '相册详情'
			// });
		  }
		},
		methods: {
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
	}
</script>

<style scoped>
	.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}
	/* 上传文件 */
	.tui-box-upload {
		padding-left: 25rpx;
		box-sizing: border-box;
	}
	::v-deep .tui-upload-add{
		color: #fff;
		background-color: #C0C0C0;
	}
</style>
