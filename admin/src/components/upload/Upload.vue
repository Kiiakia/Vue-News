<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleImgChange"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script setup>
import {defineEmits, defineProps, computed} from 'vue'
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({
    avatar:String
})
const emit = defineEmits(["change"])
let uploadAvatar = computed(() => {
  return props.avatar.includes('blob')
    ? props.avatar
    : 'http://localhost:3000'+props.avatar;
});

const handleImgChange = (img) => {
  emit('change', img.raw)
};
</script>
<style lang="scss" scoped>

::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>