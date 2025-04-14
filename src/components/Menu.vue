<template>
    <div class='menu'>
        <el-menu 
            active-text-color="#409eff" 
            background-color="#304156" 
            class="el-menu" 
            unique-opened
            :default-active="currentPath"
            text-color="#fff" 
            router
            @select="handleSelect">

            <div class="logo">
                <img class="logoImg" src="@/assets/images/logo.2ee21e35.jpg" alt="">
                <span class="name">外卖管理系统</span>
            </div>
            <el-menu-item index="/home">
                <el-icon><HomeFilled /></el-icon>
                <span class="title">首页</span>
            </el-menu-item>

            <el-sub-menu index="account">
                <template #title>
                    <el-icon><Briefcase /></el-icon>
                    <span class="title">账号管理</span>
                </template>
                <el-menu-item index="/accountList"><span class="title">账号列表</span></el-menu-item>
                <el-menu-item index="/accountAdd"><span class="title">添加账号</span></el-menu-item>
                <el-menu-item index="/accountCenter"><span class="title">个人中心</span></el-menu-item>
                <el-menu-item index="/accountEdit"><span class="title">修改密码</span></el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="goods">
                <template #title>
                    <el-icon><Menu /></el-icon>
                    <span class="title">商品管理</span>
                </template>
                <el-menu-item index="/goodsList"><span class="title">商品列表</span></el-menu-item>
                <el-menu-item index="/goodsAdd"><span class="title">商品添加</span></el-menu-item>
                <el-menu-item index="/goodsType"><span class="title">商品分类</span></el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/orderList">
                <el-icon><List /></el-icon>
                <span class="title">订单管理</span>
            </el-menu-item>

            <el-menu-item index="/shopInfo">
                <el-icon><Shop /></el-icon>
                <span class="title">店铺管理</span>
            </el-menu-item>

            <el-sub-menu index="statistics">
                <template #title>
                    <el-icon><TrendCharts /></el-icon>
                    <span class="title">统计数据</span>
                </template>
                <el-menu-item index="/goodsStatistics"><span class="title">商品统计</span></el-menu-item>
                <el-menu-item index="/orderStatistics"><span class="title">订单统计</span></el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="authority">
                <template #title>
                    <el-icon><TrendCharts /></el-icon>
                    <span class="title">权限管理</span>
                </template>
                <el-menu-item index="/permissionInfo"><span class="title">权限管理</span></el-menu-item>
                <el-menu-item index="/RolePermission"><span class="title">角色管理</span></el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {useMenuSelectStore} from '../stores/menuSelect'
import {
  HomeFilled,
  Briefcase,
  Menu,
  List,
  Shop,
  TrendCharts,
} from '@element-plus/icons-vue'
const menuSelect = useMenuSelectStore();
const handleSelect = (key, keyPath) => menuSelect.setKeyPath(keyPath);
const route = useRoute();
const currentPath = computed(()=>route.path);

</script>

<style lang='less' scoped>
.menu {
    flex:0 0 auto;
    width: 200px;
    height: 100%;
}
.el-menu{
    height: 100%;   
    // i{
    //     color: #909399;
    // }
}

.logo{
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .logoImg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .name{
        color: #fff;
        margin-left: 10px;
    }
}
</style>