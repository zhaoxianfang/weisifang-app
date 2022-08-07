<template>
	<view class="container">
		<tui-grid>
			<block v-for="(item,index) in dataList" :key="index">
				<navigator :url="item.page" class="tui-cell tui-cell_access" v-show="item.page">
					<tui-grid-item :cell="gridColumn">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.label || item.name}}</text>
					</tui-grid-item>
				</navigator>
				<tui-grid-item :cell="gridColumn" @click="more" v-show="!item.page">
					<view class="tui-grid-icon">
						<tui-icon :name="item.name" :size="item.size" color="#999"></tui-icon>
					</view>
					<text class="tui-grid-label">{{item.label || item.name}}</text>
				</tui-grid-item>
			</block>
		</tui-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridColumn: 2,
				dataList: [{
					name: "strategy",
					label: "文档",
					color: "#8a5966",
					size: 30
				}, {
					name: "addressbook",
					label: "通讯录",
					color: "#8a5966",
					size: 30
				}, {
					name: "picture",
					label: "相册",
					color: "#8a5966",
					page: "/pagesA/picture/index/index",
					size: 30
				}, {
					name: "shop",
					label: "仓库管理",
					color: "#8a5966",
					page: "/pagesA/warehouse/index/index",
					size: 30
				}, {
					name: "tool",
					label: "音乐",
					color: "#8a5966",
					size: 30
				}, {
					name: "feedback",
					label: "笔记",
					color: "#8a5966",
					size: 30
				}, {
					name: "weather",
					label: "天气",
					color: "#8a5966",
					size: 30
				}, {
					name: "gps",
					label: "附近",
					color: "#8a5966",
					size: 30
				}, {
					name: "more-fill",
					label: "更多",
					color: "#999",
					size: 30
				}]
			}
		},
		methods: {
			jump_page: function(e){
				// (1)uni.navigateTo(OBJECT) 保留当前页面，跳转到应用内的某个页面
				// (2)uni.redirectTo(OBJECT) 关闭当前页面，跳转到应用内的某个页面
				// (3)uni.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面
				// (4)uni.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				// (5)uni.navigateBack(OBJECT) 关闭当前页面，返回上一页面或多级页面
				if(e.page){
					uni.redirectTo({
					    url: e.page
					});
				}else{
					this.more()
				}
				
			},
			more: function(e) {
				this.tui.toast("敬请期待~");
				
				// 第一步，引入插件
				const uniNotification = uni.requireNativePlugin('Ys-UniNotification')
				// 下面使用文件的地方，需要先使用这个方法将路径转换为本地路径
				var url="_www/static/images/tabbar/work_active.png";
				var sound_url="_www/static/media/notice.mp3";
				const filePath = plus.io.convertLocalFileSystemURL(url)
				const sound = plus.io.convertLocalFileSystemURL(sound_url)
				
				// let res = uniNotification.postNotification({
				//         title: '极速通知',
				//         // text: '前台通知，不可手动取消，加大防杀死几率',
				//         isFrontService: true
				//     })
					
				let res = uniNotification.postNotification({
					title: '极速通知', // 通知标题
					text: '自定义图标', // 通知文本
					// notificationId: 2,// 可选，默认值为1，notification的id，这个id代表同一个notification，可以使用这个id对同一个通知进行更新，移除
					smallIcon: filePath,   // 可选，设置小图标，值为图片本地路径
					smallIconColor: [255, 100, 100, 100],
					largeIcon: filePath, // 可选，设置大图标，值为图片本地路径
					bigText: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜奔白发，朝如青丝暮成雪。', // 可选，设置大段文本内容
					bigPicture: filePath,// 可选，设置大图片，值为图片路径，可使用上面获取图片路径的代码获取
					// isShowWhen: false,// 可选，通知上面是否显示时间，默认是显示的，所以如果不想显示的话，只用设置为false即可
					// when: 1629435337521, // 可选，通知上面的时间，格式是时间戳，单位是毫秒
					// timeoutAfter: 5000,// 可选，通知自动消失的时间，单位是毫秒
					// 请注意:下面的5,全屏提示未适配
					// channelPriority: 4, //通知渠道的提示方式，默认是4,  1. 无声音，无弹出，text可折叠  2.text始终显示，不可折叠  3.有声音  4.有弹窗 5.做全屏提示的，如来电提醒就是这个
					// channelId: 'icon',
					// channelName: '自定义图标',
					// channelDesc: '自定义图标',
					isVibration: true, // 使用默认震动
					// 可选，在不支持渠道的系统上使用，默认为1, 可选值为-2到2,也是5个值，基本对应渠道的那5个值，具体可以自己测试
					// priority: 0,
					badgeNumber: 1, // 可选，app图标的角标数量
					// 自定义提示音，参数为音频文件路径
					sound: sound,
					vibrationPattern: [1000, 2000, 3000, 4000], // 自定义震动频率
					lightColorArr: [255, 255, 0, 0], // 呼吸灯
					 inboxArr: [ // 收件箱模式
						"吃饭了吗？",
						"打游戏去",
						"你在哪",
						"考的怎么样",
						"什么时候去",
						"在家吗",
						"任务完成了"
					],
				})
				
				// 桌面图标的角标
				
				// let res = uniNotification.postNotification({
				//         title: '极速通知',
				//         text: '桌面图标角标数字设置',
				//         badgeNumber: 1,
				//     })
				
				
				// let res = uniNotification.postNotification({
				//         title: '极速通知',
				//         text: '方便Android的通知',
				//         autoCancel: true,
				//         clickStr: '789' ///点击通知需要回调的字符串
				//     }, res => {
				//         // 这个回调跟上面的多媒体通知逻辑一样
				//         console.log('点击了通知的回调: ', res)
				//    })
				   
				if (res == 'success') {
					console.log('notification发送成功')
				} else {
					console.warn('notification发送失败，原因: ' + res)
				}
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}
	.tui-title {
		padding: 50rpx 30rpx 30rpx 30rpx;
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		font-weight: bold;
		clear: both;
	}
	
	.tui-grid-icon {
		width: 64rpx;
		height: 64rpx;
		margin: 0 auto;
		text-align: center;
		vertical-align: middle;
	}

	.tui-grid-label {
		display: block;
		text-align: center;
		font-weight: 400;
		color: #333;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10rpx;
	}
	.tui-grid-2,.tui-grid-3,.tui-grid-4,.tui-grid-5 {
		margin-top: 0 !important;
		color: #8a5966 !important;
	}
</style>
