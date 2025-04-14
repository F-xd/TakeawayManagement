<template>
    <el-dropdown  @command="handleCommand" class="welcome">
      <span class="el-dropdown-link">
        欢迎{{ accountInfo.getAccountInfo().account }}登录
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
        <img :src="axios.defaults.baseURL+accountInfo.getAccountInfo().imgUrl" alt="">
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="1">个人中心</el-dropdown-item>
          <el-dropdown-item command="2">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  
  <script setup>
  import { ArrowDown } from '@element-plus/icons-vue'
  import { useAccountInfoStore } from '../stores/accountinfo';
  import axios from '@axios';
  import {useRouter} from 'vue-router';
  const router = useRouter();
  const accountInfo = useAccountInfoStore();
  const handleCommand = (command)=>{
    if(command === '1'){
        router.push('/accountCenter');
    }
    else if(command === '2'){
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        router.push('/login');
    }
  }
  </script>
  
  <style scoped>
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  .welcome {
    height: 40px;
    display: flex;
    align-items: center;
    >span{
        display: flex;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            margin-left: 10px;
            border-radius: 50%;
        }
    }
  }
  </style>