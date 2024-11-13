import methodService from "~/services/methodService.js";

function GetCardItem(currentPage, inputSearch, cartegoryId) {
    return methodService().get(`/products?page=${currentPage}&name=${inputSearch}&category_id=${cartegoryId}`)
}
function GetListCategory(){
    return methodService().get('/categories');
}
function PostOrder(payload){
    return methodService().post('/order',payload);
}

export const productService = {
    GetCardItem,
    GetListCategory,
    PostOrder,
}