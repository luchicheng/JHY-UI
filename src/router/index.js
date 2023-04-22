import Vue from 'vue'
import VueRouter from 'vue-router'
import PortalHome from '../views/PortalHome.vue'

import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Blog from '../views/Blog.vue'
import Contact from '../views/Contact.vue'
import ShoppingHome from '../views/ShoppingHome.vue'
import ProductDetail from '@/components/ProductDetail/Index'
import PreCheckout from '@/components/Checkout/PreCheckout'
import Checkout from '@/components/Checkout/Checkout'
import Register from '@/components/Users/Register'
import Login from '@/components/Login'
import MyInfo from '@/components/Users/MyInfo'
import MyCredentials from '@/components/Users/MyCredentials'
import PaymentSuccess from '@/components/shopping/PaymentSuccess'
import MyOrders from '@/components/MyOrders/Index'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'PortalHome', component: PortalHome },
  { path: '/shopping', name: 'ShoppingHome', component: ShoppingHome },
  { path: '/about', name: 'About', component: About },
  { path: '/services', name: 'Services', component: Services },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/product/:productId/detail', name: 'ProductDetail', component: ProductDetail },
  { path: '/category/:category/filter', name: 'Category', component: ShoppingHome },
  { path: '/precheckout', name: 'precheckout', component: PreCheckout },
  { path: '/checkout', name: 'checkout', component: Checkout },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/myInfo', name: 'MyInfo', component: MyInfo },
  { path: '/myCredentials', name: 'MyCredentials', component: MyCredentials },
  { path: '/paymentSuccess', name: 'PaymentSuccess', component: PaymentSuccess },
  { path: '/MyOrders', name: 'MyOrders', component: MyOrders },
  { path: '*', redirect: 'PortalHome' }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
