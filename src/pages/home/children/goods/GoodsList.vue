<template>
  <div class="goodsList">
    <Title title="商品列表"></Title>
    <div class="container">
      <el-table :data="tableData.data" row-key="id" style="width: 100%">
        <el-table-column type="selection" width="48" />
        <el-table-column property="name" label="商品名称"></el-table-column>
        <el-table-column property="category" label="商品分类" />
        <el-table-column property="price" label="价格">
          <template #default="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="商品图片">
          <template #default="scope">
            <img :src="axios.defaults.baseURL + scope.row.imgUrl" style="width: 50px; height: 50px; object-fit: contain" />
          </template>
        </el-table-column>
        <el-table-column property="goodsDesc" label="商品描述" show-overflow-tooltip />
        <el-table-column label="创建时间">
          <template #default="scope">{{ scope.row.ctime.slice(0, 10) }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" 
              @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" 
        :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" 
        :total="tableData.total" />
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogFormVisible" draggable title="修改商品信息" width="30%">
      <el-form :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category">
            <el-option v-for="item in categorieList" :label="item.cateName" :value="item.cateName" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="axios.defaults.baseURL + '/goods/goods_img_upload?id='+ form.id"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="axios.defaults.baseURL + form.imgUrl" :src="axios.defaults.baseURL + form.imgUrl" class="avatar" />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.goodsDesc" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="async ()=>{
            form.imgUrl = form.imgUrl.slice(23);
            await axios.post('/goods/edit', form);
            await getData(currentPage, pageSize);
            dialogFormVisible = false;
          }">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref,watch } from 'vue'
import axios from '@axios';
import Title from '../../../../components/Title.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogFormVisible = ref(false)
const currentPage = ref(1);
const pageSize = ref(5);
const tableData = reactive({});
const form = reactive({
  id: '',
  name: '',
  category: '',
  price: 0,
  goodsDesc: '',
  imgUrl:'',
})
const categorieList = reactive([]);
// 上传图片成功回调
const handleAvatarSuccess = (res, file, fileList) => {
  form.imgUrl = res.imgUrl;
}
// 获取商品数据
const getData = async (currentPage, pageSize) => {
  const { data } = await axios.get('/goods/list?currentPage=' + currentPage + '&pageSize=' + pageSize);
  console.log(data);
  tableData.data = data.data;
  tableData.total = data.total;
  const {data:{categories}} = await axios.get('/goods/categories');
  categorieList.splice(0,0,...categories);
}

watch(() => ([currentPage.value, pageSize.value]), () => {
  getData(currentPage.value, pageSize.value);
}, { immediate: true })


const handleEdit = (id, rowData) => {
  form.id = id;
  form.name = rowData.name;
  form.category = rowData.category;
  form.price = rowData.price;
  form.imgUrl = rowData.imgUrl;
  form.goodsDesc = rowData.goodsDesc;
  dialogFormVisible.value = true;
}

const handleDelete = async (id) => {
  ElMessageBox.confirm(
    '确定要删除这个商品吗？',
    '删除商品提示',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async () => {
    await axios.get('/goods/del?id=' + id);
    await getData(currentPage.value, pageSize.value);
    ElMessage.success('删除成功')
  })
  .catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<style scoped lang="less">
.goodsList {
  width: 100%;
  height: 100%;
}

.container {
  padding: 15px;
}

.el-button {
  font-size: 12px;
}

.el-pagination {
  margin-top: 20px;
  padding: 2px 5px;
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