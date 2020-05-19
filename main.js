import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = store

import {requestCloud} from './utils.js/utils.js'
Vue.prototype.$requestCloud = requestCloud


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
