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
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleImgChange"
              >
                <img
                  v-if="userForm.avatar"
                  :src="userForm.avatar"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
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
import { computed } from "vue";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useFormItem } from "element-plus";
import axios from "axios";
const store = useStore();
let userAvatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});

console.log(store.state.userInfo);
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
  userForm.avatar = URL.createObjectURL(img.raw);
  userForm.file = img.raw;
};
const submitForm = () => {
    // 这里要加value
    userFormRef.value.validate(
        (valid) => {
            if(valid) {
                let params = new FormData();
                for(let i in userForm){
                    params.append(i, userForm[i]);
                }
                axios.post('/adminapi/user/update', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>