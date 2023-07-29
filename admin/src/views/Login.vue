<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
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
          <el-input
            v-model="loginForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.number="loginForm.password"
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
  </div>
</template>
<script setup>
import { loadFull } from "tsparticles";
import { reactive, ref } from "vue";
import router from "../router/index";
import axios from 'axios'
import { ElMessage } from 'element-plus'

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
      axios.post('/adminapi/user/login', loginForm)
        .then(
          res => {
            console.log(res.data)
            if(res.data.ActionType == 'OK') {
              router.push({
                path: "index",
              });
            }else {
              ElMessage({
                showClose: true,
                message: '用户名与密码不匹配',
                type: 'error',
              })
            }
          }
        );
    } else {
      // loginFormRef.resetFields();
      return false;
    }
  });
};

const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
const particlesInit = async (engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
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