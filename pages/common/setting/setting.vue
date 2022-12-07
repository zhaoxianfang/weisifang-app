<template>
    <view class="container">
        <view class="tui-top">
            <tui-list-cell :hover="false" :unlined="true">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">消息通知</view>
                    <wsf-switch @change="openPushChange" :checked="notifyPushStatus" :disabled="notifyPushStatus"
                        color="#19be6b" disabledColor="#19be6b" class="tui-scale-small"></wsf-switch>
                </view>
            </tui-list-cell>
            <tui-list-cell :hover="false" v-if="!systemLocationEnable" @click="openLocationAuth">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">打开手机定位开关</view>
                    <wsf-switch @change="toGetLocation" :checked="systemLocationEnable" :disabled="systemLocationEnable"
                        color="#19be6b" disabledColor="#19be6b" class="tui-scale-small"></wsf-switch>
                </view>
            </tui-list-cell>
            <tui-list-cell :hover="false">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">获取手机定位权限</view>
                    <wsf-switch @change="openLocationChange" :checked="locationStatus" :disabled="locationStatus"
                        color="#19be6b" disabledColor="#19be6b" class="tui-scale-small"></wsf-switch>
                </view>
            </tui-list-cell>

        </view>
        <view class="tui-top">
            <tui-list-cell :hover="false" :arrow="false" @click="changeIcon">
                <view class="tui-notice-item">
                    <view class="tui-list-item_title">切换图标</view>
                    <view class="tui-right">点击切换</view>
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
                notifyPushStatus: false, // 系统消息通知是否打开（推送权限）
                locationStatus: false, // 获取定位权限是否打开
                systemLocationEnable: false, // 是否打开手机定位开关
                baIconIndex: 0,
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
                this.isOpenLocation()
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
                    this.notifyPushStatus = res.isNotifyEnabled ? true : false
                });
            },
            isOpenLocation() {
                var _this = this
                // 手机定位服务是否打开
                this.ba.location.isLocationEnable(function(systemLocationEnable) {
                    _this.systemLocationEnable = systemLocationEnable || false
                })
                // 本应用是否获取定位权限
                this.ba.location.isLocationService(function(locationStatus) {
                    _this.locationStatus = locationStatus || false
                    // 订阅位置变化
                    locationStatus && _this.ba.location.subLocationStatus()
                    locationStatus && _this.ba.location.subGpsStatus()
                    locationStatus && _this.ba.location.subLocation()
                })
            },
            goSetNotify() { //跳转到通知设置界面
                notify.goSetNotify();
            },
            // 切换APP图标
            changeIcon() {
                this.ba.changeIcon.getCurrentSer((index) => {
                    this.baIconIndex = index

                    if (this.baIconIndex < 5) {
                        this.baIconIndex++
                    } else {
                        this.baIconIndex = 0
                    }
                    this.ba.changeIcon.change(this.baIconIndex)
                })

            },
            openLocationAuth() {
                this.ba.location.isLocationEnable()
            },
            // 开启手机定位开关
            toGetLocation(e) {
                this.ba.location.goSetting()
            },
            // 开启定位权限
            openLocationChange(e) {
                var _this = this
                this.ba.location.startL(function(flag) {
                    _this.locationStatus = flag || false
                })
            },
            // 打开 app 设置其他权限 页面
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
