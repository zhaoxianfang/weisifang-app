<template>
    <view class="container">
        <view class="tui-top">
            <tui-list-cell :hover="false" :unlined="true">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">消息通知</view>
                    <wsf-switch @change="openPushChange" :checked="notifyPushStatus" :disabled="notifyPushStatus"
                        color="#19be6b" class="tui-scale-small"></wsf-switch>
                </view>
            </tui-list-cell>
        </view>
        <view class="tui-top">
            <tui-list-cell :hover="false">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">获取手机定位</view>
                    <wsf-switch @change="openLocationChange" :checked="locationStatus" :disabled="locationStatus"
                        color="#19be6b" class="tui-scale-small"></wsf-switch>
                </view>
            </tui-list-cell>
        </view>
        <view class="tui-top">
            <tui-list-cell :hover="false" :arrow="true" @click="toSetting">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">其他应用权限</view>
                    <view class="tui-right">去设置</view>
                </view>
            </tui-list-cell>
        </view>
    </view>
</template>

<script>
    const notify = uni.requireNativePlugin('Ba-Notify')
    export default {
        data() {
            return {
                notifyPushStatus: false, // 系统消息通知（推送权限）
                locationStatus: false, // 获取定位
            };
        },
        created() {

        },
        onShow() {
            this.init();
        },
        methods: {
            init() {
                this.isNotifyEnabled();
                this.openLocationChange(false)
                this.helper.permissions.openSetting('android.settings.ACCESS_FINE_LOCATION') //
            },
            // 开启消息通知
            openPushChange: function(e) {
                if (!this.notifyPushStatus) {
                    this.goSetNotify();
                }
            },
            // 判断是否开启消息推送
            isNotifyEnabled() { //是否打开通知权限
                notify.isNotifyEnabled((res) => {
                    console.log(res)
                    this.notifyPushStatus = res.isNotifyEnabled ? true : false
                    // uni.showToast({
                    // 	title: 'isNotifyEnabled：' + res.isNotifyEnabled ? true : false,
                    // 	icon: "none"
                    // })
                });
            },
            goSetNotify() { //跳转到通知设置界面
                notify.goSetNotify();
            },
            // 开启定位
            async openLocationChange(e) {
                let location = await this.helper.utils.getLocation()
                // console.log('位置',location,e)
                this.locationStatus = location === false ? false : true
                if (e !== false) {
                    console.log('进来', e)
                    let res = this.helper.permissions.openSetting('android.permission.ACCESS_FINE_LOCATION')
                    if (res === false) {
                        this.locationStatus = false
                    } else {
                        // setTimeout(function(){
                        //   this.openLocationChange(false)
                        // }, 3000 )
                    }
                }
            },
            toSetting() {
                this.helper.permissions.openSetting('android.settings.APPLICATION_DETAILS_SETTINGS') // app 设置页面
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


    .tui-right {
        margin-left: auto;
        margin-right: 34rpx;
        font-size: 26rpx;
        color: #999;
    }
</style>
