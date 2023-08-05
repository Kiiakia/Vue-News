<template>
  <div>
    <el-page-header :icon="null" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
    </el-page-header>
    <el-card>
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
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" type="password"/>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select
                v-model="userForm.role"
                style="width: 100%"
                placeholder="角色"
              >
                <el-option
                  v-for="item in roleOptions"
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
                >添加用户</el-button
              >
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>
<script setup>
import Upload from '@/components/upload/Upload.vue';
import upload from "@/util/upload"
import { ref,  reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const userFormRef = ref();
const userForm = reactive({
    username:'',
    password:'',
    role:2, // 1:管理员 2:编辑
    introduction:'',
    avatar:'',
    sex:0,
    file:null
});
const userFormRules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    role: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入自我介绍", trigger: "blur" }],
    avatar: [{ required: true, message: "请选择图片", trigger: "blur" }],
});
const roleOptions = [
    {
        label:'管理员',
        value:1
    },
    {
        label:'编辑',
        value:2
    }
];
const handleImgChange = (img) => {
  userForm.avatar = URL.createObjectURL(img);
  userForm.file = img;
};
const submitForm = () => {
    userFormRef.value.validate(
        async(valid) => {
            if(valid) {
                // console.log(userForm);
                let res = await upload('/adminapi/user/add', userForm);
                router.push('/user-manage/userlist');
            }
        }
    )
}
</script>
<style lang="scss" scoped>
.el-card {
    margin-top: 30px;
}
</style>