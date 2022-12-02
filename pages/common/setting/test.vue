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
            <tui-button bold type="gray-danger" @click="unregister">注销</tui-button>
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
    const Phone_Identification_code = uni.requireNativePlugin('Phone-Identification-code');
    import baChangeIcon from '@/js_sdk/weisifang/baChangeIcon.js'
    import baScanner from '@/js_sdk/weisifang/baScanner.js'

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
                Phone_Identification_code.send({}, e => {
                    // 回调函数
                    uni.showToast({
                        title: '响应数据：' + JSON.stringify(e),
                        icon: 'none'
                    });
                });
            },
            onScan() {
                // 连续扫码
                baScanner.scan({
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
                baChangeIcon.change(this.baIconIndex)
            },
            getCurrentIcon() { //获取当前icon样式
                baChangeIcon.getCurrentSer()
            },
            ocr() {
                this.tui.href('/pagesA/ocr/index');
            },
            notify() {
                this.baNotify.send({
                    title: '新消息', // 设置通知中心的标题
                    content: '您有一条消息通知', // 设置通知中心中的内容
                });
                // let content = 'content';
                // let leftText = "左按钮";
                // let rightText = "右按钮";
                // let thumbUrl = plus.io.convertLocalFileSystemURL("_www/static/images/tabbar/work_active.png");
                // let bigUrl = plus.io.convertLocalFileSystemURL("_www/static/images/tabbar/work_active.png");
                // 大图通知
                // notify.show({
                // 	'channelID': '1',
                // 	'channelName': '大图通知',
                // 	'ID': 1,
                // 	'notifyType': 1, // 1 大图通知
                // 	'ticker': 'Ticker',
                // 	'title': '大图通知',
                //  "extend":"附加参数",
                // 	'content': content,
                // 	'thumbUrl': thumbUrl,
                // 	'bigUrl': bigUrl,
                // },
                // (res) => {
                // 	console.log(res)
                // });
                // 4 消息盒子
                // let msgList = ['消息1', '消息2', '消息3'];
                // notify.show({
                // 		'channelID': '4',
                // 		'channelName': '消息盒子',
                // 		'ID': 4,
                // 		'notifyType': 4,
                // 		'ticker': 'Ticker',
                // 		'title': 'mailbox',
                // 		'content': content,
                // 		'thumbUrl': thumbUrl,
                //      "extend":"附加参数",
                // 		'msgList': msgList
                // 	},
                // 	(res) => {
                // 		console.log(res)
                // 	});

                //进度通知
                // let progress = 10;
                // notify.show({
                // 		'channelID': '6',
                // 		'channelName': '进度通知',
                // 		'ID': 6,
                // 		'notifyType': 6,
                // 		'ticker': 'Ticker',
                // 		'title': '进度通知',
                // 		'content': content,
                // 		'maxProgress': 100,
                // 		'progress': progress, //当前进度
                // 		'indeterminate': false, //是否模糊进度显示 true:跑马灯式
                // 		'finishText': "下载完成",
                // 		'ongoing':true , // 通知持续显示，侧滑不能删除，默认 false
                // 		'autoCancel':false, // 点击通知，自动消失，默认 true
                // 		"extend":"附加参数"
                // 	},
                // 	(res) => {
                // 		console.log(res)
                // 		progress=progress+10
                // 	});

                // 多行通知
                // content = "《一代人》\n" +
                //     "\n" +
                //     "\n" +
                //     "黑夜给了我黑色的眼睛\n" +
                //     "我却用它寻找光明";
                // notify.show({
                //         'channelID': '5',
                //         'channelName': 'channel_5',
                //         // 'ID': 5,
                //         'notifyType': 5,
                //         'ticker': 'Ticker',
                //         'title': '多行通知',
                //         'content': content,
                //     },
                //     (res) => {
                //         console.log(res)
                //     });
            },
            // 清空通知
            clearNotify() { //清空某类型消息
                this.baNotify.clear()
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
