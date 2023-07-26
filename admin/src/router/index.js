import {createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login';
import MainBox from '../views/MainBox';
import NotFound from '../views/not-found/NotFound'
import store from '@/store';
import routerConfig from './config';

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/mainbox',
    name:'mainBox',
    component:MainBox
  },
  {
    // 匹配所有不正确的路由
    path:'/:pathMatch(.*)*',
    name:'notFound',
    component:NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态路由配置更新
const setRouterConfig = function() {
  routerConfig.forEach(item => {
    router.addRoute('mainBox', item);
  });
  // 第一次之后改变GetterRouter的值
  store.commit('changeGetterRouter', true);
}

// 路由守卫 ———— 有一些路由只有在登录状态才能看见 管理员与普通用户的也不相同
router.beforeEach(
  (to, from, next) => {
    if(to.name === 'login') {
      next();
    }else {
      // 根据token判断是否登录
      if(!localStorage.getItem('token')) {
        // 没有登录，重定向到登录页面
        next({
          name:'login'
        });
      }else{
        // 登录成功
        if(!store.state.isGetterRouter){
          // 第一次登录，动态配置路由
          setRouterConfig();
          next({
            path:to.fullPath
          });
        }else{
          next();
        }
      }
    }
  }
)

 


export default router
