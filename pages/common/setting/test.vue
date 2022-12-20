<template>
    <view class="container">

        <view class="tui-title">测试</view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-primary" @click="phoneCode">手机识别码</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-primary" @click="onScan">扫码</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-primary" @click="changeIcon">切换图标</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-primary" @click="getCurrentIcon">查看当前图标</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-primary" @click="ocr">ocr图片文字识别</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-green" @click="notify">Ba-Notify</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-green" @click="clearNotify">清空通知</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" @click="registerBroadcast">注册广播</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" @click="testBroadcast">测试广播</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" @click="setAppGray">全局置灰</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" @click="unsetAppGray">取消置灰</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" @click="getId">获取设备ID</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-danger" disabled="">-------</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-warning" @click="isRunning">是否正在运行</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-warning" @click="getWhiteList">获取当前设备白名单项</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-warning" @click="openWhiteList">打开白名单</tui-button>
        </view>
        <view class="tui-btn-box">
            <tui-button bold type="gray-warning" @click="whiteList">获取并打开白名单</tui-button>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                channelId: 'weisifang',
                channelName: "weisifang",
                title: "威四方",
                content: "",
                dataResult: "",
                type: undefined,
                baIconIndex: 0,
            };
        },
        methods: {
            detail: function() {
                console.log('click~');
                this.tui.toast('click~');
            },
            // 安卓手机唯一标识码 唯一码 唯一标识
            phoneCode() {

            },
            onScan() {
                // 连续扫码
                this.ba.scanner.scan({
                    isContinuous: true
                }, (res) => {
                    return false
                })
            },
            changeIcon() {
                if (this.baIconIndex < 5) {
                    this.baIconIndex++
                } else {
                    this.baIconIndex = 0
                }
                this.ba.changeIcon.change(this.baIconIndex)
            },
            getCurrentIcon() { //获取当前icon样式
                this.ba.changeIcon.getCurrentSer()
            },
            ocr() {
                this.tui.href('/pagesA/ocr/index');
            },
            notify() {
                this.ba.notify.send({
                    title: '新消息', // 设置通知中心的标题
                    content: '您有一条消息通知', // 设置通知中心中的内容
                });
            },
            // 清空通知
            clearNotify() { //清空某类型消息
                this.ba.notify.clear()
            },
            registerBroadcast() { // 注册广播
                this.ba.broadcast.register()
            },
            testBroadcast() {
                this.ba.broadcast.sendBroadcast()
            },
            setAppGray() {
                this.ba.gray.openGray()
            },
            unsetAppGray() {
                this.ba.gray.closeGray()
            },
            // 获取设备ID
            getId() {
                this.ba.idCode.getIdCodes(res => {
                    console.log('getIdCodes', res);
                    if (res.data) {
                        uni.showToast({
                            title: res.data.AndroidID,
                            icon: "none",
                            duration: 3000
                        })
                    }
                });
            },
            register() { //注册

            },
            isRunning() { //是否正在运行

            },
            restart() { //重启

            },
            unregister() { //注销

            },
            whiteList() { //获取并打开白名单

            },
            openWhiteList() { //打开白名单

            },
            getWhiteList() { //获取白名单项

            }
        }
    };
</script>

<style>
    .container {
        padding: 20rpx 30rpx 40rpx 30rpx;
        box-sizing: border-box;
    }

    .tui-title {
        padding: 30rpx 0;
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
    }

    .tui-btn-box {
        margin-bottom: 26rpx;
    }

    .tui-flex-box {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
</style>
