<template>
    <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item  :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-show="item" v-for="(item,index) in currentPath" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const pathList = [
    { path: '/home', name: '首页', father: '' },

    { path: '/accountList', name: '账号列表', father: '账户管理' },
    { path: '/accountAdd', name: '添加账号', father: '账户管理' },
    { path: '/accountCenter', name: '账号中心', father: '账户管理' },
    { path: '/accountEdit', name: '修改密码', father: '账户管理' },

    { path: '/goodsList', name: '商品列表', father: '商品管理' },
    { path: '/goodsAdd', name: '商品添加', father: '商品管理' },
    { path: '/goodsType', name: '商品分类', father: '商品管理' },

    { path: '/orderList', name: '订单管理',father:'' },

    { path: '/shopInfo', name: '店铺管理',father:'' },

    { path: '/goodsStatistics', name: '商品统计', father:'统计数据' },
    { path: '/orderStatistics', name: '订单统计',father:'统计数据' },

    { path: '/permissionInfo', name: '权限管理',father: '权限管理' },
    { path: '/RolePermission', name: '角色管理', father: '权限管理' },
]
const currentPath=computed(()=>{
    const path = route.path;
    const item = pathList.find(item=>item.path === path)
    return [item.father,item.name];
})

</script>
<style scoped lang="less"> 
.breadcrumb{
    display: flex;
    align-items: center;
}
</style>