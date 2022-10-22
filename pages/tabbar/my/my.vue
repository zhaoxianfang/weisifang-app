<template>
	<view>
		<!--header-->
		<tui-navigation-bar dropDownHide splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="我的" backgroundColor="#fff" color="#333">
			<view class="tui-header-box" :style="{ marginTop: top + 'px' }">
				<!--个人中心页为主页面，不应有返回键-->
				<!-- #ifndef MP -->
				<view class="tui-header-icon">
          <view class="tui-icon-box tui-icon-tools" @tap="scanCode"><tui-icon name="sweep" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon></view>
					<view class="tui-icon-box tui-icon-tools" @tap="href(7)">
						<tui-icon name="message" :color="opacity > 0.8 ? '#333' : '#fff'" :size="28"></tui-icon>
						<view class="tui-badge" :class="[opacity > 0.8 ? 'tui-badge-red' : 'tui-badge-white']">1</view>
					</view>
					<view class="tui-icon-box tui-icon-tools" @tap="href(2)"><tui-icon name="setup" :color="opacity > 0.8 ? '#333' : '#fff'" :size="28"></tui-icon></view>
				</view>
				<!-- #endif -->
			</view>
		</tui-navigation-bar>
		<!--header-->
		<view class="tui-mybg-box">
			<image src="/static/images/my/mine_bg_3x.png" class="tui-my-bg" mode="widthFix"></image>
			<view class="tui-header-center">
				<image :src="user.userinfo.cover" class="tui-avatar" @tap="href(3)"></image>
				<view class="tui-info">
					<view class="tui-nickname">
						{{user.userinfo.nickname || '请登录'}}
						<image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view class="tui-explain">这家伙很懒…</view>
				</view>
				<!-- #ifndef MP -->
				<view class="tui-btn-edit"><tui-button type="white" :plain="true" shape="circle" width="92rpx" height="40rpx" :size="22" @click="logout">退出</tui-button></view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="tui-set-box">
          <view class="tui-icon-box tui-icon-tools" @tap="scanCode"><tui-icon name="sweep" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon></view>
					<view class="tui-icon-box tui-icon-tools" @tap="href(7)">
						<tui-icon name="message" color="#fff" :size="28"></tui-icon>
						<view class="tui-badge tui-badge-white">1</view>
					</view>
					<view class="tui-icon-box tui-icon-tools" @tap="href(2)"><tui-icon name="setup" color="#fff" :size="28"></tui-icon></view>
				</view>
				<!-- #endif -->
			</view>
			<view class="tui-header-btm" @tap="href(5)">
				<view class="tui-btm-item">
					<view class="tui-btm-num">25</view>
					<view class="tui-btm-text">收藏夹</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">22</view>
					<view class="tui-btm-text">店铺关注</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">3</view>
					<view class="tui-btm-text">喜欢的内容</view>
				</view>
				<view class="tui-btm-item">
					<view class="tui-btm-num">44</view>
					<view class="tui-btm-text">足迹</view>
				</view>
			</view>
		</view>

		<view class="tui-content-box">
			<tui-list-view title="">
				<tui-list-cell @click="detail" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="wealth-fill" :size="24" color="#ff7900"></tui-icon>
						<text class="tui-list-cell_name">我的钱包</text>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="detail" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="service-fill" :size="24" color="#5677fc"></tui-icon>
						<view class="tui-list-cell_name">服务窗</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="detail" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="explore-fill" :size="24" color="#19be6b"></tui-icon>
						<view class="tui-list-cell_name">发现</view>
						<view class="tui-ml-auto">
							<tui-tag padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green" shape="circle">探索发现</tui-tag>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="detail" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="shop-fill" :size="23" color="#ed3f14"></tui-icon>
						<view class="tui-list-cell_name">我的店铺</view>
						<view class="tui-right">进入店铺</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="detail" :arrow="true" last="true">
					<view class="tui-item-box">
						<image src="/static/images/my/thorui.png" class="tui-logo" mode="widthFix"></image>
						<text class="tui-list-cell_name">关于</text>
						<view class="tui-right">Thor UI</view>
					</view>
				</tui-list-cell>
			</tui-list-view>

			<!--为你推荐-->
			<tui-divider :size="28" :bold="true" color="#333" width="50%">为你推荐</tui-divider>
			
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	onLoad: function(options) {
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-ALIPAY
		my.hideAddToDesktopMenu();
		// #endif

		uni.getSystemInfo({
			success: res => {
				this.width = obj.left || res.windowWidth;
				this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
				this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
				this.scrollH = res.windowWidth * 0.6;
			}
		});
	},
	data() {
		return {
			webURL: '',
			top: 0, //标题图标距离顶部距离
			opacity: 0,
			scrollTop: 0.5
		};
	},
	created() {
		console.log(this.user.userinfo)
	},
	methods: {
    scanCode(e){
      this.helper.navBtns.handle({'uni_code':'scan'})
    },
		href(page) {
			let url = '';
			switch (page) {
				case 2:
					url = '../set/set';
					break;
				case 3:
					url = '../userInfo/userInfo';
					break;
				case 4:
					url = '../myOrder/myOrder';
					break;
				case 6:
					url = '../coupon/coupon';
					break;
				case 7:
					url = '../message/message';
					break;
				case 8:
					url = '../myCoupon/myCoupon';
					break;
				case 9:
					url = '../myGroup/myGroup';
					break;
				case 10:
					url = '../refundList/refundList';
					break;
				default:
					break;
			}
			if (url) {
				this.tui.href(url);
			} else {
				this.tui.toast('功能尚未完善~');
			}
		},
		logout(){
			this.$store.dispatch('logout',true);//.then(() => {
			    // this.$router.push({ path: this.redirect || '/' })
			    // this.loading = false
					this.tui.toast('退出成功', 2000);
					// 关闭所有页面，跳转到登录页面。
					uni.reLaunch({
						url: '/pages/common/login/login'
					});
			  // }).catch((err) => {
					// this.tui.toast(err.message);
			  //   // this.loading = false
			  // })
		},
		detail: function() {
			uni.navigateTo({
				url: '../productDetail/productDetail'
			});
		},
		initNavigation(e) {
			this.opacity = e.opacity;
			this.top = e.top;
		},
		opacityChange(e) {
			this.opacity = e.opacity;
		},
		back() {
			uni.navigateBack();
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onPullDownRefresh() {
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 200);
	},
	onReachBottom: function() {
		if (!this.pullUpOn) return;
	}
};
</script>

<style>
.tui-header-box {
	width: 100%;
	padding: 0 30rpx 0 20rpx;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 32px;
	transform: translateZ(0);
	z-index: 9999;
}

/* #ifndef MP */
.tui-header-icon {
	min-width: 120rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/* #endif */
/* #ifdef MP */
.tui-set-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/* #endif */
.tui-icon-box {
	position: relative;
}

.tui-icon-tools {
	margin-left: 18rpx;
}

.tui-badge {
	position: absolute;
	font-size: 24rpx;
	height: 32rpx;
	min-width: 20rpx;
	padding: 0 6rpx;
	border-radius: 40rpx;
	right: 10rpx;
	top: -5rpx;
	transform: scale(0.8) translateX(60%);
	transform-origin: center center;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
}

.tui-badge-red {
	background: #f74d54;
	color: #fff;
}

.tui-badge-white {
	background: #fff;
	color: #f74d54;
}

.tui-mybg-box {
	width: 100%;
	height: 464rpx;
	position: relative;
}

.tui-my-bg {
	width: 100%;
	height: 464rpx;
	display: block;
}

.tui-header-center {
	position: absolute;
	width: 100%;
	height: 128rpx;
	left: 0;
	top: 150rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tui-avatar {
	flex-shrink: 0;
	width: 128rpx;
	height: 128rpx;
	display: block;
	border-radius: 50%;
}

.tui-info {
	width: 60%;
	padding-left: 30rpx;
}

.tui-nickname {
	font-size: 30rpx;
	font-weight: 500;
	color: #fff;
	display: flex;
	align-items: center;
}

.tui-img-vip {
	width: 56rpx;
	height: 24rpx;
	margin-left: 18rpx;
}

.tui-explain {
	width: 80%;
	font-size: 24rpx;
	font-weight: 400;
	color: #fff;
	opacity: 0.75;
	padding-top: 8rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tui-btn-edit {
	flex-shrink: 0;
	padding-right: 22rpx;
}

.tui-header-btm {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 340rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #fff;
}

.tui-btm-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.tui-btm-num {
	font-size: 32rpx;
	font-weight: 600;
	position: relative;
}

.tui-btm-text {
	font-size: 24rpx;
	opacity: 0.85;
	padding-top: 4rpx;
}

.tui-content-box {
	/* width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: relative;
	top: -72rpx;
	z-index: 10; */
}

/* ====================== */
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
  .tui-list-cell_name {
  	padding-left: 20rpx;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  }
  
  .tui-ml-auto {
  	margin-left: auto;
  }
  
  .tui-right {
  	margin-left: auto;
  	margin-right: 34rpx;
  	font-size: 26rpx;
  	color: #999;
  }
  
  .tui-logo {
  	height: 52rpx;
  	width: 52rpx;
  	flex-shrink: 0;
  }
  

</style>
