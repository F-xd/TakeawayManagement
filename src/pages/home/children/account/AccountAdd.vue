<template>
  <div class="accountAdd">
    <Title title="添加账号"></Title>
    <div class="container">
      <el-form ref="ruleFormRef" style="max-width: 400px" :model="form" :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" type="text" placeholder="请输入账号" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="form.userGroup" placeholder="请输入用户组">
            <el-option label="超级管理员" value="超级管理员" />
            <el-option label="普通管理员" value="普通管理员" />
          </el-select>
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
const ruleFormRef = ref()
const form = reactive({
  account: '',
  password: '',
  userGroup: '',
})
const validateAccount = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请输入账号'))
  }
  else callback();
}
const validatePassword = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请输入密码'))
  } else callback();
}
const validateUserGroup = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请选择用户组'))
  } else callback();
}
const rules = reactive({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  userGroup: [{ validator: validateUserGroup, trigger: 'change' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await axios.post('/users/add', form);
      formEl.resetFields()
      ElMessage.success('添加成功')
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
</style>