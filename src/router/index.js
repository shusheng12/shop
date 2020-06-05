import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) 

const Home=()=>import('../views/Home.vue')
const Login=()=>import('../views/Login.vue')
const Welcome=()=>import('../views/home/test2.vue')
const Users = () => import('../views/home/user/Users.vue')
const Rights=()=>import('../views/home/permissions/Rights')
const Roles=()=>import('../views/home/permissions/Roles')
const Goods=()=>import('../views/home/goods/goods')
const Params=()=>import('../views/home/goods/params')
const Cate=()=>import('../views/home/goods/cate')
const add=()=>import('../views/home/goods/add')
const Order=()=>import('../views/home/order/order')
const Report=()=>import('../views/home/report/report')

const routes = [
  {
    path: '/',
    redirect:'/Login'
  },
  {
    path: '/Home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/Rights', component: Rights },
      { path: '/Roles', component: Roles },
      { path: '/goods', component: Goods },
      { path: '/Params', component: Params },
      { path: '/categories', component: Cate },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report },
      { path: '/add', component: add },

    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
  
]


const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router
