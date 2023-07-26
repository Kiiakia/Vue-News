<template>
    <el-container>
      <LeftAside/>
      <el-container direction="vertical">
        <TopHeader/>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import TopHeader from '../components/main-box/TopHeader.vue';
import LeftAside from '../components/main-box/LeftAside.vue'
</script>