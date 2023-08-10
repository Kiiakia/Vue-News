<template>
  <el-menu
    :default-active="route.fullPath"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item v-for="item in navRouter" :index="item.path" :key="item.path">
        {{ item.name }}
    </el-menu-item>
    <el-menu-item index="" @click="handleLogin">
        登录
    </el-menu-item>
  </el-menu>
  <div class="right">
    新闻展示网站
  </div>
</template>
<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
const navRouter = [
    {
        path:'/',
        name:'首页'
    },
    {
        path:'/news',
        name:'新闻中心'
    },
    {
        path:'/product',
        name:'产品与服务'
    },
]
const handleLogin = () => {
    window.location = 'http://localhost:8000'
}
</script>
<style lang="scss" scoped>
.el-menu-demo {
    position: sticky;
    top: 0px;
    z-index: 1000;
}
.right {
    position: fixed;
    top: 0;
    right: 50px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000;
}
</style>

