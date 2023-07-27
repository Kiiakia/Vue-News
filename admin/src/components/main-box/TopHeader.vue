<template>
  <el-header>
    <div class="left">
      <el-icon @click="changeMenuCollapsed"><Menu /></el-icon>
      <span>新闻后台管理网站</span>
    </div>
    <div class="right">
      <span>欢迎admin登录</span>
      <el-dropdown>
        <el-icon :size="25"><User /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeToCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Menu, User } from "@element-plus/icons-vue";
const store = useStore();
const router = useRouter();
let changeMenuCollapsed = function () {
  store.commit("changeMenuCollapsed");
};
let changeToCenter = function() {
    router.push({
        path:'/center'
    });
};
let logout = function() {
    localStorage.removeItem('token');
    router.push({
        path:'/login'
    });
};
</script>
<style lang="scss">
.el-header {
    background-color: #2d3a4b;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px !important;
}
.left {
    display: flex;
    align-items: center;
    span {
        margin-left: 20px;
    }
}
.right {
    display: flex;
    align-items: center;
    span {
        margin-right: 20px;
    }
}
</style>
