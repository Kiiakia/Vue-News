<template>
  <el-aside
    :width="store.state.isMenuCollapsed ? '64px' : '200px'"
    class="aside"
  >
    <!-- 原本给el-aside也设置了高度，导致要不是滚动条不出现，要不就是里面菜单高度不够100vh，去除el-aside的高度之后，恢复正常，猜测原因，外面和里面都设置了高度的话，滚动条高度超过max-height，但是不能超过包裹它的容器，所以失效了 -->
    <el-scrollbar max-height="100vh">
      <!-- 这里也有一个bug 不知道为什么 用类添加不会被覆盖 ！高度过高 -->
        <!-- el-menu-item is-active -->
      <el-menu
        :router="true"
        class="menu"
        :collapse="store.state.isMenuCollapsed"
        :collapse-transition="false"
        :default-active="router.currentRoute.value.fullPath"
      >
        <el-menu-item
          v-for="config in menuNoChildren"
          :key="config.path"
          :index="config.path"
        >
          <el-icon><component :is="config.icon.icon" /></el-icon>
          <span>{{ config.label }}</span>
        </el-menu-item>
        <!-- 为什么刚开始的时候折叠一个，其他的全部折叠，原因，刚开始的index使用了path属性，但是这里原本没有path属性，都是underfined，都一样，所以全部同时展开，同时折叠 -->
        <el-sub-menu
          v-for="config in menuHasChildren"
          :key="config.path"
          :index="config.path"
        >
          <template #title>
            <el-icon><component :is="config.icon.icon" /></el-icon>
            <span>{{ config.label }}</span>
          </template>
          <el-menu-item
            v-for="childConfig in config.children"
            :key="childConfig.path"
            :index="childConfig.path"
            style="height: 65px"
          >
            {{ childConfig.label }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";
// vue3 中获取router
import { useRouter } from "vue-router";
// vue3 中的 useStore ===vue2.0中的this.$store
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
console.log(router.currentRoute.value.fullPath);

const menuConfig = [
  {
    name: "home",
    path: "/index",
    icon: { icon: HomeFilled, text: "首页" },
    label: "首页",
  },
  {
    name: "center",
    path: "/center",
    icon: { icon: Avatar, text: "个人中心" },
    label: "个人中心",
  },
  {
    name: "usermanage",
    path:'/user-manage',
    icon: { icon: UserFilled, text: "用户管理" },
    label: "用户管理",
    children: [
      {
        name: "userAdd",
        path: "/user-manage/useradd",
        label: "添加用户",
      },
      {
        name: "userList",
        path: "/user-manage/userlist",
        label: "用户列表",
      },
    ],
  },
  {
    name: "newsmanage",
    path:'/news-manage',
    icon: { icon: Reading, text: "新闻管理" },
    label: "新闻管理",
    children: [
      {
        name: "newsAdd",
        path: "/news-manage/newsadd",
        label: "添加新闻",
      },
      {
        name: "newsList",
        path: "/news-manage/newslist",
        label: "新闻列表",
      },
    ],
  },
  {
    name: "productmanage",
    path:'/product-manage',
    icon: { icon: Pointer, text: "产品管理" },
    label: "产品管理",
    children: [
      {
        name: "productAdd",
        path: "/product-manage/productadd",
        label: "添加产品",
      },
      {
        name: "productList",
        path: "/product-manage/productlist",
        label: "产品列表",
      },
    ],
  },
];
const menuNoChildren = menuConfig.filter((index) => !index.children);
const menuHasChildren = menuConfig.filter((index) => index.children);
// 为啥下面的不行？？ 因为一旦解析之后，里面的实际上就是一个字面量，根本不会改变，更别说监听到了
// let isCollapsed = ref(store.state.isMenuCollapsed);
</script>
<style lang="scss">
.menu {
  min-height: 100vh;
}

</style>