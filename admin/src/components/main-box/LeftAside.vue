<template>
  <el-aside :width="store.state.isMenuCollapsed ? '70px' : '200px'" class="aside">
    <!-- 这里也有一个bug 不知道为什么 用类添加不会被覆盖 ！高度过高 -->
    <el-menu :router="true" class="menu" :collapse="store.state.isMenuCollapsed"  :collapse-transition="false">
        <el-menu-item v-for="config in menuNoChildren" :key="config.path" :index="config.path">
          <el-icon><component :is="config.icon.icon"/></el-icon>
          <span>{{ config.label }}</span>
      </el-menu-item>
      <!-- 为什么刚开始的时候折叠一个，其他的全部折叠，原因，刚开始的index使用了path属性，但是这里原本没有path属性，都是underfined，都一样，所以全部同时展开，同时折叠 -->
      <el-sub-menu v-for="config in menuHasChildren" :key="config.name" :index="config.name">
        <template #title>
            <el-icon><component :is="config.icon.icon"/></el-icon>
            <span>{{config.label}}</span>
        </template>
        <el-menu-item-group v-for="childConfig in config.children" :key="childConfig.path">
          <el-menu-item :index="childConfig.path" style="height: 50px;">{{ childConfig.label }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import {HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer} from '@element-plus/icons-vue'
import {ref} from 'vue'
// vue3 中的 useStore ===vue2.0中的this.$store
import {useStore} from 'vuex'
const store = useStore();

const menuConfig = [
    {
        name:'home',
        path:'/index',
        icon:{ icon:HomeFilled, text:'首页'},
        label:'首页'
    },
    {
        name:'center',
        path:'/center',
        icon:{ icon:Avatar, text:'个人中心'},
        label:'个人中心'
    },
    {
        name:'usermanage',
        icon:{ icon:UserFilled, text:'用户管理'},
        label:'用户管理',
        children:[
            {
                name:'userAdd',
                path:'/user-manage/useradd',
                label:'添加用户'
            },
            {
                name:'userList',
                path:'/user-manage/userlist',
                label:'用户列表'
            },
        ]
    },
    {
        name:'newsmanage',
        icon:{ icon:Reading, text:'新闻管理'},
        label:'新闻管理',
        children:[
            {
                name:'newsAdd',
                path:'/news-manage/newsadd',
                label:'添加新闻'
            },
            {
                name:'newsList',
                path:'/news-manage/newslist',
                label:'新闻列表'
            },
        ]
    },
    {
        name:'productmanage',
        icon:{ icon:Pointer, text:'产品管理'},
        label:'产品管理',
        children:[
            {
                name:'productAdd',
                path:'/product-manage/productadd',
                label:'添加产品'
            },
            {
                name:'productList',
                path:'/product-manage/productlist',
                label:'产品列表'
            },
        ]
    },
]
const menuNoChildren = menuConfig.filter(index => !index.children);
const menuHasChildren = menuConfig.filter(index => index.children);

// 为啥下面的不行？？ 因为一旦解析之后，里面的实际上就是一个字面量，根本不会改变，更别说监听到了
// let isCollapsed = ref(store.state.isMenuCollapsed);
</script>
<style lang="scss">
.aside {
    height: 100vh;
    .menu {
        height: 100vh;
    }
}
</style>