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
function GetListOrder(){
    return methodService().get('/orders');
}
function GetOrder(id){
    return methodService().get(`/orders/${id}`);
}
function GetProductDetail(id){
    return methodService().get(`/products/${id}`);
}

export const productService = {
    GetCardItem,
    GetListCategory,
    PostOrder,
    GetListOrder,
    GetOrder,
    GetProductDetail,
}