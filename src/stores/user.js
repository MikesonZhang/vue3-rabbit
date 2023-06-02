//管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {

    const cartStore = useCartStore()

    //定义state
    const userInfo = ref({

    })
    //定义action
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        //合并购物车
        await mergeCartAPI(cartStore.cartList.map(item=>{
            return{
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }
    //用户退出
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    //以对象返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true
})