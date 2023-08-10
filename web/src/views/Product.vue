<template>
  <el-carousel
    height="calc(100vh - 59px)"
    direction="vertical"
    :autoplay="false"
    v-if="loopList.length"
  >
    <el-carousel-item v-for="item in loopList" :key="item._id">
      <div
        class="pro-img"
        :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 18px;">{{ item.title }}</span>
              <div style="margin-top: 18px;">{{ item.introduction }}</div>
            </div>
          </template>
          <div>{{ item.detail }}</div>
        </el-card>
      </div>
    </el-carousel-item>
  </el-carousel>
  <el-empty description="暂无产品" v-else />
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const loopList = ref([]);
onMounted(async () => {
  const res = await axios.get("/webapi/product/list");
  // console.log(res.data)
  loopList.value = res.data.data;
});
</script>
<style scoped lang="scss">
.pro-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    .box-card {
        background-color: rgba(255,255,255,0.7);
        width: 50%;
        height: 100%;
        border: none;
        border-radius: 0;
    }
}
</style>