import Vue from 'vue'
import Router from 'vue-router'
// 将路由挂载到vue上
Vue.use(Router)

//引入login组件
import login from './views/login.vue'
import home from './views/home.vue'
import user from './components/user/user.vue'
import welcome from './components/welcome/welcome.vue'

export default new Router({
  routes: [
    {path:"/",redirect: '/login'},
    {path:"/login",component:login},
    {path:"/home",redirect: "home/welcome"},
    {path:"/home",component:home,
    children:[
      {path:"welcome",component:welcome},
      {path:"user",component:user}
    ]
    }
  ]
})
