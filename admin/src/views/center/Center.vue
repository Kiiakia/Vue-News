<template>
  <div>
    <el-page-header :icon="null" title="新闻后台管理网站">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>
    <el-row class="el-row" :gutter="20">
      <el-col :span="8">
        <el-card class="card">
          <el-avatar :size="100" :src="userAvatarUrl" />
          <h2>{{ store.state.userInfo?.username }}</h2>
          <h3>
            {{ store.state.userInfo?.role == 1 ? "管理员" : "普通用户" }}
          </h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>

          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-position="right"
            label-width="auto"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="userForm.sex"
                style="width: 100%"
                placeholder="性别"
              >
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @change="handleImgChange"></Upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm"
                >更新</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import Upload from '../../components/upload/Upload'
import { computed } from "vue";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import upload from "@/util/upload"
const store = useStore();
let userAvatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? 'http://localhost:3000'+store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});

const userFormRef = ref();
const user = store.state.userInfo;
const userForm = reactive({
  username: user.username,
  sex: user.sex,
  introduction: user.introduction,
  avatar: user.avatar,
  file: null,
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入自我介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请选择图片", trigger: "blur" }],
});
const sexOptions = [
  {
    value: 0,
    label: "保密",
  },
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },
];
const handleImgChange = (img) => {
  userForm.avatar = URL.createObjectURL(img);
  userForm.file = img;
};
const submitForm = () => {
    // 这里要加value
    userFormRef.value.validate(
        async(valid) => {
            if(valid) {
                let res = await upload('/adminapi/user/update', userForm);
                if(res.ActionType === 'OK') {
                  store.commit('changeUserInfo', res.data)
                  ElMessage({
                    message:'更新成功',
                    type:'success'
                  })
                }
                 
            }
        }
    )
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
  .card {
    text-align: center;
  }
}
</style>