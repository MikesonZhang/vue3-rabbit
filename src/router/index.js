// createRouter创建路由示例
// createWebHistory创建history模式路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login/index.vue"
import Layout from "@/views/Layout/index.vue"
import Home from "@/views/Home/index.vue"
import Category from "@/views/Category/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          //默认页面直接置空，首先加载
          path: '',
          component: Home
        },
        {
          path: 'category',
          component: Category
        }
      ]
    },
    {
      path: "/login",
      component: Login
    }
  ]
})

export default router
