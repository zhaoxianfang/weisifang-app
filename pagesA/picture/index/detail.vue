<template>
	<view class="container">
		<view class="no-data" v-if="imgList.length < 1">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png" btnText="添加照片" @click="addImages">
				<text class="tui-color__black">该相册还没有添加任何照片~</text>
			</tui-no-data>
		</view>
		
		<block>
			<view class="tui-ranking__list tui-justify__start" >
				<view class="tui-ranking__item tui-item-mr__16" v-for="(item, key) in imgList" :key="key">
					<image :src="item.url || '/static/images/photo/default.png'"></image>
					<!-- <view class="tui-ranking__gtitle">{{ item.size }}</view> -->
				</view>
			</view>
		</block>
		
		<tui-fab :left="0" :right="80" :bottom="80" :width="100" :height="100" bgColor="#5677fc" :btnList="btnList" @click="onClick" custom maskClosable><tui-icon name="setup" color="#fff"></tui-icon></tui-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photo_id:'',
				imgList:[], // 照片列表
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
				this.photo_id = option.id
				console.log(option)
				// 设置标题
				uni.setNavigationBarTitle({
					title: option.name || '相册详情'
				});
				this.getList()
		  }
		},
		onShow() {
			console.log(this.photo_id )
		},
		methods: {
			getList(){
				this.$api.photo.get_photo_item_list(this.photo_id).then(res => {
					 console.log('照片列表',res);
						if(res.data && res.data.length > 0){
							this.imgList = res.data
						}
					})
					.catch(e => {
						console.log('出错啦', e);
						this.tui.toast('出错啦')
					});
			},
			addImages(){
				this.tui.toast("添加照片")
				uni.navigateTo({
				    url: 'upload?id='+this.photo_id
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
	
	/* 相册列表 */
	.tui-ranking__list {
		padding-left: 16px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap; // flex 自动换行
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
		margin-bottom: 20rpx;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	}
	
	.tui-ranking__item image {
		width: 204rpx;
		height: 224rpx;
		padding: 10rpx;
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
	

</style>
