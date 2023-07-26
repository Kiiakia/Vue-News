import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Particles from "particles.vue3";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).
use(Particles).
use(ElementPlus).
use(store).
use(router).mount('#app')
