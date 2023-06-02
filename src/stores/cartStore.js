//封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //定义state
    const cartList = ref([])
    //定义action
    const addCart = async (goods) => {
        //添加购物车操作
        const {skuId,count} = goods
        if (isLogin) {
            //登录了
            await insertCartAPI({skuId,count})
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else {
            //添加判断
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                //找到了
                item.count++
            } else {
                //找到了
                cartList.value.push(goods)
            }
        }
    }
    const delCart = (skuId) => {
        //删除购物车操作
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    //计算属性
    //所有物品的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    //所有商品的价格之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    //已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    //选中项的价格
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    //单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    //是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    //全选
    const allCheck = (selected) => {
        //把list中的每一项设置为选中
        cartList.value.forEach(item => item.selected = selected)
    }

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice
    }
}, {
    persist: true
})