<template>
  <div class="accountCenter">
    <Title title="个人中心"></Title>
    <div class="contanier">
      <el-descriptions
        title="管理员信息"
        direction="vertical"
        border
        size="large"
        style="margin-top: 20px"
      >
        <el-descriptions-item
          :rowspan="2"
          :width="200"
          label="头像"
          align="center"
        >
        <el-upload
          class="avatar-uploader"
          :action="axios.defaults.baseURL + '/users/avatar_upload?id='+ userInfo.id"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="axios.defaults.baseURL + userInfo.imgUrl" :src="axios.defaults.baseURL + userInfo.imgUrl" class="avatar" />
        </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="管理员Id">{{ userInfo.id }}</el-descriptions-item>
        <el-descriptions-item label="账户">{{ userInfo.account }}</el-descriptions-item>
        <el-descriptions-item label="用户组">{{ userInfo.userGroup }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ userInfo.ctime?.slice(0,10) }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
  import { ref,reactive } from 'vue'
  import axios from '@axios';
  import Title from '../../../../components/Title.vue';
  import {ElMessage } from 'element-plus';
  import { useAccountInfoStore } from '../../../../stores/accountinfo';
  const userInfo = reactive({});
  const getData = async ()=>{
    const {data:{accountInfo}} = await axios.get('/users/accountinfo?id='+localStorage.getItem('id'));
    useAccountInfoStore().setAccountInfo(accountInfo);
    userInfo.account = accountInfo.account;
    userInfo.id = accountInfo.id;
    userInfo.imgUrl = accountInfo.imgUrl;
    userInfo.ctime = accountInfo.ctime;
    userInfo.userGroup = accountInfo.userGroup;
  }
  getData();
  const handleAvatarSuccess = async (res, file,aa) => {
    if(res.code === 0){
      ElMessage.success('上传成功');
      getData();
    }else{
      ElMessage.error('上传失败');
    }
  }
</script>
<style scoped lang="less">
.contanier{
  padding: 15px;
}
.avatar-uploader {
  width: 200px;
  height: 200px;
  border: 2px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}


.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片的宽高比并覆盖整个容器 */
}
</style>