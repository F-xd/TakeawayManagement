<template>
  <div class='className'>
    <h1>你访问了一个错误页面</h1>
    <h2>页面将在{{ time }}秒后自动跳转</h2>
    <span @click="router.go(-1)">返回上一页</span>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const time = ref(3);
const timer = setInterval(() => {
    time.value--;
    if (time.value === 0) {
        clearInterval(timer);
        router.go(-1);
    }
}, 1000);
</script>

<style lang='less' scoped>
.className {
    span{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
            color: blue;
        }
    }
}
</style>