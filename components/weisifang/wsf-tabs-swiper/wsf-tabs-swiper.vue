<template>
	<view class="wsf-tabs-swiper">
		<v-tabs v-model="tabIndex" :tabs="tabs" @change="changeTab"></v-tabs>

		<view class="wsf-line-h"></view>
		<swiper :current="tabIndex" class="wsf-swiper-box" :duration="300" @change="tabChange">
			<swiper-item class="wsf-swiper-item" v-for="(swData, swIndex) in swiperList" :key="`swiper-${swIndex}`">
				<!-- #ifdef APP-NVUE -->
				<list class="wsf-scroll-v" enableBackToTop="true" scroll-y loadmoreoffset="15" @loadmore="loadMore(swIndex)">
					<refresh class="wsf-refresh" @refresh="onrefresh(swIndex)" @pullingdown="onpullingdown" :display="swData.refreshing ? 'show' : 'hide'">
						<div class="wsf-refresh-view">
							<image
								class="wsf-refresh-icon"
								:src="refreshIcon"
								:style="{ width: swData.refreshing || pulling ? 0 : '20px' }"
								:class="{ 'wsf-refresh-icon-active': swData.refreshFlag }"
							></image>
							<loading-indicator class="wsf-loading-icon" animating="true" v-if="swData.refreshing"></loading-indicator>
							<text class="wsf-loading-text">{{ swData.refreshText }}</text>
						</div>
					</refresh>
					<cell v-for="(item, itemIndex) in swData.data" :key="`swiper-item-${itemIndex}`">
						<!-- 通过插槽传值 -->
						<slot name="item" :data="item"></slot>
					</cell>
					<cell class="wsf-loading-more" v-if="swData.isLoading">
						<text class="wsf-loadmore-line" v-if="!swData.hasMore"></text>
						<text class="wsf-loading-more-text">{{ swData.loadingText }}</text>
					</cell>
				</list>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<scroll-view
					class="wsf-scroll-v"
					refresher-enabled
					:refresher-triggered="swData.refreshing"
					refresher-background="#fafafa"
					enable-back-to-top
					:refresher-threshold="100"
					scroll-y
					@scrolltolower="loadMore(swIndex)"
					@refresherrefresh="onrefresh"
				>
					<!--小程序ios端 不设高度会导致无法滚动-->
					<view style="min-height:101%">
						<view v-for="(item, itemIndex) in swData.data" :key="`swiper-item-${itemIndex}`">
							<!-- 通过插槽传值 -->
							<slot name="item" :data="item"></slot>
						</view>
						<view class="wsf-loading-more" v-if="swData.isLoading || swData.pageIndex > 3">
							<text class="wsf-loadmore-line" v-if="swData.pageIndex > 3"></text>
							<text class="wsf-loading-more-text">{{ swData.loadingText }}</text>
						</view>
					</view>
				</scroll-view>
				<!-- #endif -->
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import VTabs from '@/components/v-tabs/v-tabs.vue'

export default {
    name: 'wsfTabsSwiper',
    emits: ['loadList'],
    components: {
        VTabs
    },
    props: {
        // tabs 列表; 一维数组 例如['北京','云南','四川']
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        // 当前激活的 单个tab 下的 swiper 数据; 例如：[{...},{...}]
        list: {
            type: Array,
            default() {
                return []
            }
        },
        // 获取新数据后 是 追加到尾部还是覆盖,默认 追加到现有数据尾部
        cover: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        multiple(val) {
            this.initData()
        },
        list(val) {
            this.setData(val)
        }
    },
    data() {
        return {
            tabIndex: 0,
            swiperList: [],

            isIos: false,

            pulling: false,
            refreshIcon:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRBAMAAABYoVcFAAAAKlBMVEUAAACXl5eZmZmfn5+YmJiXl5eampqZmZmYmJiYmJiZmZmYmJiZmZmZmZl02B9kAAAADXRSTlMAQKAQ0GAsUN+wz5CA21ow0AAAAM5JREFUSMftzLEJAkEQheFR4WzjGji4wC5E0A7E0OgaEIwF4RqwJEEODKcX1114yQ/uhsLtY6Lh57NZ7Dz1heXd27Kwcb+WlQv3Vy1rWcta1rKW/1Q2R8PWt8FYdhPLi79ZLt33KB/hibJzH1E+PaAqRfqAcuMBVSlyMmy1C6hKka0CoCpBAlUJEmgsQQJVCRKoSpBAU0mSaCpJEk0lSSMaS5JG9FuK/IkeQkmSaEjikSSaRpJoHEmiIvOoyCwqMo+KzKMi8+hoZTtte5vDPrSGI5zJ/Z1kAAAAAElFTkSuQmCC'
        }
    },
    created() {
        this.initData()
        this.getList(0, true)
        setTimeout(() => {
            uni.getSystemInfo({
                success: res => {
                    this.isIos = 'ios' == res.platform.toLocaleLowerCase()
                }
            })
        }, 200)
    },
    methods: {
        initData() {
            console.log('initData', this.tabs)
            let ary = []
            for (let i = 0, length = this.tabs.length; i < length; i++) {
                let aryItem = {
                    loadingText: '正在加载...',
                    refreshing: false, // 真正刷新中
                    refreshText: '', // 刷新提示
                    data: [], // 列表数据
                    isLoading: false, // 是否正在加载
                    hasMore: true, // 有没有更多数据
                    pageIndex: 0 // 当前页码
                }
                if (i === this.tabIndex) {
                    aryItem.pageIndex = 1
                    aryItem.data = this.list
                }
                ary.push(aryItem)
            }
            this.swiperList = ary
        },
        // 接收到新数据后进行渲染
        setData(data) {
            console.log('setData', data)
            let activeTab = this.swiperList[this.tabIndex]
            if (this.isEmpty(data)) {
                // 没有数据了
                activeTab.hasMore = false
                activeTab.loadingText = '没有更多了'
            } else {
                activeTab.data = this.cover || this.pulling ? data : activeTab.data.concat(data)
            }
            activeTab.refreshing = false
            activeTab.isLoading = false
            activeTab.refreshFlag = false
            activeTab.refreshText = '刷新成功'
            // TODO fix ios和Android 动画时间相反问题
            this.pulling = false
        },

        //判断字符是否为空的方法
        isEmpty: function(obj) {
            if (
                typeof obj === 'undefined' ||
				obj === null ||
				obj === '' ||
				obj.length === 0 ||
				!/[^(^\s*)|(\s*$)]/.test(obj) ||
				(this.getType(obj) === 'Object' && Object.keys(obj).length < 1) ||
				(this.getType(obj) === 'string' && ['{}', '[]'].includes(obj))
            ) {
                return true
            } else {
                return false
            }
        },
        // 判断一个对象的类型
        getType: function(data) {
            let type = typeof data
            if (type !== 'object') {
                return type
            }
            return Object.prototype.toString.call(data).replace(/^\[object (\S+)\]$/, '$1')
        },
        changeTab(index) {
            console.log('当前选中的项：' + index)
            this.tabIndex = index
            let activeTab = this.swiperList[index]
            if (this.isEmpty(activeTab.data) && activeTab.hasMore && !activeTab.isLoading) {
                // 当前tab数据为空，且未设置无数据，就进行通知加载数据
                // 通知父组件 加载数据
                this.pulling = true
                this.getList(index, true)
            }
        },
        getList(index, refresh = false) {
            let activeTab = this.swiperList[index]
            console.log('getList', activeTab)
            if (!activeTab.hasMore) {
                activeTab.loadingText = '没有更多了'
                return false
            }
            if (activeTab.isLoading) {
                return false
            }
            console.log('getList ing')
            // 通知父组件 加载数据
            activeTab.pageIndex = refresh ? 1 : activeTab.pageIndex + 1
            activeTab.isLoading = true
            activeTab.loadingText = '正在加载...'
            this.$emit('loadList', {
                tabIndex: index,
                pageIndex: activeTab.pageIndex
            })
        },
        // 通知加载 数据
        loadMore(e) {
            let tabIndex = this.tabIndex
            let activeTab = this.swiperList[tabIndex]
            if (activeTab.hasMore && !activeTab.isLoading) {
                this.getList(tabIndex)
            }
        },

        onrefresh(e) {
            let index = this.tabIndex
            var tab = this.swiperList[index]
            console.log('onrefresh', e, tab)
            // #ifdef APP-PLUS
            // 临时关闭
            // if (!tab.refreshFlag) {
            //     return
            // }
            // #endif

            // #ifndef APP-PLUS
            if (tab.refreshing) {
                return
            }
            // #endif

            tab.refreshing = true
            tab.refreshText = '正在刷新...'
            this.pulling = true
            this.getList(index, true)
        },
        onpullingdown(e) {
            console.log('onpullingdown', e)
            let index = this.tabIndex
            var tab = this.swiperList[index]
            if (tab.refreshing || this.pulling) {
                return
            }
            if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                tab.refreshFlag = true
                tab.refreshText = '释放立即刷新'
            } else {
                tab.refreshFlag = false
                tab.refreshText = '下拉可以刷新'
            }
        },

        // 手势滑动的时候
        tabChange(e) {
            console.log('tabChange', e)
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                let index = e.target.current || e.detail.current
                this.switchTab(index)
            }
        },
        switchTab(index) {
            if (this.tabIndex === index) return
            if (this.swiperList[index].data.length === 0) {
                this.getList(index)
            }

            this.tabIndex = index
            let scrollIndex = index - 1 < 0 ? 0 : index - 1
        },
        clearTabData(e) {
            this.newsList[e].data.length = 0
            this.newsList[e].loadingText = '加载更多...'
        }
    }
}
</script>

<style>
/* #ifndef APP-PLUS */
page {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

.wsf-tabs-swiper {
	flex: 1;
	flex-direction: column;
	overflow: auto;
	background-color: #fafafa;
	height: 100vh;
}

.wsf-line-h {
	/* #ifdef APP-PLUS */
	height: 1rpx;
	background-color: #cccccc;
	/* #endif */
	position: relative;
}

/* #ifndef APP-PLUS*/
.wsf-line-h::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #cccccc;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

/* #endif */

.wsf-swiper-box {
	flex: 1 !important;
	/* #ifdef H5 */
	margin-top: 80rpx;
	/* #endif */
	height: 100vh;
	border: 2px solid red;
	overflow: auto;
}

.wsf-swiper-item {
	flex: 1 !important;
	flex-direction: row;
}

.wsf-scroll-v {
	flex: 1;
	/* #ifndef MP-ALIPAY */
	flex-direction: column;
	/* #endif */
	width: 750rpx;
}

.wsf-update-tips {
	position: absolute;
	left: 0;
	top: 41px;
	right: 0;
	padding-top: 5px;
	padding-bottom: 5px;
	background-color: #fddd9b;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.wsf-update-tips-text {
	font-size: 14px;
	color: #ffffff;
}

.wsf-refresh {
	width: 750rpx;
	height: 64px;
	justify-content: center;
}

.wsf-refresh-view {
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}

.wsf-refresh-icon {
	width: 20px;
	height: 20px;
	transition-duration: 0.25s;
	transition-property: transform;
	transform: rotate(0deg);
	transform-origin: 10px 10px;
}

.wsf-refresh-icon-active {
	transform: rotate(180deg);
}

.wsf-loading-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
	color: #999999;
}

.wsf-loading-text {
	margin-left: 2px;
	font-size: 14px;
	color: #999999;
}

.wsf-loading-more {
	align-items: center;
	justify-content: center;
	padding-top: 15px;
	padding-bottom: 15px;
	text-align: center;
	position: relative;
}

.wsf-loadmore-line {
	border-bottom-width: 1rpx;
	border-bottom-style: solid;
	border-bottom-color: #e5e5e5;
	width: 320rpx;
	position: absolute;
	z-index: -1;
}

.wsf-loading-more-text {
	padding-left: 8rpx;
	padding-right: 8rpx;
	font-size: 28rpx;
	line-height: 28rpx;
	background-color: #fafafa;
	text-align: center;
	color: #999;
}
</style>
