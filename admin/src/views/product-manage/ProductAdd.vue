<template>
  <div>
    <el-page-header :icon="null" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加产品 </span>
      </template>
    </el-page-header>
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-position="right"
      label-width="auto"
      status-icon
    >
      <el-form-item label="产品标题" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要介绍" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细介绍" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload
          :avatar="productForm.cover"
          @change="handleCoverChange"
        ></Upload>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm">编辑产品信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
  author: store.state.userInfo.username,
});
const productFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入简要介绍", trigger: "blur" },
  ],
  detail: [{ required: true, message: "请输入详细介绍", trigger: "blur" }],
  cover: [{ required: true, message: "请选择产品图片", trigger: "blur" }],
});

const handleCoverChange = (img) => {
  productForm.cover = URL.createObjectURL(img);
  productForm.file = img;
};
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(productForm);
        let res = await upload("/adminapi/product/add", productForm);
        if (res.ActionType === "OK") {
          router.push("/product-manage/productlist");
        }
    }
  });
};
</script>
  <style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}
</style>