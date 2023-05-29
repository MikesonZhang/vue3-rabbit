import { useRoute } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
export function useCategoryFun() {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async () => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res = await getCategoryAPI(route.params.id);
        categoryData.value = res.result;
    };


    onMounted(() => {
        getCategory()
    })

    return {
        categoryData,
        getCategory,
        route
    }

}


