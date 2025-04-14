<template>
  <div class="goodsType">
    <Title title="账号列表">
      <el-button type="primary" size="large" @click="()=>{handleEdit('','', false,true)}">添加分类</el-button>
    </Title>
    <div class="container">
      <el-table :data="tableData.data" row-key="id" style="width: 100%">
        <el-table-column property="id" label="序号"></el-table-column>
        <el-table-column property="cateName" label="分类名称" />
        <el-table-column label="是否启用">
          <template #default="scope">
            <el-switch disabled v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row.id, scope.row.cateName, scope.row.state)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" />
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" draggable :title="isAdd ? '添加分类' : '修改分类信息'" width="30%">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cateName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="async ()=>{
            if(isAdd){
              const {data} =await axios.post('/goods/addcate', form);
              if(data.code === 0){
                ElMessage.success('添加成功');
              }else{
                ElMessage.error('添加失败');
              }
              getData(currentPage, pageSize);
            }else{
              await axios.post('/goods/editcate', form);
              getData(currentPage, pageSize);
            }
            dialogFormVisible = false;
          }">确认</el-button>
        </div>
      </template>
    </el-dialog>

    
  </div>
</template>

<script setup>
import { computed, watch, reactive, ref } from 'vue'
import axios from '@axios';
import Title from '../../../../components/Title.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogFormVisible = ref(false)
const isAdd = ref(false)
const currentPage = ref(1);
const pageSize = ref(5);
const tableData = reactive({});
// 获取数据
const getData = async (currentPage, pageSize) => {
  const { data } = await axios.get('/goods/catelist?currentPage=' + currentPage + '&pageSize=' + pageSize);
  tableData.data = data.data;
  tableData.data.forEach(item => {
    item.state = item.state? true : false;
  })
  tableData.total = data.total;
}
// 监听分页
watch(() => ([currentPage.value, pageSize.value]), () => {
  getData(currentPage.value, pageSize.value);
}, { immediate: true })

const form = reactive({
  id: '',
  cateName: '',
  state: false,
})
const handleEdit = async (id, cateName, state,Added = false) => {
  isAdd.value = Added;
  form.id = id;
  form.cateName = cateName;
  form.state = state;
  dialogFormVisible.value = true;
}
const handleDelete = async (id) => {
  ElMessageBox.confirm(
    '真的要删除这个分类吗?',
    '删除分类提示',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '不删除',
      type: 'warning',
    }
  )
    .then(async () => {
      await axios.get('/goods/delcate?id=' + id);
      getData(currentPage.value, pageSize.value);
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}
</script>
<style scoped lang="less">
.accountList {
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
</style>