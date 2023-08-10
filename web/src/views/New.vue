<template>
  <el-row>
    <el-col :span="15" :offset="1">
      <h1>{{ currentNews.title }}</h1>
      <div class="time">{{ whichTime(currentNews.editTime) }}</div>
      <div v-html="currentNews.content" class="content"></div>
    </el-col>
    <el-col :span="5" :push="1" :pull="2">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNews"
          :key="item._id"
          class="card-item"
          @click="handleChangePage(item._id)"
        >
          <div>{{ item.title }}</div>
          <div class="news-time">
            {{ whichTime(item.editTime) }}
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, watchEffect, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

moment.locale("zh-cn");
const route = useRoute();
const router = useRouter();
const currentNews = ref({});
const topNews = ref([]);

const stop = watchEffect(async () => {
  const id = route.params.id;
  if (!id) return;
  const res1 = await axios.get(`/webapi/news/list/${id}`);
  const res2 = await axios.get("/webapi/news/toplist?limit=4");

  console.log(res2.data);
  currentNews.value = res1.data.data[0];
  topNews.value = res2.data.data;
});

onBeforeUnmount(() => {
  stop();
});

const whichTime = (time) => {
  return moment(time).format("lll");
};

const handleChangePage = (id) => {
  router.push(`/news/${id}`);
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 14px;
  color: grey;
  margin-top: 10px;
  margin-bottom: 30px;
}
::v-deep .content {
  img {
    max-width: 100%;
  }
}

.card-item {
  padding: 2px 5px;
  margin: 3px 0;
  &:hover {
    background-color: aliceblue;
    color: blue;
  }
}
.news-time {
  font-size: 14px;
  color: grey;
}
</style>