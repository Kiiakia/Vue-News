<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="新闻管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 新闻列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column label="分类">
          <template #default="scope">
            {{ formatCatagory(scope.row.catagory) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="2"
              :inactive-value="1"
              @change="handleSwitchChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="warning"
              :icon="Star"
              circle
              @click="handlePriview(scope.row)"
            />
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="handleEdit(scope.row)"
            />
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="新闻预览" width="60%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <p style="font-size: 12px">
          {{ formatTime.getTime(previewData.editTime) }}
        </p>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="previewData.content" class="content"></div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import { Delete, Edit, Star, StarFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const previewData = ref({});
const dialogVisible = ref(false);
const tableData = ref([]);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const author = store.state.userInfo.username;
  const res = await axios.get("/adminapi/news/list", {
    params: { author },
  });
  tableData.value = res.data.data;
};

// 格式化分类方式
const formatCatagory = (catagory) => {
  // 1 最新动态 2 典型案例 3 通知公告
  const catagoryName = ["最新动态", "典型案例", "通知公告"];
  return catagoryName[catagory - 1];
};

// 处理发布按钮开关
const handleSwitchChange = async (item) => {
  await axios.put("/adminapi/news/publish", {
    _id: item._id,
    isPublish: item.isPublish,
  });
  await getTableData();
};

// 预览功能
const handlePriview = (data) => {
  previewData.value = data;
  dialogVisible.value = true;
};

// 删除功能
const handleDelete = async (data) => {
  let result = await axios.delete(`/adminapi/news/list/${data._id}`);
  if (result.data.ActionType === "OK") {
    await getTableData();
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

// 编辑功能
const handleEdit = (item) => {
  router.push(`/news-manage/newsedit/${item._id}`);
};
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
::v-deep .content {
  img {
    max-width: 100%;
  }
}
</style>