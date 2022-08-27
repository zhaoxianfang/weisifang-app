<template>
  <view>
    <zui-calendar :list="list" :extraData="extraData" :isIcon="false" @click-active="clickActive" @click-task="clickTask">
    	<!-- <template slot="task">
    		<view>这里边写你自己的布局方式</view>
    	</template> -->
    </zui-calendar>
  </view>
</template>

<script>
  import ZuiCalendar from '@/pagesA/components/zui-calendar/zui-calendar.vue'
  export default {
    components: {
      ZuiCalendar
    },
  	data() {
      return {
        list: [
          {
            avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
            title: '整理会议记录文档1',
            time: '45分钟',
            details:'首要任务',
            date: '10:30'
          },
          {
            avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
            title: '整理会议记录文档',
            time: '45分钟',
            details:'首要任务',
            date: '10:30'
          },
          {
            avatar: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg',
            title: '整理会议记录文档',
            time: '45分钟',
            details:'首要任务',
            date: '10:30'
          }
        ],
        extraData:[{
          date: '2022-8-20', value: '签到', status: true, dot: true, active: false,
        },{
          date: '2022-9-19', value: '未签到', status: false, dot: true, active: true,
        }]
      }
    },
  	methods: {
  		// 点击日数方法
  		clickActive({year, month, date, index}){
  			console.log('clickActive',year, month, date, index)
  		},
  		
  		// 点击任务方法
  		clickTask({row, index}){
  			console.log('clickTask',row, index)
  		}
  	}
  }
</script>

<style>

</style>
