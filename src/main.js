import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 引入iview的包文件 
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/iview.css'
//将包挂载到vue上
Vue.use(iview)

Vue.config.productionTip = false


// 配置路由地址
// 配置请求的根路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
//给vue添加一个$http的属性名称使其更舒服
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
