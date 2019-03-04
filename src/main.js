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



// 使用部分element-ui组件
import 'element-ui/lib/theme-chalk/index.css';
import {
  Table,
  TableColumn,
  Form,
  FormItem,
  Button,
  Tag
} from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Tag);


Vue.config.productionTip = false


// 配置路由地址
// 配置请求的根路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
//给vue添加一个$http的属性名称使其更舒服
Vue.prototype.$http = axios
// 设置一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送前做点什么
  let token = window.localStorage.getItem('mytoken')
  //判断token是否存在
  if (token) config.headers.common['Authorization'] = token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')