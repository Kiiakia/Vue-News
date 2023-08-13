<template>
  <Particle></Particle>
  <div class="login">
    <h3>登录后台管理系统</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="80px"
      class="demo-loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import router from "../router/index";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import Particle from "@/components/particle/Particle.vue";

const store = useStore();
const loginFormRef = ref();

const loginForm = reactive({
  username: "",
  password: "",
});

const loginRules = reactive({
  username: [
    { required: true, message: "username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "password is required", trigger: "blur" },
  ],
});

const submitForm = function (loginFormRef) {
  loginFormRef.validate((valid) => {
    if (valid) {
      // 提交表单
      // 这里原本应该是验证登录操作，登陆成功后再进行下列操作
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        if (res.data.ActionType == "OK") {
          // console.log(res.data);
          store.commit("changeUserInfo", res.data.data);
          // 每次重新登录，都重新配置路由 —— 目的是为了权限认证此路由是否存在
          store.commit("changeGetterRouter", false);
          router.push({
            path: "index",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "用户名与密码不匹配",
            type: "error",
          });
        }
      });
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 40%;
  height: 30%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;
  h3 {
    text-align: center;
    font-size: x-large;
    margin-bottom: 20px;
  }
}
::v-deep .el-form-item__label {
  color: white;
}
</style>