<template>
  <view class="container">
    <v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
    <view class=""></view>

    <view class="tui-line-h"></view>
    <swiper :current="tabIndex" class="tui-swiper-box" :duration="300" @change="tabChange">
      <swiper-item class="tui-swiper-item" v-for="(tab, index1) in newsList" :key="index1">
        <scroll-view
          class="tui-scroll-v"
          refresher-enabled
          :refresher-triggered="tab.refreshing"
          refresher-background="#fafafa"
          enable-back-to-top
          :refresher-threshold="100"
          scroll-y
          @scrolltolower="loadMore(index1)"
          @refresherrefresh="onrefresh"
        >
          <!--小程序ios端 不设高度会导致无法滚动-->
          <view style="min-height:101%">
            <view v-for="newsitem in 4" :key="newsitem.id">
              <!-- <t-news-item :entity="newsitem" :lastChild="index2 === tab.data.length - 1" @click="goDetail(newsitem)"></t-news-item> -->
              <view class="">t-news-item</view>
            </view>
            <view class="tui-loading-more" v-if="tab.isLoading || tab.pageIndex > 3">
              <text class="tui-loadmore-line" v-if="tab.pageIndex > 3"></text>
              <text class="tui-loading-more-text">{{ tab.loadingText }}</text>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import thorui from '@/components/common/tui-clipboard/tui-clipboard.js';
import VTabs from '@/components/v-tabs/v-tabs.vue';
import { mapActions, mapState } from 'vuex';

// 缓存最多页数
const MAX_CACHE_PAGEINDEX = 3;
// 缓存页签数量
const MAX_CACHE_PAGE = 3;

export default {
  components: { VTabs },
  data() {
    return {
      current: 0,
      tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],

      // =============
      isIos: false,
      newsList: [],
      cacheTab: [],
      tabIndex: 0,
      scrollInto: '',
      showTips: false,
      navigateFlag: false,
      pulling: false,
      refreshIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRBAMAAABYoVcFAAAAKlBMVEUAAACXl5eZmZmfn5+YmJiXl5eampqZmZmYmJiYmJiZmZmYmJiZmZmZmZl02B9kAAAADXRSTlMAQKAQ0GAsUN+wz5CA21ow0AAAAM5JREFUSMftzLEJAkEQheFR4WzjGji4wC5E0A7E0OgaEIwF4RqwJEEODKcX1114yQ/uhsLtY6Lh57NZ7Dz1heXd27Kwcb+WlQv3Vy1rWcta1rKW/1Q2R8PWt8FYdhPLi79ZLt33KB/hibJzH1E+PaAqRfqAcuMBVSlyMmy1C6hKka0CoCpBAlUJEmgsQQJVCRKoSpBAU0mSaCpJEk0lSSMaS5JG9FuK/IkeQkmSaEjikSSaRpJoHEmiIvOoyCwqMo+KzKMi8+hoZTtte5vDPrSGI5zJ/Z1kAAAAAElFTkSuQmCC'
    };
  },
  computed: {},
  watch: {},
  onLoad() {
    setTimeout(() => {
      this.newsList = this.randomfn();
      console.log(this.newsList);
      uni.getSystemInfo({
        success: res => {
          this.isIos = 'ios' == res.platform.toLocaleLowerCase();
        }
      });
    }, 200);
  },
  methods: {
    changeTab(index) {
      console.log('当前选中的项：' + index);
    },
    randomfn() {
      let ary = [];
      for (let i = 0, length = this.tabs.length; i < length; i++) {
        let aryItem = {
          loadingText: '正在加载...',
          refreshing: false,
          refreshText: '',
          data: [],
          isLoading: false,
          pageIndex: 1
        };
        if (i === this.tabIndex) {
          aryItem.pageIndex = 2;
          aryItem.data = [];
        }
        ary.push(aryItem);
      }
      return ary;
    },
    getList(index, refresh) {},
    goDetail(e) {},
    loadMore(e) {},
    tabClick(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    tabChange(e) {
      console.log(e);
      if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
        let index = e.target.current || e.detail.current;
        this.switchTab(index);
      }
    },
    switchTab(index) {},
    clearTabData(e) {
      this.newsList[e].data.length = 0;
      this.newsList[e].loadingText = '加载更多...';
    },
    onrefresh(e) {
      let index = this.tabIndex;
      var tab = this.newsList[index];
      // #ifdef APP-PLUS
      if (!tab.refreshFlag) {
        return;
      }
      // #endif

      // #ifndef APP-PLUS
      if (tab.refreshing) {
        return;
      }
      // #endif

      tab.refreshing = true;
      tab.refreshText = '正在刷新...';

      setTimeout(() => {
        this.getList(index, true);
        this.pulling = true;
        tab.refreshing = false;
        tab.refreshFlag = false;
        tab.refreshText = '刷新成功';
        // #ifndef H5
        uni.showToast({
          title: '刷新成功',
          icon: 'none'
        });
        // #endif
        setTimeout(() => {
          // TODO fix ios和Android 动画时间相反问题
          this.pulling = false;
        }, 500);
      }, 1000);
    },
    onpullingdown(e) {
      var tab = this.newsList[this.tabIndex];
      if (tab.refreshing || this.pulling) {
        return;
      }
      if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
        tab.refreshFlag = true;
        tab.refreshText = '释放立即刷新';
      } else {
        tab.refreshFlag = false;
        tab.refreshText = '下拉可以刷新';
      }
    }
  }
};
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

<style>
/* #ifndef APP-PLUS */
page {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

.tui-tabs {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #fafafa;
  /* #ifdef MP-ALIPAY || MP-BAIDU */
  height: 100vh;
  /* #endif */
}

.tui-scroll-h {
  width: 750rpx;
  height: 80rpx;
  background-color: #ffffff;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  /* #ifdef H5 */
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 999;
  /* #endif */
}

.tui-line-h {
  /* #ifdef APP-PLUS */
  height: 1rpx;
  background-color: #cccccc;
  /* #endif */
  position: relative;
}

/* #ifndef APP-PLUS*/
.tui-line-h::after {
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

.tui-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  padding-left: 34rpx;
  padding-right: 34rpx;
}

.tui-tab-item-title {
  color: #555;
  font-size: 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
}

.tui-tab-item-title-active {
  color: #5677fc;
  font-size: 36rpx;
  font-weight: bold;
  border-bottom-width: 6rpx;
  border-style: solid;
  border-color: #5677fc;
  text-align: center;
}

.tui-swiper-box {
  flex: 1 !important;
  /* #ifdef H5 */
  margin-top: 80rpx;
  /* #endif */
}

.tui-swiper-item {
  flex: 1 !important;
  flex-direction: row;
}

.tui-scroll-v {
  flex: 1;
  /* #ifndef MP-ALIPAY */
  flex-direction: column;
  /* #endif */
  width: 750rpx;
}

.tui-update-tips {
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

.tui-update-tips-text {
  font-size: 14px;
  color: #ffffff;
}

.tui-refresh {
  width: 750rpx;
  height: 64px;
  justify-content: center;
}

.tui-refresh-view {
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.tui-refresh-icon {
  width: 20px;
  height: 20px;
  transition-duration: 0.25s;
  transition-property: transform;
  transform: rotate(0deg);
  transform-origin: 10px 10px;
}

.tui-refresh-icon-active {
  transform: rotate(180deg);
}

.tui-loading-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: #999999;
}

.tui-loading-text {
  margin-left: 2px;
  font-size: 14px;
  color: #999999;
}

.tui-loading-more {
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  position: relative;
}

.tui-loadmore-line {
  border-bottom-width: 1rpx;
  border-bottom-style: solid;
  border-bottom-color: #e5e5e5;
  width: 320rpx;
  position: absolute;
  z-index: -1;
}

.tui-loading-more-text {
  padding-left: 8rpx;
  padding-right: 8rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  background-color: #fafafa;
  text-align: center;
  color: #999;
}
</style>
