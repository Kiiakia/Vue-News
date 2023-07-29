<template>
    <div>
        Home
    </div>
</template>

<script setup>
import axios from 'axios'
axios.get('/adminapi/user').then(
    res => console.log(res.data)
)
</script>