import Vue from 'vue'
import Router from 'vue-router'
// 将路由挂载到vue上
Vue.use(Router)

//引入login组件
import login from './views/login.vue'
import home from './views/home.vue'
import user from './components/user/user.vue'
import welcome from './components/welcome/welcome.vue'
import right from './components/right/right.vue'
import role from './components/right/role.vue'
import goodList from './components/goods/goodList.vue'
import category from './components/goods/categroies.vue'
import goodCategory from './components/goods/goodCategories.vue'
import orderList from './components/order/orderList.vue'
import reports from './components/reports/reporrList.vue'
import addGoods from './components/goods/addGoods.vue'

const router = new Router({
  routes: [
    {path:"/",redirect: '/login'},
    {path:"/login",component:login},
    {path:"/home",redirect: "home/welcome"},
    {path:"/home",component:home,
    children:[
      {path:"welcome",component:welcome},
      {path:"users",component:user},
      {path:"roles",component:role},
      {path:"rights",component:right},
      {path:"goods",component:goodList},
      {path:"params",component:category},
      {path:"categories",component:goodCategory},
      {path:"orders",component:orderList},
      {path:"reports",component:reports},
      {path:"addGoods",component:addGoods}
    ]
    }
  ]
})


// 设置路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  const token = window.localStorage.getItem("mytoken")
  if (to.path === "/login") return next()
  if (!token) return next("/")
  next()
})




//导出路由实例
export default router