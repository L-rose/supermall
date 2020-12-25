import Vue from 'vue'
import VueRouter from 'vue-router'

const Home= () => import('views/home/Home')
const Catagory =() => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () =>import('views/profile/Profile')
const Detail = () =>import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    //使用默认页面 重定向
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Catagory
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile,
  },
  {
    path: '/detail/:iid',
    component:Detail,
  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
