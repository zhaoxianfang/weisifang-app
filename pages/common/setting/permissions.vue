<template>
	<view class="container">
		<view class="tui-top">
			<tui-list-cell :hover="false" :unlined="true">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">推送通知</view>
					<wsf-switch @change="openPushChange" :checked="notifyPushStatus" :disabled="notifyPushStatus" color="#19be6b" class="tui-scale-small" ></wsf-switch>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-top">
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">获取手机定位</view>
					<wsf-switch @change="openLocationChange" :checked="locationStatus" :disabled="locationStatus" color="#19be6b" class="tui-scale-small" ></wsf-switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">发货通知</view>
					<switch :checked="false" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">收货通知</view>
					<switch :checked="true" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">支付成功通知</view>
					<switch :checked="true" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" :unlined="true">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">系统通知</view>
					<switch :checked="false" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-top">
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">我关注的</view>
					<switch :checked="false" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">我订阅的</view>
					<switch :checked="false" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" :unlined="true">
				<view class="tui-notice-item">
					<view class="tui-list-item_title">我喜欢的</view>
					<switch :checked="false" color="#19be6b" class="tui-scale-small"></switch>
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      notifyPushStatus:false, // 系统消息通知（推送权限）
      locationStatus:false, // 获取定位
    };
	},
  created() {
  	
  },
  onShow() {
    this.init();
  },
	methods: {
    init(){
      this.getPushAuah(false);
      // this.helper.permissions.requestPermission()
      // this.helper.permissions.openSetting('android.settings.APPLICATION_DETAILS_SETTINGS') // app 设置页面
      this.helper.permissions.openSetting('android.settings.ACCESS_FINE_LOCATION') //
    },
    // 判断是否开启消息推送
    getPushAuah(toOpen=true){
      this.notifyPushStatus = this.helper.permissions.judgeIosPermissionPush(toOpen) || false
    },
    // 开启消息通知
    openPushChange: function (e) {
      this.getPushAuah(true);
    },
    // 开启定位
    openLocationChange: function (e) {
      // this.getPushAuah(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 48rpx;
	.tui-top {
		margin-top: 20rpx;
	}
	.tui-notice-item {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: $uni-font-size-lg;
		.tui-list-item_title {
			display: flex;
			align-items: center;
		}
		.tui-scale-small {
			transform: scale(0.8);
			transform-origin: 100% center;
		}
	}
}
</style>
