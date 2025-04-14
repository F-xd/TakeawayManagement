<template>
  <div class='shopInfo'>
    <Title title="账号列表">
      <el-button type="primary" size="large" @click="()=>{handleEdit('','', false,true)}">保存店铺信息</el-button>
    </Title>
    <div class="container">
      <el-form ref="ruleFormRef" :model="form" label-width="auto" class="demo-ruleForm">
        <el-form-item label="店铺名称"  prop="name">
          <el-input v-model="form.name" type="text" />
        </el-form-item>
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input v-model="form.bulletin" type="textarea" />
        </el-form-item>
        <el-form-item label="店铺头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="axios.defaults.baseURL + '/shop/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="axios.defaults.baseURL + form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon" color="#8c939d" size="40"><Plus/></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="起送价格" prop="deliveryPrice">
          <el-input v-model="form.deliveryPrice" type="number" placeholder="请输入起送价格" autocomplete="off" />
        </el-form-item>
        <el-form-item label="送达时间" prop="deliveryTime">
          <el-input v-model="form.deliveryTime" type="text" placeholder="请输入送达时间" autocomplete="off" />
        </el-form-item>
        <el-form-item label="配送描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入配送描述" autocomplete="off" />
        </el-form-item>
        <el-form-item label="店铺好评率" prop="score">
          <el-input v-model="form.score" type="number" placeholder="请输入店铺好评率" autocomplete="off" />
        </el-form-item>
        <el-form-item label="店铺销量" prop="sellCount">
          <el-input v-model="form.sellCount" type="number" placeholder="请输入店铺销量" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动支持" prop="sellCount">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="单人精彩套餐" value="单人精彩套餐" />
            <el-checkbox label="VC无限橙果汁全场8折" value="VC无限橙果汁全场8折" />
            <el-checkbox label="在线支付满28减5" value="在线支付满28减5" />
            <el-checkbox label="特价饮品八折抢购" value="特价饮品八折抢购" />
            <el-checkbox label="中秋特惠" value="中秋特惠" />
            <el-checkbox label="国庆特价" value="国庆特价" />
            <el-checkbox label="春节1折折扣" value="春节1折折扣" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间" prop="date">
          <el-time-picker  v-model="form.date" is-range
          arrow-control range-separator="到" start-placeholder="开始时间"
            end-placeholder="结束时间" />
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Title from '../../../components/Title.vue';
import axios from '@axios';
import { Plus } from '@element-plus/icons-vue'

const form = reactive({
  id:'',
  name:'',
  bulletin:'',
  avatar:'',
  deliveryPrice:'',
  minPrice:'',
  deliveryTime:'',
  description:'',
  score:'',
  sellCount:'',
  supports:[],
  date:[],
  pics:[]
})


// 获取数据
const getData = async () => {
  const { data:{data} } = await axios.get('/shop/info');
  Object.assign(form, data);
  form.supports = [];
  form.date = [];
}
getData();

// 上传图片成功回调
const handleAvatarSuccess = (res, file, fileList) => {
  form.avatar = res.imgUrl;
  console.log(form);
}


// 保存店铺信息
const handleEdit = async(from)=>{
  const {data} = await axios.post('/shop/edit', form);
  console.log(data);
}
</script>

<style lang='less' scoped>
.container{
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