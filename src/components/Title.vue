<template>
  <div class='title'>
    <div class="title-text">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<style lang='less' scoped>
.title {
  width: auto;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1.5px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-text {
    font-size: 20px;
    line-height: 50px;
    color: #333333;
  }
}
</style>