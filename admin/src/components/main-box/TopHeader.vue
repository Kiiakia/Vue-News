<template>
    <el-header>
        <button @click="changeMenuCollapsed">Collapsed</button>
        Header
    </el-header>
</template>
<script setup>
import {useStore} from 'vuex'
const store = useStore();
let changeMenuCollapsed = function() {
    store.commit('changeMenuCollapsed');
}
</script>