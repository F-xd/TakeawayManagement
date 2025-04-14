<template>
  <div class="accountList">
    <Title title="账号列表"></Title>
    <div class="container">
      <el-table :data="tableData.data" row-key="id" style="width: 100%">
        <el-table-column type="selection" width="48" />
        <el-table-column property="account" label="账号"></el-table-column>
        <el-table-column property="userGroup" label="用户组" />
        <el-table-column label="创建时间">
          <template #default="scope">{{ scope.row.ctime.slice(0, 10) }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary"
              @click="handleEdit(scope.row.id, scope.row.account, scope.row.userGroup)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" />
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" draggable title="修改账号信息" width="30%">
      <el-form :model="form">
        <el-form-item label="账号名">
          <el-input v-model="form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="form.userGroup">
            <el-option label="超级管理员" value="超级管理员" />
            <el-option label="普通管理员" value="普通管理员" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="async ()=>{
            await axios.post('/users/edit', form);
            getData(currentPage, pageSize);
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
const currentPage = ref(1);
const pageSize = ref(5);
const tableData = reactive({});
// 获取数据
const getData = async (currentPage, pageSize) => {
  const { data } = await axios.get('/users/list?currentPage=' + currentPage + '&pageSize=' + pageSize);
  tableData.data = data.data;
  tableData.total = data.total;
}
// 监听分页
watch(() => ([currentPage.value, pageSize.value]), () => {
  getData(currentPage.value, pageSize.value);
}, { immediate: true })

const form = reactive({
  id: '',
  account: '',
  userGroup: '',
})
const handleEdit = async (id, account, userGroup) => {
  form.id = id;
  form.account = account;
  form.userGroup = userGroup;
  dialogFormVisible.value = true;
}
const handleDelete = async (id) => {
  ElMessageBox.confirm(
    '真的要删除这个用户吗?',
    '删除用户提示',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '不删除',
      type: 'warning',
    }
  )
    .then(async () => {
      await axios.get('/users/del?id=' + id);
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