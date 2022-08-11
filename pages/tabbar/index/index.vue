<template>
	<view class="container">
		<wsf-tabs-swiper :tabs="tabs" @loadList="loadList" :list="items">
			<template v-slot:item="{ data }">
				<view class="" style="line-height: 300rpx;background-color: #fff;margin: 10rpx;">接收插槽值 ： {{ data.name }}</view>
			</template>
		</wsf-tabs-swiper>
	</view>
</template>

<script>
import thorui from '@/components/common/tui-clipboard/tui-clipboard.js'

export default {
    data() {
        return {
            current: 0,
            tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
            items: []
        }
    },

    onLoad() {
        // setTimeout(() => {
        //     this.newsList = this.randomfn()
        //     console.log(this.newsList)
        // }, 200)
    },
    methods: {
        loadList(option) {
            console.log('需要加载数据：', option)
            var date = new Date()
            // var y = date.getFullYear();
            // var m = date.getMonth() + 1;
            // var d = date.getDate();
            var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

            function formatNumber(num) {
                if (num <= 9) {
                    return '0' + num
                } else {
                    return '' + num
                }
            }
            let time = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate()) + ' ' + h + ':' + minute + ':' + s

            this.items = [
                {
                    name: time + ':111111111111111111'
                },
                {
                    name: '1112222221111'
                },
                {
                    name: '11333333111111'
                },
                {
                    name: '111444444444441111111'
                },
                {
                    name: '1115555555555555111111'
                },
                {
                    name: '1116666666666666661111'
                },
                {
                    name: '111117777777777771111'
                }
            ]
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
