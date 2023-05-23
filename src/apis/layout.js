import httpInstance from "@/utils/http";

//获取全部列表
export function getCategoryAPI(){
    return httpInstance({
        url:'/home/category/head',
        method:"GET"
    })
}

