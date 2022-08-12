# v-tabs 加 swiper 组合的一个通用的 滑动页面 联动组件

## demo
```
<template>
	<view class="container">
		<wsf-tabs-swiper :tabs="tabs" @loadMore="loadList" :list="items" tabTitle='title'>
			<template v-slot:item="{ data }">
				<view style="height: 60px;background-color: #fff;margin: 10rpx;">接收插槽值 ： {{ data.name }}</view>
			</template>
		</wsf-tabs-swiper>
	</view>
</template>

<script>

export default {
    data() {
        return {
            tabs: [
                {
                    id: 1,
                    title: '军事1'
                },
                {
                    id: 2,
                    title: '军事2'
                },
                {
                    id: 3,
                    title: '军事3'
                },
                {
                    id: 4,
                    title: '军事4'
                },
                {
                    id: 5,
                    title: '军事5'
                },
                {
                    id: 6,
                    title: '军事6'
                },
                {
                    id: 7,
                    title: '军事7'
                },
                {
                    id: 8,
                    title: '军事8'
                },
                {
                    id: 9,
                    title: '军事9'
                }
            ],
            items: []
        }
    },

    onLoad() {
    },
    methods: {
        loadList(obj) {
            // console.log('需要加载数据：', obj)

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
							 // 通过更新 :list="items" 来设置 当前激活的tab 里面的列表内容
                _this.items = tempList
            }, 3000)
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

```