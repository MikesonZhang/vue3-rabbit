//管理用户数据相关
import { defineStore } from 'pinia'
import {ref} from 'vue'
import { loginAPI } from '@/apis/user'
export const useUserStore = defineStore('user', () => {
    //定义state
    const userInfo = ref({

    })
    //定义action
    const getUserInfo = async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result 
    }
    //用户退出
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    //以对象返回
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})