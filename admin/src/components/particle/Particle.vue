<template>
  <div class="particles-js-box">
    <div id="particles-js"></div>
  </div>
</template>
  
<script setup>
/// 使用了 particles.js 库
/// 也可以使用 particle-vue3 库
/* eslint-disable */
import particlesJS from "./particles.js";
import particlesConfig from "./particles.json";
import {onMounted} from 'vue';

onMounted(() => {
  particlesJS("particles-js", particlesConfig);
  document.body.style.overflow = "hidden";
})
</script>
  
<style scoped>
.particles-js-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
#particles-js {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}
</style>
  