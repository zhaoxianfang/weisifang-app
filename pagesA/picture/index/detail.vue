<template>
	<view class="container">
		<view class="no-data">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png" btnText="添加照片" @click="addImages">
				<text class="tui-color__black">该相册还没有添加任何照片~</text>
			</tui-no-data>
		</view>
		
		<tui-fab :left="0" :right="80" :bottom="80" :width="100" :height="100" bgColor="#5677fc" :btnList="btnList" @click="onClick" custom maskClosable><tui-icon name="setup" color="#fff"></tui-icon></tui-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnList: [{
					bgColor: "#1589FF",
					//图标/图片地址
					imgUrl: "/static/images/tabbar/plus_big.png",
					//图片高度 rpx
					imgHeight: 45,
					//图片宽度 rpx
					imgWidth: 45,
					//名称
					text: "添加图片",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}, {
					bgColor: "#DC381F",
					//图标/图片地址
					imgUrl: "/static/images/tabbar/delete_big.png",
					//图片高度 rpx
					imgHeight: 45,
					//图片宽度 rpx
					imgWidth: 45,
					//名称
					text: "删除图片",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}, {
					bgColor: "#FFA500",
					//图标/图片地址
					imgUrl: "/static/images/tabbar/image_big.png",
					//图片高度 rpx
					imgHeight: 45,
					//图片宽度 rpx
					imgWidth: 45,
					//名称
					text: "设置封面",
					//字体大小
					fontSize: 34,
					//字体颜色
					color: "#fff"
				}]
			}
		},
		onLoad(option) {
		  if (option) {
			console.log(option)
			// 设置标题
			uni.setNavigationBarTitle({
				title: '相册详情'
			});

		    // this.name = option.name
		    // this.uid = option.uid
		    // if (option.list) {
		    //   this.list = JSON.parse(decodeURIComponent(option.list));
		    // }
		  }
		},
		onShow() {
			
		},
		methods: {
			addImages(){
				this.tui.toast("添加照片")
				uni.navigateTo({
				    url: 'upload?id=99'
				});
			},
			onClick(e) {
				let index = e.index
				this.tui.toast("您点击了悬浮按钮"+index)
				switch (index) {
					case 0:
						this.addImages();
						break;
					// case 1:
					// 	// #ifdef MP || H5
					// 	this.clipboard("https://www.thorui.cn/")
					// 	// #endif
					// 	//#ifdef APP-PLUS
					// 	plus.share.sendWithSystem({
					// 		content: "ThorUI组件库",
					// 		href: 'https://www.thorui.cn/'
					// 	}, function() {
					// 		console.log('分享成功');
					// 	}, function(e) {
					// 		console.log('分享失败：' + JSON.stringify(e));
					// 	});
					// 	//#endif
					// 	break;
					// case 2:
					// 	uni.previewImage({
					// 		urls: ["https://thorui.cn/img/reward.jpg"]
					// 	})
					// 	break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}
	.no-data{
		margin-top: 30%;
	}
</style>
