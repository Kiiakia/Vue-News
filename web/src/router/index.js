import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home'
import News from '../views/News'
import New from '../views/New'
import Product from '../views/Product'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/news/:id',
    name: 'new',
    component: New
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((from, to, next) => {
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router
