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
router.push('/home');
router.beforeEach(async (to, from, next) => {
  if(to.path !== '/login'){
    try{
      const {data} = await axios.get('/users/checktoken?token='+localStorage.getItem('token'));
      if(data.code !== 0){
        throw new Error('token失效');
      }
      else{
        const {data} = await axios.get('/users/accountinfo?id='+localStorage.getItem('id'));
        useAccountInfoStore().setAccountInfo(data.accountInfo);
      }
    }
    catch(e){
      console.error(e);
      next('/login');
      return;
    }
  }
  next();
})
</script>

<style lang='less' scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>