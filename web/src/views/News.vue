<template>
  <div class="container">
    <div
      :style="{ backgroundImage: `url(${require('@/assets/news.jpg')})` }"
      class="newsbg"
    ></div>
    <div class="text">
      <h1>新闻资讯</h1>
      <br />
      <br />
      <p>为您推荐公司和行业的前沿资讯，让您随时了解行业动态！</p>
    </div>
  </div>
  <div class="search">
    <el-popover
      placement="bottom"
      title="检索结果"
      width="50%"
      :visible="visible"
    >
      <template #reference>
        <el-input
          v-model="searchText"
          class="w-50 m-2"
          placeholder="请输入新闻标题关键字"
          :prefix-icon="Search"
          size="large"
          @input="visible = true"
          @blur="visible = false"
        />
      </template>
      <div v-if="searchNewsList.length">
        <div
          v-for="item in searchNewsList"
          :key="item._id"
          class="search-item"
          @click="handleChangePage(item._id)"
        >
          {{ item.title }}
        </div>
      </div>
      <div v-else>
        <el-empty description="没有此新闻" :image-size="50" />
      </div>
    </el-popover>
  </div>
  <div class="top-news">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in topNewsList" :key="item._id">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
          @click="handleChangePage(item._id)"
        >
          <div
            class="card-img"
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
            }"
          ></div>
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom">
              {{ whichTime(item.editTime) }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-tabs v-model="tabName" class="demo-tabs">
    <el-tab-pane
      v-for="item in tabList"
      :key="item.value"
      :label="item.label"
      :name="item.name"
    >
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card
            class="tab-card"
            :body-style="{ padding: '0px' }"
            v-for="data in tabsNewsList[item.name]"
            :key="data._id"
            shadow="hover"
            @click="handleChangePage(data._id)"
          >
            <div
              class="tab-img"
              :style="{
                backgroundImage: `url(http://localhost:3000${data.cover})`,
              }"
            ></div>
            <div style="padding: 14px; float: left">
              <span>{{ data.title }}</span>
              <div class="tab-time">
                {{ whichTime(data.editTime) }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-timeline>
            <el-timeline-item
              v-for="(data, index) in tabsNewsList[item.name]"
              :key="index"
              :timestamp="whichTime(data.editTime)"
            >
              {{ data.title }}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>

  <el-backtop :right="50" :bottom="50" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
moment.locale("zh-cn");
const searchText = ref("");
const newsList = ref([]);
const visible = ref(false);
const tabName = ref(1);
const tabList = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

onMounted(async () => {
  let res = await axios.get("/webapi/news/list");

  newsList.value = res.data.data;
  //   console.log(_.groupBy(newsList.value, item => item.catagory));
});

const searchNewsList = computed(() =>
  searchText.value
    ? newsList.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topNewsList = computed(() => newsList.value.slice(0, 4));
const whichTime = (time) => {
  return moment(time).format("lll");
};

const tabsNewsList = computed(() =>
  _.groupBy(newsList.value, (item) => item.catagory)
);

const handleChangePage = (id) => {
  router.push(`/news/${id}`)
};
</script>
<style lang="scss" scoped>
.newsbg {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position-y: bottom;
}
.text {
  position: absolute;
  top: 120px;
  width: 100%;
  text-align: center;
  color: white;
  h1 {
    font-size: xxx-large;
  }
  p {
    font-size: x-large;
  }
}
.search {
  position: absolute;
  top: 340px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
::v-deep .search-item {
  margin: 5px 0 5px 5px;
  padding-left: 5px;
  &:hover {
    background-color: aliceblue;
    color: blue;
  }
}
.top-news {
  margin: 20px;
  .card-img {
    width: 100%;
    height: 200px;
    background-size: cover;
  }
  .bottom {
    font-size: 14px;
    color: grey;
    float: left;
  }
}

.demo-tabs {
  margin-left: 20px;
}
.tab-card {
  margin: 10px;
}
.tab-img {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
.tab-time {
  font-size: 14px;
  color: grey;
}
</style>