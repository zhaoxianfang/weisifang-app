<template>
	<view class="container">
		<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
		<view class=""></view>
	</view>
</template>

<script>
import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'
import VTabs from '@/components/v-tabs/v-tabs.vue'
import { mapActions, mapState } from 'vuex'
export default {
	components: { VTabs },
	data() {
		return {
			current: 0,
			tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
			scrollData: [
				{
					label: '第一页',
					slot: 'slot-1'
				},
				{
					label: '第2页',
					slot: 'slot-2'
				},
				{
					label: '第3页',
					slot: 'slot-3'
				},
				{
					label: '第4页',
					slot: 'slot-4'
				},
				{
					label: '第5页',
					slot: 'slot-5'
				},
				{
					label: '第6页',
					slot: 'slot-6'
				},
				{
					label: '第7页',
					slot: 'slot-7'
				},
				{
					label: '第8页',
					slot: 'slot-8'
				}
			]
		}
	},
	computed: {},
	watch: {},
	onLoad() {},
	methods: {
		changeTab(index) {
			console.log('当前选中的项：' + index)
		}
	}
}
</script>

<style>
.container {
	width: 100%;
	padding-bottom: 30rpx;
}

.tui-page-title {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 70rpx 0 30rpx 0;
}

.tui-logo {
	height: 108rpx;
	width: 108rpx;
	border-radius: 50%;
}

.tui-title {
	font-size: 64rpx;
	padding-left: 20rpx;
	color: #333;
	position: relative;
}

.tui-link {
	color: #5677fc;
}

.tui-cell {
	padding: 10px 15px;
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.tui-cell:before {
	content: ' ';
	position: absolute;
	top: 0;
	right: 0;
	border-top: 1px solid #eaeef1;
	color: #eaeef1;
	left: 15px;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
}

.tui-cell:first-child:before {
	display: none;
}

.tui-cell_active {
	background-color: #f7f7f9;
}

.tui-cell_bd {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}

.tui-cell_ft {
	text-align: right;
	color: #999;
}

.tui-cell_access {
	color: inherit;
}

.tui-cell_ft_in-access {
	padding-right: 13px;
	position: relative;
}

.tui-cell_ft_in-access:after {
	content: ' ';
	height: 11px;
	width: 11px;
	border-width: 2px 2px 0 0;
	border-color: #b2b2b2;
	border-style: solid;
	-webkit-transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
	transform: matrix(0.5, 0.5, -0.5, 0.5, 0, 0);
	position: absolute;
	top: 50%;
	margin-top: -7px;
	right: 2px;
}

.tui-form-preview_item {
	overflow: hidden;
}

.tui-flex {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}

.tui-flex_item {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}

.tui-page-desc {
	width: 100%;
	color: #666;
	font-size: 28rpx;
	text-align: center;
	padding: 0 80rpx 50rpx;
	box-sizing: border-box;
}

.tui-link {
	color: #586c94;
}

.tui-flex {
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
}

.tui-cells {
	margin-top: 0;
	opacity: 0;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	-webkit-transition: 0.3s;
	transition: 0.3s;
}

.tui-cells:before,
.tui-cells:after {
	display: none;
}

.tui-cells_show {
	opacity: 1;
	-webkit-transform: translateY(0);
	transform: translateY(0);
}

.tui-cell:before {
	right: 15px;
}

.kind-list_item {
	margin: 10px 0;
	background-color: #fff;
	border-radius: 2px;
	overflow: hidden;
}

.kind-list_item:first-child {
	margin-top: 0;
}

.kind-list_img {
	width: 30px;
	height: 30px;
}

.tui-img-1,
.tui-img-2,
.tui-img-8 {
	width: 32px !important;
	height: 32px !important;
}

.tui-img-7 {
	width: 28px !important;
	height: 28px !important;
}

.kind-list_item-hd {
	padding: 20px;
	-webkit-transition: opacity 0.3s;
	transition: opacity 0.3s;
}

.kind-list_item-hd_show {
	opacity: 0.4;
}

.kind-list_item-bd {
	height: 0;
	overflow: hidden;
}

.kind-list_item-bd_show {
	height: auto;
}

.tui-badge {
	position: absolute;
	width: 80rpx;
	height: 30rpx;
	border-radius: 30rpx 30rpx 30rpx 0;
	color: #fff;
	background: #eb0909;
	font-size: 25rpx;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: scale(0.8) translateX(100%);
	transform-origin: center center;
	top: -8rpx;
	right: 0;
}
</style>
