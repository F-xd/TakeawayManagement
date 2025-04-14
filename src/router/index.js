import { createRouter, createWebHashHistory } from 'vue-router';

// 导入组件
// 1. 用户中心相关组件
import AccountAdd from '@/pages/home/children/account/AccountAdd.vue';
import AccountCenter from '@/pages/home/children/account/AccountCenter.vue';
import AccountEdit from '@/pages/home/children/account/AccountEdit.vue';
import AccountList from '@/pages/home/children/account/AccountList.vue';

// 2. 权限相关组件
import PermissionInfo from '@/pages/home/children/authority/PermissionInfo.vue';
import RolePermission from '@/pages/home/children/authority/RolePermission.vue';

// 3. 商品管理相关组件
import GoodsAdd from '@/pages/home/children/goods/GoodsAdd.vue';
import GoodsList from '@/pages/home/children/goods/GoodsList.vue';
import GoodsType from '@/pages/home/children/goods/GoodsType.vue';

// 4. 统计相关组件
import GoodsStatistics from '@/pages/home/children/statistics/GoodsStatistics.vue';
import OrderStatistics from '@/pages/home/children/statistics/OrderStatistics.vue';
import OrderList from '@/pages/home/children/OrderList.vue';
import ShopInfo from '@/pages/home/children/ShopInfo.vue';

// // 5. 首页组件
import Home from '@/pages/home/Home.vue';

// 6. 登录组件
import Login from '@/pages/login/Login.vue';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/accountAdd',
                component: AccountAdd,
                name: 'AccountAdd',
            },
            {
                path: '/accountCenter',
                component: AccountCenter,
                name: 'AccountCenter',
            },
            {
                path: '/accountEdit',
                component: AccountEdit,
                name: 'AccountEdit',
            },
            {
                path: '/accountList',
                component: AccountList,
                name: 'AccountList',
            },
            {
                path: '/permissionInfo',
                component: PermissionInfo,
                name: 'PermissionInfo',
            },
            {
                path: '/rolePermission',
                component: RolePermission,
                name: 'RolePermission',
            },
            {
                path: '/goodsAdd',
                component: GoodsAdd,
                name: 'GoodsAdd',
            },
            {
                path: '/goodsList',
                component: GoodsList,
                name: 'GoodsList',
            },
            {
                path: '/goodsType',
                component: GoodsType,
                name: 'GoodsType',
            },
            {
                path: '/goodsStatistics',
                component: GoodsStatistics,
                name: 'GoodsStatistics',
            },
            {
                path: '/orderStatistics',
                component: OrderStatistics,
                name: 'OrderStatistics',
            },
            {
                path: '/orderList',
                component: OrderList,
                name: 'OrderList',
            },
            {
                path: '/shopInfo',
                component: ShopInfo,
                name: 'ShopInfo',
            },
        ],
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
