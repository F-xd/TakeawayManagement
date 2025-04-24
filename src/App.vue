<template>
  <div class='app'>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from '@axios';
import { useAccountInfoStore } from './stores/accountinfo';
const router = useRouter();
// 自动访问首页
router.push('/home');

</script>

<style lang='less' scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>