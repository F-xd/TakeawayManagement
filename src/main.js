import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus,{
    // 设置中文
    locale: zhCn
});
app.use(router);
app.mount('#app');