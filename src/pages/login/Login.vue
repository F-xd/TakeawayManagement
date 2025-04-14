<template>
  <div class='login'>
    <h1>系统登录</h1>
    <form>
      <div><i class="iconfont icon-zhanghu"></i><input v-model="account" type="text" placeholder="请输入账号"></div>
      <div><i class="iconfont icon-suoding"></i><input v-model="password" type="password" placeholder="请输入密码"></div>
      <button @click="login">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from '@axios';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const account = ref('');
const password = ref('');
const login = async()=>{
  if(!account.value || !password.value){
    ElMessage.error('账号或密码不能为空');
    return;
  }
  const {data}= await axios.post('/users/checkLogin',{account:account.value,password:password.value});
  if(data.code!==0){
    ElMessage.error(data.msg);
    account.value='';
    password.value='';
    return;
  }
  localStorage.setItem('token',data.token);
  localStorage.setItem('id',data.id);
  ElMessage.success('登录成功');
  router.push('/home');
}
</script>

<style lang='less' scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;

  >h1 {
    color: #fff;
    font-size: 28px;
  }
  form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 220px;
    >div{
      display: flex;
      align-items: center;
      width: 400px;
      height: 32px;
      margin-top: 20px;
      box-sizing: border-box;
      background-color: #242e3c;
      border-radius: 5px;
      border: 1px solid #dcdfe6;
      i{
        color: #c0c4cc;
        font-size: 12px;
        padding: 0 5px;
      }
      input{
        flex: 1 1 auto;
        border: none;
        background-color: transparent;
        outline: none;
        color: white;
        caret-color: white;
        &::placeholder{
          color: #c0c4cc;
        }
      }
      &:has(input:focus){
        
        border: #409eff 1px solid;
      }
    }
    button{
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: #409eff;
      color: white;
      font-size: 12px;
      display: flex;
      justify-content: center; 
      align-items: center;
    }
  }
  
}
</style>