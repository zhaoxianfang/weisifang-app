<template>
	<view>
		<!--header-->
		<tui-navigation-bar dropDownHide splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="我的" backgroundColor="#fff" color="#333">
			<view class="tui-header-box" :style="{ marginTop: top + 'px' }">
				<!--个人中心页为主页面，不应有返回键-->
				<!-- #ifndef MP -->
				<view class="tui-header-icon">
					<view class="tui-icon-box tui-icon-message" @tap="href(7)">
						<tui-icon name="message" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon>
						<view class="tui-badge" :class="[opacity > 0.8 ? 'tui-badge-red' : 'tui-badge-white']">1</view>
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="href(2)"><tui-icon name="setup" :color="opacity > 0.8 ? '#333' : '#fff'" :size="26"></tui-icon></view>
				</view>
				<!-- #endif -->
			</view>
		</tui-navigation-bar>
		<!--header-->
		<view class="tui-mybg-box">
			<image :src="webURL + '/static/images/mall/my/img_bg_3x.png'" class="tui-my-bg" mode="widthFix"></image>
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
					<view class="tui-icon-box tui-icon-message" @tap="href(7)">
						<tui-icon name="message" color="#fff" :size="26"></tui-icon>
						<view class="tui-badge tui-badge-white">1</view>
					</view>
					<view class="tui-icon-box tui-icon-setup" @tap="href(2)"><tui-icon name="setup" color="#fff" :size="26"></tui-icon></view>
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
			<view class="tui-box tui-order-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifukuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">1</view>
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifahuo_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">1</view>
						</view>
						<view class="tui-order-text">待发货</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_daishouhuo_3x.png" class="tui-order-icon"></image></view>
						<view class="tui-order-text">待收货</view>
					</view>
					<view class="tui-order-item" @tap="href(4)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_pingjia_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="false">12</view>
						</view>
						<view class="tui-order-text">评价</view>
					</view>
					<view class="tui-order-item" @tap="href(10)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">2</view>
						</view>
						<view class="tui-order-text">退款/售后</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-assets-box">
				<tui-list-cell padding="0" unlined :hover="false">
					<view class="tui-cell-header"><view class="tui-cell-title">我的资产</view></view>
				</tui-list-cell>
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item" @tap="href(8)">
						<view class="tui-assets-num">
							<text>3</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">优惠券</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text>7</text>
							<view class="tui-badge-dot"></view>
						</view>
						<view class="tui-assets-text">积分</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num"><text>0</text></view>
						<view class="tui-assets-text">红包</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num"><text>1</text></view>
						<view class="tui-assets-text">礼品卡</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num"><text>20</text></view>
						<view class="tui-assets-text">津贴</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-tool-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">常用工具</view>
						<view class="tui-cell-sub">查看更多</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_gift_3x.png" class="tui-tool-icon"></image>
							<image src="/static/images/mall/my/icon_tab_3x.png" class="tui-badge-icon"></image>
						</view>
						<view class="tui-tool-text">免费领好礼</view>
					</view>
					<view class="tui-tool-item">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_purse_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">钱包</view>
					</view>
					<view class="tui-tool-item" @tap="href(6)">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_ticket_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">领券中心</view>
					</view>
					<view class="tui-tool-item">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_kefu_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">客服服务</view>
					</view>
					<view class="tui-tool-item">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_fanxian_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">每日返现</view>
					</view>
					<view class="tui-tool-item" @tap="href(9)">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_tuan_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的拼团</view>
					</view>
					<view class="tui-tool-item">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_zhihuan_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">闲置换钱</view>
					</view>
					<view class="tui-tool-item">
						<view class="tui-icon-box"><image src="/static/images/mall/my/icon_kaipiao_3x.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">开发票</view>
					</view>
				</view>
			</view>

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
			webURL: 'https://www.thorui.cn/wx',
			top: 0, //标题图标距离顶部距离
			opacity: 0,
			scrollTop: 0.5
		};
	},
	created() {
		console.log(this.user.userinfo)
	},
	methods: {
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

.tui-icon-setup {
	margin-left: 8rpx;
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

.tui-badge-dot {
	position: absolute;
	height: 12rpx;
	width: 12rpx;
	border-radius: 50%;
	right: -12rpx;
	top: 0;
	background: #f74d54;
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
	top: 120rpx;
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
	top: 280rpx;
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
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: relative;
	top: -72rpx;
	z-index: 10;
}

.tui-box {
	width: 100%;
	background: #fff;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
	border-radius: 10rpx;
	overflow: hidden;
}

.tui-order-box {
	height: 208rpx;
}

.tui-cell-header {
	width: 100%;
	height: 74rpx;
	padding: 0 26rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.tui-cell-title {
	font-size: 30rpx;
	line-height: 30rpx;
	font-weight: 600;
	color: #333;
}

.tui-cell-sub {
	font-size: 26rpx;
	font-weight: 400;
	color: #999;
	padding-right: 28rpx;
}

.tui-order-list {
	width: 100%;
	height: 134rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.tui-order-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tui-order-text,
.tui-tool-text {
	font-size: 26rpx;
	font-weight: 400;
	color: #666;
	padding-top: 4rpx;
}

.tui-tool-text {
	font-size: 24rpx;
}

.tui-order-icon {
	width: 56rpx;
	height: 56rpx;
	display: block;
}

.tui-assets-box {
	height: 178rpx;
	margin-top: 20rpx;
}

.tui-assets-list {
	height: 84rpx;
}

.tui-assets-num {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
	position: relative;
}

.tui-assets-text {
	font-size: 24rpx;
	font-weight: 400;
	color: #666;
	padding-top: 6rpx;
}

.tui-tool-box {
	margin-top: 20rpx;
}

.tui-flex-wrap {
	flex-wrap: wrap;
	height: auto;
	padding-bottom: 30rpx;
}

.tui-tool-item {
	width: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-top: 30rpx;
}

.tui-tool-icon {
	width: 64rpx;
	height: 64rpx;
	display: block;
}

.tui-badge-icon {
	width: 66rpx;
	height: 30rpx;
	position: absolute;
	right: 0;
	transform: translateX(88%);
	top: -15rpx;
}

</style>
