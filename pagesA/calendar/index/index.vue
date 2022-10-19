<template>
  <view>
    <zui-calendar :list="list" :extraData="extraData" :isIcon="false" @click-active="clickActive" @click-task="clickTask">
    	<!-- <template slot="task">
    		<view>这里边写你自己的布局方式</view>
    	</template> -->
    </zui-calendar>
    
    <tui-fab :left="0" :right="60" :bottom="140" :width="100" :height="100" bgColor="#5677fc" @click="addTask" custom maskClosable><tui-icon name="plus" color="#fff"></tui-icon></tui-fab>
    
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
        }],
        currentate:'' // 当前日期 yyyy-mm-dd
      }
    },
    mounted() {
      let year = new Date().getFullYear();
      let month = parseInt(new Date().getMonth() + 1);
      let day = parseInt(new Date().getDate());
      this.currentate = year+'-'+month+'-'+day
    },
  	methods: {
  		// 点击日数方法
  		clickActive({year, month, date, index}){
  			// console.log('clickActive',year, month, date, index)
        this.currentate = date
  		},
  		
  		// 点击任务方法
  		clickTask({row, index}){
  			console.log('clickTask',row, index)
  		},
      // 添加日程/备注
      addTask(e) {
        console.log('添加任务',this.currentate)
      },
  	}
  }
</script>

<style>

</style>
