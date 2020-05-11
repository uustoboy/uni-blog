//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        userName: "",
		userInfo: '',
		openid:''
    },
    mutations: {
        login(state, user) {
            state.hasLogin = true;
			state.userInfo = user || '';
			state.openid = user.openid || '';
			state.userName = user.nickName || '';
			
			uni.setStorage({
				key:'userInfo',
				data:user
			})
        },
        logout(state) {
        }
    }
})
export default store