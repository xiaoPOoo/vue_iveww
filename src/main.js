import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iview的包文件 
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/iview.css'
//将包挂载到vue上
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
