import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import elementUi, { Message } from 'element-ui'
import './style/theme/index.css'
import './style/index.less'
import store from './store/index.js'

window.Promise = Promise

Vue.use(elementUi)
Vue.prototype.axios = axios
Vue.config.productionTip = false

// let url = window.location.origin
Vue.prototype.ajaxUrl = '/api'
Vue.prototype.ajaxCus = '/apiCus'

axios.interceptors.response.use(response => {
  // axios拦截，常用于登录验证等
  return response
}, (err) => {
  console.log(err)
  Message({
    message: '服务器出错啦！',
    type: 'error'
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
