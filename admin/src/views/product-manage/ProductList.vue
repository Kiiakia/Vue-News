<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="产品管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 产品列表 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" />
        <el-table-column prop="introduction" label="简要描述" />
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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

   
  </div>
</template>
  <script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const tableData = ref([]);
onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const author = store.state.userInfo.username;
  const res = await axios.get("/adminapi/product/list", {
    params: { author },
  });
  tableData.value = res.data.data;
};


// 删除功能
const handleDelete = async (data) => {
  let result = await axios.delete(`/adminapi/product/list/${data._id}`);
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
  router.push(`/product-manage/productedit/${item._id}`);
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