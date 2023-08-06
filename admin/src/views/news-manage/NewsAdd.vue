<template>
  <div>
    <el-page-header :icon="null" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 新增新闻 </span>
      </template>
    </el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-position="right"
      label-width="auto"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor @contentChange="contentChange" ></Editor>
      </el-form-item>
      <el-form-item label="类别" prop="catagory">
        <el-select
          v-model="newsForm.catagory"
          style="width: 100%"
          placeholder="类别"
        >
          <el-option
            v-for="item in catagoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <Upload :avatar="newsForm.cover" @change="handleCoverChange"></Upload>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm">编辑新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Editor from "@/components/editor/Editor";
import Upload from '@/components/upload/Upload.vue';
import upload from "@/util/upload"
import { useRouter } from "vue-router";
import {useStore} from 'vuex'

const router = useRouter();
const store = useStore();
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  catagory: 1, // 1 最新动态 2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 1, // 1 未发布 2 已发布
  author:store.state.userInfo.username
});
const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  catagory: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请选择图片", trigger: "blur" }],
});
const catagoryOptions = [
  {
    value: 1,
    label: "最新动态",
  },
  {
    value: 2,
    label: "典型案例",
  },
  {
    value: 3,
    label: "通知公告",
  },
];
const contentChange = (data) => {
  console.log(data);
  newsForm.content = data;
};
const handleCoverChange = (img) => {
  newsForm.cover = URL.createObjectURL(img);
  newsForm.file = img;
};
const submitForm = () => {
    newsFormRef.value.validate(
        async(valid) => {
            if(valid) {
                console.log(newsForm);
                let res = await upload('/adminapi/news/add', newsForm);
                if(res.ActionType === 'OK'){
                    router.push('/news-manage/newslist');
                }
            }
        }
    )
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}

</style>