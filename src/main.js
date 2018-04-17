// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import axios from 'axios'
import "./resources/basic.css"
import "./resources/basic.js"
import store from  './resources/store.js'
Vue.prototype.$ajax = axios
//跨域的简单配置  另外一种就是在config的index文件里修改dev下的proxyTable里的target
 //axios.defaults.baseURL = "http://192.168.1.115:8080"; //打包的时候直接删掉，默认基础路径在这里配置 需要*
Vue.config.productionTip = false
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(MintUI)
Vue.prototype.HOST = '/api'  //或者打包的时候注释这一句
// Vue.prototype.HOST = ''  //打包的时候放出这一句
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
