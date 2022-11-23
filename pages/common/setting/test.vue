<template>
	<view class="container">
		
		<view class="tui-title">扩展色</view>
		<view class="tui-btn-box"><tui-button bold type="gray-primary" @click="phoneCode">手机识别码</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-primary" @click="onScan">扫码</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-primary" @click="showToast">showToast</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-primary" @click="ocr">ocr图片文字识别</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-green" @click="notify">Ba-Notify</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-danger" @click="unregister">注销</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="isRunning">是否正在运行</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="getWhiteList">获取当前设备白名单项</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="openWhiteList">打开白名单</tui-button></view>
		<view class="tui-btn-box"><tui-button bold type="gray-warning" @click="whiteList">获取并打开白名单</tui-button></view>

	</view>
</template> 

<script>
const Phone_Identification_code = uni.requireNativePlugin('Phone-Identification-code');
const scanner = uni.requireNativePlugin('Ba-Scanner')
const toast = uni.requireNativePlugin('Ba-Toast')
const notify = uni.requireNativePlugin('Ba-Notify')

export default {
	data() {
		return {
		  channelId: 'weisifang',
		  channelName: "weisifang",
		  title: "威四方",
		  content: "",
		  dataResult: "",
		  type: undefined,
		};
	},
	methods: {
		detail: function() {
			console.log('click~');
			this.tui.toast('click~');
		},
		// 安卓手机唯一标识码 唯一码 唯一标识
		phoneCode(){
			Phone_Identification_code.send(
				{},e => {
					// 回调函数
					uni.showToast({
						title: '响应数据：' + JSON.stringify(e),
						icon: 'none'
					});
				}
			);
		},
		onScan(){
			// 默认
			scanner.onScan({
				 //barcodeFormats: ["QR Code"],// 设置扫码格式，支持多个，默认所有。如：["QR Code", "Code 128"]
				isShowVibrate: true, // 扫描完成震动
				isShowBeep: true, // 扫描完成声音
				isShowPhotoAlbum: true, // 是否显示相册
				isShowLightController:true, //是否显示闪光灯开关
				zoom:true, // 是否支持手势缩放
				scanColor:'#00FF00', //扫描线的颜色
				hintText: '扫二维码/条形码', //提示文案
				hintTextColor:'#00FF00', //提示文案颜色
				hintTextSize:14, //提示文案字体大小
				scanGrid:false , // 扫描线是否为网格线
				isContinuous:true, //是否开启连续扫描
				scanTimeSpace: 2000, // 连续扫描时间间隔，单位毫秒，默认 1000
				isShowToast:true, //扫码成功是否 toast 提示，默认 true
				
			},
			(ret) => {
				console.log(ret)
				if (ret.result) {
					// this.showToast(ret.result)
				}
			});
		},
		showToast(){
			toast.showToast({
				title: "toast",//提示内容
				icon: "none",//图标
				duration: 0,//显示时间
				textColor: '',//字体颜色
				bgColor: '',//背景颜色
				iconColor: '',//图标颜色
				textSize: 0,//字体大小
				position: 'center',//显示位置 （top、center、bottom、left、right、left_top、left_bottom、right_top、right_bottom）
				xOffset: 0,//位置在 x轴 偏移量
				yOffset: 0,//位置在 y轴 偏移量
			});
		},
		ocr(){
			this.tui.href('/pagesA/ocr/index');
		},
		notify(){
			let content = 'content';
			let leftText = "左按钮";
			let rightText = "右按钮";
			let thumbUrl = plus.io.convertLocalFileSystemURL("_www/static/images/tabbar/work_active.png");
			let bigUrl = plus.io.convertLocalFileSystemURL("_www/static/images/tabbar/work_active.png");
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
			let progress = 10;
			notify.show({
					'channelID': '6',
					'channelName': '进度通知',
					'ID': 6,
					'notifyType': 6,
					'ticker': 'Ticker',
					'title': '进度通知',
					'content': content,
					'maxProgress': 100,
					'progress': progress, //当前进度
					'indeterminate': false, //是否模糊进度显示 true:跑马灯式
					'finishText': "下载完成",
					'ongoing':true , // 通知持续显示，侧滑不能删除，默认 false
					'autoCancel':false, // 点击通知，自动消失，默认 true
					"extend":"附加参数"
				},
				(res) => {
					console.log(res)
					progress=progress+10
				});
		},
		clear() { //清空某类型消息
			notify.clear({
				'channelID': '0',
				'channelName': 'channel_0',
				'ID': 1,
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
