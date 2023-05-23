// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import "@/styles/common.scss"



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//全局指令
app.directive('img-lazy',{
    mounted(el,binding){
        //el指令绑定元素 img
        //binding 
        console.log(el,binding.value)
    }
})