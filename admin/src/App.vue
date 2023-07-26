<template>
  <!-- 路由页面存放处 -->
  <router-view/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
// 全局滚动条的设置
::-webkit-scrollbar {
  width: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: hsla(209, 100%, 55%, 0.801);
}
</style>
