<template>
  <div>
    <el-page-header :icon="null" title="新闻后台管理网站">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>

    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-avatar :size="100" :src="userAvatarUrl" />
        </el-col>
        <el-col :span="14">
          <h3 style="line-height: 100px">
            欢迎 {{ store.state.userInfo?.username }} 登录!
            {{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>产品展示</span>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in loopData" :key="item._id">
          <div
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
              backgroundSize: 'cover'
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const loopData = ref([]);
let userAvatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
let welcomeText = computed(() => {
  return new Date().getHours() <= 14
    ? "早上好，祝您工作愉快。"
    : "下午好，喝杯咖啡提提神吧。";
});

onMounted(() => {
  getData();
});

const getData = async () => {
  const author = store.state.userInfo.username;
  const res = await axios.get("/adminapi/product/list", {
    params: { author },
  });
  loopData.value = res.data.data;
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 30px;
}
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

</style>