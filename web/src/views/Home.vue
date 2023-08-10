<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item :key="1">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home1.jpg')})` }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home2.jpg')})` }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/home3.jpg')})` }"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="text">互联网+ 时代</div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 40px;
  }
  .el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}
</style>
