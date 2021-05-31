import Vue from 'vue'
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import { router } from './router';
import { useRouter } from 'vue-router';
import { axios } from 'axios';
import func from './assets/js/func.js'


const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(axios);
app.use(useRouter);
app.config.globalProperties.$func = func;


app.mount('#app');

new Vue({
    router,
    data: function(){
        return {
            stud_id: '',
            passwd: ''
        }
    },
    render: h => h(App)
}).$mount('#app');