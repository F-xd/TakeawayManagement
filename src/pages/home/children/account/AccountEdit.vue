<template>
  <div class="accountEdit">
    <Title title="修改密码"></Title>
    <div class="container">
      <el-form ref="ruleFormRef" style="max-width: 400px" :model="form" :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" placeholder="请输入原密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请确认新密码" autocomplete="off" />
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
import { useRouter } from 'vue-router';
const router = useRouter();
const ruleFormRef = ref()
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const validateOldPassword = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请输入原密码'))
  } else callback();
}
const validateNewPassword = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请输入新密码'))
  } else if(form.oldPassword == value){
    callback(new Error('新密码不能与原密码相同'))
  } 
  else callback();
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请确认新密码'))
  } else if (value !== form.newPassword) {
    callback(new Error('两次密码输入不一致'))
  } else callback();
}
const rules = reactive({
  oldPassword: [{ validator: validateOldPassword, trigger: 'blur' }],
  newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const {data} = await axios.post('/users/editpwd', {oldPwd:form.oldPassword,newPwd:form.newPassword,id:localStorage.getItem("id")})
      if(data.code === 0){
        ElMessage.success(data.msg);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        router.push('/login');
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
  formEl.resetFields();
}
</script>
<style lang='less' scoped>
.container {
  padding: 15px;
}
</style>