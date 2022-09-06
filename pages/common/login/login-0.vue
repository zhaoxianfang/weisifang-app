<template>
	<view class="container">
		<view class="tui-bg-box">
			<image src="/static/images/login/bg_login.png" class="tui-bg-img"></image>
			<image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-photo"></image>
			<view class="tui-login-name">威四方</view>
		</view>
		<form :report-submit="true" @submit="formLogin">
			<view class="tui-login-from">
				<view class="tui-line-cell">
					<tui-icon name="mobile" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入手机号码"
						maxlength="11" v-model="mobile" type="number" />
				</view>
				<view class="tui-line-cell tui-top28">
					<tui-icon name="pwd" :size="20" color="#6d7a87"></tui-icon>
					<input placeholder-class="tui-phcolor" v-model="password" class="tui-input" name="password" placeholder="请输入密码"
						maxlength="60" />
					<!-- <tui-button width="182rpx" height="56rpx" :size="24" :type="type" shape="circle" :plain="true"
						:disabled="disabled" @click="btnSend">{{ btnText }}</tui-button> -->
				</view>
				<button class="tui-button-primary tui-btn-submit" hover-class="tui-button-hover"
					form-type="submit">登录</button>
				<view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">
					点击"登录"即表示已同意
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
				</view>
			</view>
		</form>
		
		<!-- #ifdef APP-PLUS -->
		<view class="tui-applets__vip" @tap="showLogin">
			<tui-icon name="shield" color="#07c160" :size="44" unit="rpx"></tui-icon>
			<text>其他方式登录</text>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef APP-PLUS -->
		<!--底部分享弹窗-->
		<tui-bottom-popup backgroundColor="#f6f6f6"  :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="showLogin">
			<view class="tui-share">
				<view class="tui-share-title">第三方登录</view>
				<scroll-view scroll-x style="padding-right:20rpx" class="tui-mt">
					<view class="tui-share-top">
						<view class="tui-share-item" :class="[otherLoginType.length-1===index?'tui-item-last':'']" v-for="(item,index) in otherLoginType"
						 :key="index" @tap="chooseLoginType(item)">
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<tui-icon :name="item.icon" :color="item.color" :size="item.size?item.size:36"></tui-icon>
							</view>
							<view class="tui-share-text">{{item.name}}</view>
						</view>
						<view class="tui-empty">!</view>
					</view>
		
				</scroll-view>
		
				<view class="tui-btn-cancle" @tap="showLogin">取消</view>
			</view>
		</tui-bottom-popup>
		<!--底部分享弹窗-->
		<!-- #endif -->
		
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import util from '@/utils/util.js'
	import form from '@/components/common/tui-validation/tui-validation.js'
	export default {
		data() {
			return {
				disabled: false,
				btnText: '获取验证码',
				mobile: '',
				password:"",
				type: 'primary',
				code: '',
				
				popupShow: false,
				otherLoginType: [{
					name: "QQ",
					value:'qq',
					icon: "qq",
					color: "#07BDFD",
					size: 34
				}, {
					name: "微信",
					value:'wechat',
					icon: "wechat",
					color: "#80D640"
				}, {
					name: "支付宝",
					value:'alipay',
					icon: "alipay",
					color: "#00AAEE"
				}, {
					name: "新浪微博",
					value:'sina',
					icon: "sina",
					color: "#F9C718"
				}, {
					name: "钉钉",
					value:'dingtalk',
					icon: "dingtalk",
					color: "#2DA0F1"
				}]
			};
		},
		methods: {
			// ...mapMutations(['login']),
			getRandom: function(u) {
				let rnd = '';
				u = u || 6;
				for (var i = 0; i < u; i++) {
					rnd += Math.floor(Math.random() * 10);
				}
				return rnd;
			},
			doLoop: function(seconds) {
				let code = this.getRandom(6);
				this.tui.toast('您本次的验证码是：' + code, 5000);
				seconds = seconds ? seconds : 60;
				this.btnText = seconds + 's后获取';
				this.code = code;
				let countdown = setInterval(() => {
					if (seconds > 0) {
						this.btnText = seconds + 's后获取';
						--seconds;
					} else {
						this.btnText = '获取验证码';
						this.disabled = false;
						this.type = 'primary';
						clearInterval(countdown);
					}
				}, 1000);
			},
			btnSend: function() {
				let rules = [{
					name: 'mobile',
					rule: ['required', 'isMobile'],
					msg: ['请输入手机号码', '请输入正确的手机号码']
				}];
				//进行表单检查
				let formData = {
					mobile: this.mobile
				};
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					this.disabled = true;
					this.btnText = '请稍候...';
					this.type = 'gray';

					setTimeout(() => {
						this.doLoop(60);
					}, 500);
				} else {
					this.tui.toast(checkRes);
				}
			},
			formLogin: function(e) {
				let password = e.detail.value.password;
				let mobile = e.detail.value.mobile;
				let rules = [{
						name: 'mobile',
						rule: ['required', 'isMobile'],
						msg: ['请输入手机号码', '请输入正确的手机号码']
					},{
						name: 'password',
						rule: ['required'],
						msg: ['请输入密码']
					}
					// {
					// 	name: 'loginCode',
					// 	rule: ['required', 'isSame:code'],
					// 	msg: ['请输入验证码', '验证码不正确']
					// }
				];
				//进行表单检查
				let formData = {
					mobile: mobile,
					password:password
					// loginCode: loginCode,
					// code: this.code
				};
				console.log('登录--',mobile,password)
				let checkRes = form.validation(formData, rules);
				if (checkRes) {
					this.tui.toast(checkRes);
					return;
				}
				// let format = util.formatNumber(mobile);
				// uni.setStorageSync('thorui_mobile', format);
				let state = {
					mobile: mobile,
					password:password
				};
				this.$store.dispatch('login',state).then(() => {
            // this.$router.push({ path: this.redirect || '/' })
            // this.loading = false
						this.tui.toast('登录成功', 2000, true);
						// 关闭所有页面，跳转到首页
						uni.reLaunch({
							url: '/pages/tabbar/index/index'
						});
          }).catch((err) => {
						this.tui.toast(err.message);
            // this.loading = false
          })
				// this.login(state);
				
				// setTimeout(() => {
				// 	uni.reLaunch({
				// 		url: '/pages/tabbar/index/index'
				// 	});
				// }, 200);
			},
			protocol: function() {
				uni.navigateTo({
					url: '/pages/doc/protocol/protocol'
				});
			},
			showLogin(){
				this.popupShow = !this.popupShow
			},
			chooseLoginType(item){
				var that = this;
				if(item.value === 'qq'){
					uni.login({
					  provider: 'qq',
					  success: function (loginRes) {
					    console.log('qq 登录 success',loginRes,loginRes.authResult);
							
							that.$store.dispatch('qq_login',loginRes.authResult).then(() => {
							    // this.$router.push({ path: this.redirect || '/' })
							    // this.loading = false
									that.tui.toast('登录成功', 2000, true);
									// 关闭所有页面，跳转到首页
									uni.reLaunch({
										url: '/pages/tabbar/index/index'
									});
							  }).catch((err) => {
									that.tui.toast(err.message);
							    // this.loading = false
							  })
								
							// that.$api.user.qq_login(loginRes.authResult).then(res => {
							// 	console.log('api返回',res)
							// })
							// .catch(e => {
							// 	console.log('出错啦', e);
							// 	that.tui.toast('登录失败')
							// });
					  }
					});
				}else{
					this.tui.toast('暂未开通该登录方式')
				}
			}
		}
	};
</script>

<style>
	page {
		background-color: #fff;
	}

	.tui-bg-box {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		padding-top: 44rpx;
	}

	.tui-photo {
		height: 138rpx;
		width: 138rpx;
		display: block;
		margin: 10rpx auto 0 auto;
		border-radius: 50%;
		position: relative;
		z-index: 2;
	}

	.tui-login-name {
		width: 128rpx;
		height: 40rpx;
		font-size: 30rpx;
		color: #fff;
		margin: 36rpx auto 0 auto;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.tui-bg-img {
		width: 100%;
		height: 346rpx;
		display: block;
		position: absolute;
		top: 0;
	}

	.tui-login-from {
		width: 100%;
		padding: 128rpx 104rpx 0 104rpx;
		box-sizing: border-box;
	}

	.tui-input {
		font-size: 32rpx;
		flex: 1;
		display: inline-block;
		padding-left: 32rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell {
		padding: 27rpx 0;
		display: -webkit-flex;
		display: flex;
		-webkiit-align-items: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #e0e0e0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-top28 {
		margin-top: 28rpx;
	}

	.tui-btn-class {
		width: 196rpx !important;
		height: 54rpx !important;
		border-radius: 27rpx !important;
		font-size: 28rpx !important;
		padding: 0 !important;
		line-height: 54rpx !important;
	}

	.tui-btn-submit {
		margin-top: 100rpx;
	}

	.tui-protocol {
		color: #333;
		font-size: 24rpx;
		text-align: center;
		width: 100%;
		margin-top: 29rpx;
	}

	.tui-protocol-red {
		color: #f54f46;
	}
	.tui-applets__vip{
		width: 100%;
		position: fixed;
		bottom: 20px;
		/* #ifdef H5 */
		bottom: 70px;
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		z-index: 10;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #586c94;
	}
	.tui-applets__vip text{
		padding-left: 10rpx;
	}
	
	/* #ifdef APP-PLUS */
	/* 底部弹出层 开始 */
	.tui-share {
		background: #e8e8e8;
		position: relative;
	}
	
	.tui-share-title {
		font-size: 26rpx;
		color: #7E7E7E;
		text-align: center;
		line-height: 26rpx;
		padding: 20rpx 0 50rpx 0;
	}
	
	.tui-share-top,
	.tui-share-bottom {
		min-width: 101%;
		padding: 0 20rpx 0 30rpx;
		white-space: nowrap;
	}
	
	.tui-mt {
		margin-top: 30rpx;
		padding-bottom: 150rpx;
	}
	
	.tui-share-item {
		width: 126rpx;
		display: inline-block;
		margin-right: 24rpx;
		text-align: center;
	}
	
	.tui-item-last {
		margin: 0;
	}
	
	.tui-empty {
		display: inline-block;
		width: 30rpx;
		visibility: hidden;
	}
	
	.tui-share-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		height: 126rpx;
		width: 126rpx;
		border-radius: 32rpx;
	}
	
	.tui-share-text {
		font-size: 24rpx;
		color: #7E7E7E;
		line-height: 24rpx;
		padding: 20rpx 0;
		white-space: nowrap;
	}
	
	.tui-btn-cancle {
		width: 100%;
		height: 100rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #f6f6f6;
		font-size: 36rpx;
		color: #3e3e3e;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-hover {
		background: rgba(0, 0, 0, 0.2)
	}
		/* 底部弹出层 结束 */
		/* #endif */
</style>