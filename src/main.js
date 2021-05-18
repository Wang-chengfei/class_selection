import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import { router } from './router';
import { useRouter } from 'vue-router';
import func from './assets/js/func.js'


const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(useRouter);
app.config.globalProperties.$func = func;


app.mount('#app');
