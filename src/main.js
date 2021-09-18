import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import "@/../static/css/style.css"
import "@/../static/css/custom-style.css"

import 'element-plus/dist/index.css' 
const app = createApp(App)
app.use(ElementPlus)
app.use(router);

app.mount('#app');
