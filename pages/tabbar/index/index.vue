<template>
  <view class="container">
    <wsf-tabs-swiper :tabs="tabs" @loadMore="loadList" :list="items">
      <template v-slot:tab="{ tab }">
        <view class="" style="height: 60px;background-color: #fff;margin: 10rpx;">接收激活的tab ：{{ tab.id }}-{{ tab.title }}
        </view>
      </template>
      <template v-slot:item="{ item }">
        <view class="" style="height: 60px;background-color: #fff;margin: 10rpx;">接收插槽值 ： {{ item.name }}</view>
      </template>
    </wsf-tabs-swiper>
  </view>
</template>

<script>
import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'

export default {
    data() {
        return {
            tabs: [{
                id: 1,
                title: '军事'
            },
            {
                id: 2,
                title: '科幻'
            },
            {
                id: 3,
                title: '战争'
            },
            {
                id: 4,
                title: '人文'
            },
            {
                id: 5,
                title: '地理'
            },
            {
                id: 6,
                title: '社会'
            },
            {
                id: 7,
                title: '家庭'
            },
            {
                id: 8,
                title: '育儿'
            },
            {
                id: 9,
                title: '科技'
            },
            {
                id: 10,
                title: '教育'
            }
            ],
            // 当前激活的tab 数据
            items: []
        }
    },

    onLoad() {},
    methods: {
        loadList(obj) {
            console.log('需要加载数据：', obj)

            var _this = this

            var num = (obj.pageIndex - 1) * 10
            var tempList = []
            for (let i = 1; i < 11; i++) {
                let index = parseInt(num) + parseInt(i)
                let tempItem = {
                    name: index + '_' + obj.tabInfo.title
                }
                tempList.push(tempItem)
            }
            // 模拟延时3秒
            setTimeout(() => {
                _this.items = tempList
            }, 300)
        }
    }
}
</script>

<style>
  .container {
    width: 100%;
    padding-bottom: 30rpx;
    height: 100vh;
  }
</style>
