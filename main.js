import Vue from 'vue'
import App from './App'
import store from './store/index.js'

// import ZxMarkdownEditor from "./components/zx-markdown-editor/src/components/export.js";
// Vue.component("byui-markdown-editor", ZxMarkdownEditor);

Vue.config.productionTip = false
Vue.prototype.$store = store


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
