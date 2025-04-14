<template>
  <div class='orderList'>
    <el-form inline ref="ruleFormRef" :model="form" label-width="auto" class="demo-ruleForm">
      <el-form-item label="订单号"  prop="orderNo">
        <el-input v-model="form.orderNo" type="text" placeholder="请输入订单号" autocomplete="off" />
      </el-form-item>
      <el-form-item label="收货人" prop="consignee">
        <el-input v-model="form.consignee" type="text" placeholder="请输入收货人" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" type="text" placeholder="请输入收货人" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="form.orderState" placeholder="请输入订单状态">
          <el-option label="已受理" value="已受理" />
          <el-option label="派送中" value="派送中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间" prop="date">
        <el-date-picker v-model="form.date" type="daterange" unlink-panels range-separator="到" start-placeholder="开始日期"
          end-placeholder="结束日期" :shortcuts="shortcuts" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          搜索
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    

    <div class="container">
      <el-table :row-style="(a)=>{return {backgroundColor:a.rowIndex%2==0?'#eee8aa':'#87ceeb'}}" :data="tableData.data" row-key="id" style="width: 100%">
        <el-table-column property="orderNo" label="订单号" width="70"></el-table-column>
        <el-table-column property="orderTime" label="下单时间"></el-table-column>
        <el-table-column property="phone" label="联系电话"></el-table-column>
        <el-table-column property="consignee" label="收货人"></el-table-column>
        <el-table-column property="deliverAddress" label="送货地址"></el-table-column>
        <el-table-column property="deliveryTime" label="送达时间"></el-table-column>
        <el-table-column property="remarks" label="备注"></el-table-column>
        <el-table-column property="orderAmount" label="订单金额"></el-table-column>
        <el-table-column property="orderState" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleEdit(scope.row.id,true)">查看</el-button>
            <el-button size="small" type="primary"
              @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="form.currentPage" v-model:page-size="form.pageSize" :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" />
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" draggable title="修改订单信息" width="500px">
      <el-form :disabled="isView" label-width="100" :model="form">
        <el-form-item label="订单号">
          <el-input v-model="form2.orderNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="form2.orderTime"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form2.phone" />
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form2.consignee" />
        </el-form-item>
        <el-form-item label="送货地址">
          <el-input v-model="form2.deliverAddress" />
        </el-form-item>
        <el-form-item label="送达时间">
          <el-date-picker
            v-model="form2.deliveryTime"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form2.remarks"/>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input-number :precision="2" :min="0"  v-model="form2.orderAmount" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form2.orderState">
            <el-option label="已受理" value="已受理" />
            <el-option label="派送中" value="派送中" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ isView ? '关闭' : '取消' }}</el-button>
          <el-button v-show="!isView" type="primary" @click="async ()=>{
            const {data} = await axios.post('/order/edit', form2);
            if(data.code === 0){
              ElMessage.success('修改成功');
              await getData(form);
              dialogFormVisible = false;
            }else{
              ElMessage.error('请检查输入是否正确');
            }
          }">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive,watch } from 'vue';
import axios from '@axios';
import { ElMessage } from 'element-plus'
const isView = ref(false);
const ruleFormRef = ref();
const dialogFormVisible = ref(false);
// 数据列表
const tableData = reactive({});
// 表单数据
const form = reactive({
  orderNo: '',
  consignee: '',
  phone: '',
  orderState: '',
  date: '',
  currentPage: 1,
  pageSize: 5
})
// 订单修改表单
const form2 = reactive({
  id: '',
  orderNo: '',
  orderTime: '',
  phone:'',
  consignee: '',
  deliverAddress: '',
  deliveryTime: '',
  remarks: '',
  orderAmount: '',
  orderState: ''
});

// 日期选择器快捷选项
const shortcuts = [
  {
    text: '最近5天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
      return [start, end]
    },
  },
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
// 获取数据
const getData = async (form) => {
  form.date = form.date?JSON.stringify(form.date):'';
  const { data } = await axios.get('/order/list?' + new URLSearchParams(form));
  tableData.data = data.data;
  tableData.total = data.total;
}
// 监听分页
watch(() => ([form.currentPage, form.pageSize]), () => {
  getData(form);
}, { immediate: true })


// 根据表单数据获取数据
const submitForm = (ruleFormRef) => {
  getData(form);
  form.date = '';
}

// 编辑订单
const handleEdit = async (id,viewed=false) => {
  Object.assign(form2, tableData.data.find(item => item.id == id));
  isView.value = viewed;
  dialogFormVisible.value = true;
}

// 表单重置
const resetForm = (ruleFormRef) => {
  ruleFormRef.resetFields();
  getData(form);
}
</script>

<style lang='less' scoped>

.el-form {
  padding: 20px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-form-item {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
  }
}
.el-select {
  width: 220px;
}
</style>