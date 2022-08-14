import api from '@/api/index'
import tui from '@/common/httpRequest';

const user = {
  // 管理的数据
  state: {
    //用户登录手机号
    token: uni.getStorageSync("api_token") || "",
    //是否登录 项目中改为真实登录信息判断，如token
    isLogin: uni.getStorageSync("api_token") ? true : false,
    //登录用户名
    name: "请登录",
    //app版本
    version: "1.0.0"
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
			uni.setStorageSync("api_token",token)
    },
  },

  actions: {
    login({ commit }, userInfo) {
			console.log('登录--',userInfo)
      const { mobile, password } = userInfo
      return new Promise((resolve, reject) => {
        api.login({ mobile: mobile.trim(), password: password }).then(response => {
					console.log('登录返回',response)
					tui.toast(response.message)
					if(response.code !== 200){
						reject(response)
					}else{
						resolve(response)
					}
          // const { data } = response
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
          // setSecret(data.secret)
					// reject(false)
        }).catch(error => {
					console.log(error)
					tui.toast('出错啦')
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUser().then(res => {
          const data = res.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   // 调用生成路由表
          //   // commit('GenerateRoleRoutes', data.roles).then(() => {
          //   // })
          // } else {
          //   reject('getUser: 角色信息获取错误 !')
          // }
          // 获取其他信息
          commit('SET_APP_ID', data.app_id)
          commit('SET_ORG_ID', data.org_id)
          commit('SET_AVATAR', data.avatar)
          commit('SET_MOBILE', data.mobile)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_USERNAME', data.username)
          commit('SET_UID', data.uid)
          commit('SET_EMAIL', data.email)
          commit('SET_GENDER', data.gender)
          commit('SET_UNREAD_MSG_TOTAL', data.unread_msg_total)

          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 获取用户权限
     */
    getPermission ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        getUserAuth().then(res => {
          // 存储权限列表
          const apiAuthData = res.data
          if (!apiAuthData || apiAuthData.length < 1) { // 验证返回的是否是一个空数组
            // console.log('getPermission 角色信息获取错误 !')
            // reject('getPermission 角色信息获取错误 !')
            reject()
          }
          let apiAuthPermissionList = []
          apiAuthData.forEach(apiNode => {
            apiAuthPermissionList.push(apiNode[RouterConfig.apiPermissionField])
          })
          commit('SET_AUTH', apiAuthPermissionList)
          commit('SET_ROLES', apiAuthData)
          // 调用完权限 ，调用同级的用户信息
          dispatch('GetUserInfo').then(res => {
            resolve(apiAuthData)
          }).catch(() => {
            reject()
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出
    Logout ({ commit, state }) {
      
    }

  }
}

export default user