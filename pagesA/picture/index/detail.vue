<template>
	<view class="container">
		<view class="no-data" v-if="photoList.length < 1">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png" btnText="添加照片" @click="addImages">
				<text class="tui-color__black">该相册还没有添加任何照片~</text>
			</tui-no-data>
		</view>
		
    <block v-else>
      <wsf-choose-img src="url" :manage="managePhoto" :list="photoList" :refresh="refresh" @hasRefresh="hasRefresh" @closeImage="closeImage" @setCover="setCover"></wsf-choose-img>
    </block>
    
		<tui-fab :left="0" :right="80" :bottom="80" :width="100" :height="100" bgColor="#5677fc" :btnList="btnList" @click="onClick" custom maskClosable><tui-icon name="setup" color="#fff"></tui-icon></tui-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        managePhoto:false,
        refresh:false,
				photo_id:'',
				photoList:[], // 照片列表
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
					bgColor: "#FFA500",
					//图标/图片地址
					imgUrl: "/static/images/tabbar/image_big.png",
					//图片高度 rpx
					imgHeight: 45,
					//图片宽度 rpx
					imgWidth: 45,
					//名称
					text: "管理图片",
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
		  }
		},
		onShow() {
			console.log(this.photo_id )
      this.refresh = true;
      this.photoList = [];
      this.getList()
      if(this.managePhoto){
        this.btnList[1].text = '完成管理'
      }else{
        this.btnList[1].text = '管理图片'
      }
		},
		methods: {
			getList(){
				this.$api.photo.get_photo_item_list(this.photo_id).then(res => {
					 console.log('照片列表',res);
						if(res.data && res.data.length > 0){
							this.photoList = res.data
						}
					})
					.catch(e => {
						console.log('出错啦', e);
						this.tui.toast('出错啦')
					});
			},
      // 删除图片
      closeImage(e){
        console.log('closeImage',e)
        this.$api.photo.del_photo_item(e.id)
      },
      setCover(e){
        console.log('setCover',this.photo_id,e.id)
        this.$api.photo.set_cover_img(this.photo_id,e.id)
      },
			addImages(){
				this.tui.toast("添加照片")
				uni.navigateTo({
				    url: 'upload?id='+this.photo_id
				});
			},
			onClick(e) {
				let index = e.index
				switch (index) {
					case 0:
						this.addImages();
						break;
					case 1:
						this.managePhoto = !this.managePhoto
            if(this.managePhoto){
              this.btnList[1].text = '完成管理'
            }else{
              this.btnList[1].text = '管理图片'
            }
						break;
					default:
						break;
				}
			},
      // 收到组件通知已经初始化过刷新操作了，重置为不刷新「追加」
      hasRefresh(e){
        this.refresh = false
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
  img{
    /* background-image:url('@/static/images/photo/default.png')); */
		 background: #ccc url(/static/images/photo/default.png) top left no-repeat; 
  }
</style>
