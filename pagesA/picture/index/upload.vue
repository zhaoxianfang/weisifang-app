<template>
	<view class="container">
		<view class="tui-box-upload">
			<wsf-upload :max="19" v-model="value" :chooseNum="9" :headers="headers" :compress="true" name='file' :formData="formData" :remove="true"
				@uploadSuccess="uploadSuccess" @imgDelete="remove" @uploadFail="uploadFail" :action="serverUrl" @chooseSuccess="chooseSuccess"></wsf-upload>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js' // 倒入默认配置
	export default {
		name: 'upload-page',
		data() {
			return {
				// 上传文件
				imageData: [],
				//上传接口地址
				serverUrl: "",
				 //初始化图片
				value:[
					'https://weisifang.com/photos/9PfZSGkucgm7/20220928/6334570676ad4.jpg?uni_file=6'
				],
				headers:{
					'Authorization': this.tui.getToken()
				},
				formData:{
					id:null
				}
			}
		},
		onLoad(option) {
			
		  if (option) {
				console.log(option)
				this.formData.id = option.id
				this.serverUrl = config.baseURL+'photo/items/upload/'+option.id
			// 设置标题
			// uni.setNavigationBarTitle({
			// 	title: '相册详情'
			// });
		  }
		},
		methods: {
			remove: function(e) {
				//移除图片
				console.log('移除图片',e)
				// console.log('移除图片',e,e.file.id)
				// let index = e.index
				// this.$api.photo.del_photo_item(e.file.id)
			},
			uploadSuccess(res) { //上传成功
				//console.log('res11111111111', res)
				/****************
				因为上传接口返回的结构不一致，所以以下代码需要根据实际的接口返回结构开发，在此只是展示如果给数组里添加的过程，仅供参考
				***************/
				var _res = JSON.parse(res.data);
				console.log('_res', _res)
				if (_res.code == 200) {
					this.value.push(_res.url);
				}
				/*******************************/
			},
			uploadFail(err) { //上传失败
				console.log('err', err)
			},
			chooseSuccess(file,tyoe) { //未设置上传地址
				console.log('chooseSuccess', file,tyoe)
			},
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
