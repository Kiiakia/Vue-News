<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="用户管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 用户列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="`http://localhost:3000${scope.row.avatar}`"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <div v-if="scope.row.role === 1">
              <el-tag class="ml-2" type="danger">管理员</el-tag>
            </div>
            <div v-else>
              <el-tag class="ml-2" type="success">编辑</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="用户编辑" width="50%">
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
          <el-input v-model="userForm.password" type="password" />
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
const tableData = ref([]);
let dialogVisible = ref(false);
const userFormRef = ref();
const userForm = reactive({
    username:'',
    password:'',
    role:2, // 1:管理员 2:编辑
    introduction:'',
});
const userFormRules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    role: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入自我介绍", trigger: "blur" }],
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

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  let result = await axios.get("/adminapi/user/list");
  //   console.log(result.data.data);
  tableData.value = result.data.data;
};

// 点击操作中的编辑按钮
const handleEdit = async (data) => {
  console.log(data);
  // 显示对话框
  dialogVisible.value = true;
  // 展示数据, 之前没有返回密码，现在重新获取
  let result = await axios.get(`/adminapi/user/list/${data._id}`);
  Object.assign(userForm, result.data.data[0]);
};
// 编辑对话框中的确认操作
const confirmEdit = () => {
    userFormRef.value.validate(async(valid) => {
        if(valid) {
            // 上传数据到后端
            let result = await axios.put(`/adminapi/user/list/${userForm._id}`,userForm);
            if (result.data.ActionType === "OK") {              
                // 关闭对话框
                dialogVisible.value = false;
                // 页面数据更新
                await getTableData();
            } else {
                ElMessage({
                    message: "编辑失败",
                    type: "error",
                });
            }
        }
    })
    
}

const handleDelete = async (data) => {
  console.log(data);
  let result = await axios.delete(`/adminapi/user/list/${data._id}`);
  if (result.data.ActionType === "OK") {
    // reload pages
    // reload data
    await getTableData();
    // 手动修改数据
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    });
  }
};
</script>
<style lang="scss" scoped>
.el-table {
    margin-top: 30px;
}
</style>