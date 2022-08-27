<template>
	<view class="u-page">
		<view class="date-box">
			<view class="box-list">
				<view class="date-top">
					<view class="icon left-icon" @click="LastYear">
						<view class="iconfont icon-jiantou_xiangzuoliangci"></view>
					</view>
					<view class="conter-text">
						<view class="icon left-icon" @click="LastMonth">
							<view class="iconfont icon-xiangzuo1"></view>
						</view>
						<text class="month">{{year}}年{{month}}月</text>
						<view class="icon rigth-icon" @click="NextMonth">
							<view class="iconfont icon-xiangyou1"></view>
						</view>
					</view>
					<view class="icon rigth-icon" @click="NextYear">
						<view class="iconfont icon-jiantou_xiangyouliangci"></view>
					</view>
				</view>
				<view class="date-week">
					<view class="week-item" v-for="item in weekList"><text>周{{item}}</text></view>
				</view>
				<view class="day-content">
					<view class="day-item day-month"><text>{{month < 10 ? `0${month}` : month}}</text></view>
					<view 
						class="day-item" 
						v-for="(item, index) in dayList"
						:key="`z-${item.day}-${index}`"
						@click="toActive(item, index)">
						<text class="day-text" :class="{ 'actives' : item.day === day }" >{{item.day ? item.day : ''}}</text>
						<text class="value-text" v-if="item.data.status">{{item.data.value}}</text>
						<text class="value-text text-red" v-else>{{item.data.value}}</text>
						<text class="day-dot dot-red" v-if="!isIcon && item.data.dot && item.data.active"></text>
						<text class="day-dot dot-gray" v-if="!isIcon && item.data.dot && !item.data.active"></text>
						<text class="iconfont red-icon" :class="[item.data.icon ? item.data.icon : 'icon-cuo']" v-if="isIcon && item.data.dot && item.data.active"></text>
						<text class="iconfont dot-gray-icon" :class="[item.data.icon ? item.data.icon : 'icon-dui']" v-if="isIcon && item.data.dot && !item.data.active"></text>
					</view>
				</view>
			</view>
			<slot name="task">
			<view class="task-box" v-if="list.length > 0">
				<view class="task-item" v-for="(item, index) in list" :key="index" @click="toTask(item, index)">
					<view class="avatar-box">
						<view class="avatar">
							 <image :src="item.avatar"></image>
						</view>
						<view class="title-box">
							<view class="title"><text>{{item.title}}</text></view>
							<view class="date"><text class="branch">时间：{{item.time}}</text><text>{{item.details}}</text></view>
						</view>
					</view>
					<view class="time"><text>{{item.date}}</text></view>
				</view>
			</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'zyfDate',
		props:{
			list:{
				type: Array,
				default: () => {
					return []
				}
			},
			weekList:{
				type:Array,
				default:() => ['日', '一', '二', '三', '四', '五', '六']
			},
			date:{
				type:Object,
				default:() => {
					return {
						year: new Date().getFullYear(),
						month: parseInt(new Date().getMonth() + 1),
						day: parseInt(new Date().getDate())
					}
				}
			},
			extraData: {
				type: Array,
				default: ()=> {
					return [{date: '2022-7-20', value: '签到', status: true, dot: true, icon: 'icon-dui', active: false},{date: '2022-7-19', value: '未签到', status: false, dot: true, icon: 'icon-cuo', active: true}]
				}
			},

			isIcon:{
				type: Boolean,
				default: false
			},
		},
		watch: {
		    extraData(val, oldval) {
		      
		    },
		},
    data() {
			return {
				dayList:[],
				year: 2022,
				month: 10,
				day: 10
			}
		},
		
		created() {
			const { year, month, day  } = this.date
			this.year = year
			this.month = month
			this.day = day
			this.initTime()
			this.initApi()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			uni.showToast({
				title: '分享',
				duration: 2000
			});
		},
		methods: {
			initTime(){
				const { year, month, day } = this.getTiemNowDate()
				this.year = year
				this.month = month
				this.day = day
				console.log('今日时间为：' + this.year + '-' + this.month + '-' +this.day )
			},
			
			getTiemNowDate(){
				var date 	= new Date()
				var year 	= date.getFullYear()
				var month = parseInt(date.getMonth() + 1)
				var day 	= date.getDate()
				if(month < 10){
					month = '0' + month
				}
				
				if(day < 10){
					day = '0' + day
				}
				
				const resultDate = {
					year:year,
					month: parseInt(month),
					day:parseInt(day)
				}
				
				return resultDate
			},
			
			initApi() {
				this.dayList = this.creatDayList(this.year, this.month)
			},
			
			creatDayList(year, month){
				const count = this.getDayNum(year, month)
				const week = new Date(year + '/' + month + '/1').getDay()
				let list = []
				for(let i = 1; i <= count; i++ ){
					let data = {};
					for(let item of this.extraData){
						let dateString = item.date;
						let dateArr = dateString.indexOf('-') !== -1 ? dateString.split('-') : dateString.indexOf('/') !== -1 ? dateString.split('/') :  [];
						if(dateArr.length === 3 && Number(dateArr[0]) === Number(this.year) && Number(dateArr[1]) === Number(this.month) && Number(dateArr[2]) === Number(i)){
							data = item
						}
					}
					
					let obj = {	day:i, data }
					list.push(obj)
				}
				for(let i = 0; i < week; i++){
					// list.unshift(this.getDayNum(year, month - 1) -i)
					list.unshift({ day:null, data:{}})
				}
				return list
			},
			
			getDayNum(year, month){
				let dayNum = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
				if((year % 4 !== 0) && (year % 100 === 0) || (year % 400 !== 0)){
					dayNum[1] = 28
				}
				return dayNum[month - 1]
			},
			
			toActive(item, index){
				this.day = item.day
				this.$emit('click-active', {year:this.year, month:this.month, day:item.day, date:this.year + '-' + this.month + '-' +this.day, index: index})
			},
			
			toTask(item, index){
				this.$emit('click-task', {row: item, index: index})
			},
			
			LastMonth(){
				if(this.month > 1){
					this.month = this.month - 1
					this.initApi()
					this.$emit('last-month', {year:this.year, month:this.month, day:this.day })
				}
				
			},
			
			NextMonth(){
				if(this.month < 12){
					this.month = this.month + 1
					this.initApi()
					this.$emit('next-month', {year:this.year, month:this.month, day:this.day })
				}
			},
			
			LastYear(){
				if(this.year > 2000){
					this.year = this.year - 1
					this.initApi()
					this.$emit('last-year', {year:this.year, month:this.month, day:this.day })
				}
			},
			
			NextYear(){
				this.year = this.year + 1
				this.initApi()
				this.$emit('next-year', {year:this.year, month:this.month, day:this.day })
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "iconfont.css";
	.date-box{
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 20rpx;
		.box-list{
			background-color: white;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.date-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 20rpx;
				.icon{
					width: 50rpx;
					height: 50rpx;
					line-height: 50rpx;
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
				.conter-text{
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.month{
						padding: 0 40rpx;
					}
				}
			}
			.date-week{
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex: 1;
				padding: 20rpx;
				border-bottom: 1rpx solid #f3f4f6;
				.week-item{
					display: flex;
					justify-content: center;
					align-items: center;
					width: calc(100%/7);
					height: 52rpx;
					text-align: center;
					font-size: 30rpx;
					color: #909193;
				}
			}
			.day-content{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				padding: 10rpx 20rpx;
				position: relative;
				.day-item{
					display: flex;
					flex-direction: column;
					// justify-content: center;
					align-items: center;
					width: calc(100%/7);
					height: 110rpx;
					text-align: center;
					font-size: 32rpx;
					z-index: 2;
					.day-text{
						width: 58rpx;
						height: 58rpx;
						line-height: 58rpx;
						// margin-bottom: 2rpx;
						&.actives{
							color: #fff;
							box-sizing: border-box;
							background-color: #2b85e4;
							border-radius: 6rpx;
							border-radius: 50%;
						}
					}
					.value-text{
						font-size: 20rpx;
						color: #18b566;
						&.text-red {
							color: #dd6161;
						}
					}
					.day-dot{
						margin-top: 5rpx;
						border-radius: 50%;
						padding: 4rpx;
						&.dot-red{
							background: #dd6161;
						}
						&.dot-gray {
							background: #18b566;
						}
					}
					.red-icon{
						color: #dd6161;
						font-size: 24rpx;
					}
					.dot-gray-icon {
						color: #18b566;
						font-size: 24rpx;
					}
				}
				.day-month{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					// color: rgba(231,232,234,.83);
					font-size: 200px;
					font-weight: 700;
					color: #999;
					opacity: .1;
					text-align: center;
					line-height: 1;
					z-index: 1;
				}
			}
		}
		.task-box{
			display: flex;
			flex-direction: column;
			.task-item{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				.avatar-box{
					display: flex;
					.avatar{
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
						border-radius: 50%;
						image{
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}
					}
					.title-box{
						display: flex;
						flex-direction: column;
						align-content: space-between;
						.title{
							font-size: 30rpx;
							color: #303133;
							margin-bottom: 15rpx;
						}
						.date{
							font-size: 26rpx;
							color: #909193;
							.branch{
								margin-right: 15rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
