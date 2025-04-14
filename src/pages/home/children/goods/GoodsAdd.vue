<template>
  <div class="goodsAdd">
    <Title title="添加商品"></Title>
    <div class="container">
      <el-form ref="ruleFormRef"  :model="form" :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="form.category">
            <el-option v-for="item in categorieList" :label="item.cateName" :value="item.cateName" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item label="商品图片" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            :action="axios.defaults.baseURL + '/goods/goods_img_upload?id='+ form.id"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.imgUrl" :src="axios.defaults.baseURL + form.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon" color="#8c939d" size="40"><Plus/></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input v-model="form.goodsDesc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            添加
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Title from '../../../../components/Title.vue';
import axios from '@axios';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const ruleFormRef = ref()
const form = reactive({
  name: '',
  category: '',
  price: 0,
  imgUrl: '',
  goodsDesc: ''
})
const categorieList = reactive([]);
// 获取商品分类
const getData = async (currentPage, pageSize) => {
  const {data:{categories}} = await axios.get('/goods/categories');
  categorieList.splice(0,0,...categories);
}
getData();

// 上传图片成功回调
const handleAvatarSuccess = (res, file, fileList) => {
  form.imgUrl = res.imgUrl;
  console.log(form);
}


// 验证规则
const validatename = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入商品名称'))
  }
  else callback();
}
const validatecategory = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择商品分类'))
  } else callback();
}
const validateprice = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入商品价格'))
  } else callback();
}
const validateimgUrl = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请上传商品图片'))
  } else callback();
}
const validategoodsDesc = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入商品描述'))
  } else callback();
}
const rules = reactive({
  name: [{ validator: validatename, trigger: 'blur' }],
  category: [{ validator: validatecategory, trigger: 'change' }],
  price: [{ validator: validateprice, trigger: 'change' }],
  imgUrl: [{ validator: validateimgUrl, trigger: 'change' }],
  goodsDesc: [{ validator: validategoodsDesc, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      form.imgUrl = form.imgUrl.slice(23);
      const { data } = await axios.post('/goods/add', form);
      if(data.code === 0){
        formEl.resetFields()
        ElMessage.success('添加成功')
      }else{
        ElMessage.error(data.msg)
      }
    } else {
      ElMessage.error('请检查输入')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang='less' scoped>
.container {
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