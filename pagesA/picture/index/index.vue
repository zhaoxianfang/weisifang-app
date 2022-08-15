<template>
	<view class="container">
		<t-rt-popup :itemList="clickManageTips" ref="rtBubble"></t-rt-popup>
		<view class="no-data" v-if="folderList.length < 1">
			<tui-no-data :fixed="false" imgUrl="/static/images/tabbar/null.png"  btnText="新建相册"  @click="folderModal = true">
				<text class="tui-color__black">您还没有添加任何相册~</text>
			</tui-no-data>
		</view>
		
		<block>
			<view class="tui-ranking__list tui-justify__start" >
				<view class="tui-ranking__item tui-item-mr__16" @click="openFolder(item)" v-for="(item, key) in folderList" :key="key">
					<image :src="item.img || '/static/images/photo/default.png'"></image>
					<view class="tui-ranking__gtitle">{{ item.name }}</view>
					<!-- <view class="tui-ranking__sub" v-if="!isManage">包含xxx张照片</view> -->
					<view class="tui-flex-box" v-if="isManage">
						<!-- <tui-button margin="0 10rpx 6rpx 0" type="danger" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="deleteFolder(item)">删除</tui-button> -->
						<tui-button margin="0 10rpx 6rpx 0" type="green" plain shape="rightAngle" width="200rpx" height="50rpx" :size="24" @click="renameFolder(item)">修改名称</tui-button>
					</view>
				</view>
			</view>
		</block>

		<tui-modal :show="folderModal" @cancel="hideFolder" :custom="true" fadeIn>
			<view class="tui-modal-custom">
				<view class="tui-prompt-title">{{folder_name?'修改':'新建'}}相册</view>
				<view class="tui-input__box">
					<input placeholder="请填写相册名称" class="tui-modal-input" v-if="folderModal" v-model="folder_name" />
				</view>
				<tui-button class="modal-button" height="72rpx" :size="28" shape="circle" width="50%" type="white" @click="hideFolder">取消</tui-button>
				<tui-button class="modal-button" height="72rpx" :size="28" shape="circle" width="50%" @click="handleCreateddFolder">确定</tui-button>
			</view>
		</tui-modal>
		
		<view class="tui-btn-addfolder" @click="folderModal = true">+</view>
		<tui-modal :show="showDelete" @click="handleClickDelete" @cancel="hideDelete" title="提示" :content="`确定删除相册( ${currentFolder.title} ) 吗？`"></tui-modal>
		
		<tui-tabbar :current="current" @click="tabbarSwitch"  backdropFilter :backgroundColor="backgroundColor" :tabBar="tabBar" color="#646464" selectedColor="#5677FC"></tui-tabbar>
	</view>
</template>

<script>
import tRtPopup from '@/components/views/t-rt-popup/t-rt-popup';
export default {
	components: {
		tRtPopup
	},
	data() {
		return {
			current: 0,
			tabBar: [
				{
					pagePath: '/pages/tabbar/index/index',
					text: '我的相册',
					iconPath: '/static/images/tabbar/picture_gray.png',
					selectedIconPath: '/static/images/tabbar/picture_active.png',
					// num: 1,
					// isDot: false
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
			folderList: [],
			// 	{
			// 		img: '/static/images/tabbar/default_img.png',
			// 		title: '我的相册一',
			// 		sales: 100000
			// 	},
			// ],
			// 管理相册
			isManage:false , // 是否启用管理相册按钮
			// 点击右上角的管理提示
			clickManageTips: [{
				title: '点此编辑',
				icon: 'setup'
			}],
			showDelete:false , // 提示删除
			currentFolder:{}, // 当前选中的相册文件夹
		};
	},
	onNavigationBarButtonTap(e) {
		if(e.name == 'manage_folders'){
			// 管理 相册
			this.isManage = !this.isManage;
			// this.$refs.rtBubble.toggle();
		}
	},
	onShow() {
		this.isManage = false
		this.getList()
	},
	mounted() {
		this.$refs.rtBubble.toggle();
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
		// 获取我的相册列表
		getList(){
			this.$api.photo.get_photo_list().then(res => {
				 console.log('我的相册列表',res);
					if(res.code == 200){
						this.folderList = res.data
					}
				})
				.catch(e => {
					console.log('出错啦', e);
					this.tui.toast('出错啦')
				});
		},
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
			this.folder_name="";
			this.currentFolder={};
			this.folderModal = false;
		},
		handleCreateddFolder() {
			if (this.folder_name) {
				// this.tui.toast('操作相册：' + this.folder_name);
				if(this.currentFolder.id){
					this.$api.photo.edit_photos(this.currentFolder.id,{name:this.folder_name}).then(res => {
					 console.log('res',res);
						if(res.code == 200){
							this.getList()
						}
					})
					.catch(e => {
						console.log('出错啦', e);
						this.tui.toast('出错啦')
					});
				}else{
					this.$api.photo.create_photos({name:this.folder_name}).then(res => {
					 console.log('res',res);
						if(res.code == 200){
							this.getList()
						}
					})
					.catch(e => {
						console.log('出错啦', e);
						this.tui.toast('出错啦')
					});
				}
				
			}
			
			this.hideFolder();
		},
		
		// 打开相册
		openFolder(info) {
			console.log('openFolder')
			uni.navigateTo({
			    url: 'detail?id='+info.id+"&name="+info.name
			});
		},
		deleteFolder(info){
			this.currentFolder = info
			this.showDelete = true
		},
		renameFolder(info){
			console.log('info',info)
			this.currentFolder = info
			this.folder_name=info.name;
			this.folderModal = true
		},
		hideDelete() {
			this.showDelete = false;
		},
		handleClickDelete(){
			this.hideDelete()
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
	/* 上传图标 */
	.tui-btn-addfolder {
		width: 88rpx;
		height: 88rpx;
		font-size: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #5677FC;
		color: #fff;
		position: fixed;
		bottom: 160rpx;
		right: 30rpx;
		z-index: 9999;
	}
	/* 管理相册 */
	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
