export const routes = [
    {
        name: 'Login',
        path: '/login',
        file: '~/custom-pages/user/Login.vue'
    },
    {
        name: 'Signup',
        path: '/signup',
        file: '~/custom-pages/user/Signup.vue'
    },
    {
        name: 'Card',
        path: '/card',
        file: '~/components/Card.vue'
    },
    {
        name: 'ItemCart',
        path: '/item-cart',
        file: '~/components/ItemCart.vue'
    },
    {
        name: 'Cart',
        path: '/cart',
        file: '~/custom-pages/product/Cart.vue'
    },
    {
        name: 'Order',
        path: '/order',
        file: '~/custom-pages/product/Order.vue'
    },
    {
        name: 'Product',
        path: '/product',
        file: '~/custom-pages/product/Product.vue'
    },
    {
        name: 'OrderSuccess',
        path: '/order-success',
        file: '~/custom-pages/product/OrderSuccess.vue'
    },
    {
        name: 'HistoryOrder',
        path: '/history-order',
        file: '~/custom-pages/product/HistoryOrder.vue'
    },
    {
        name: 'OrderDetail',
        path: '/history-order/:id',
        file: '~/custom-pages/product/OrderDetail.vue'
    },
    {
        name: 'ProductDetail',
        path: '/product/:id',
        file: '~/custom-pages/product/ProductDetail.vue'
    },
];