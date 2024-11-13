<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
    <div class="flex justify-center">
      <div class="w-[300px]">
        <img :src="product.preview_img_path" alt="Product Image" class="w-full h-auto rounded-lg shadow-md object-cover">
      </div>
    </div>
    <div class="mb-6 mt-[20px]">
      <p class="text-gray-700">{{ product.description }}</p>
    </div>
    <div class="flex items-center mb-6">
      <span class="text-2xl font-semibold text-gray-900 mr-4">${{ product.price }}</span>
      <span class="text-sm text-gray-500">(In Stock: {{ product.stock }})</span>
    </div>
    <div class="mb-6">
      <p class="text-gray-600 font-semibold">Category:
        <span class="text-indigo-600">{{ product.category.name }}</span>
      </p>
    </div>

    <div class="flex items-center justify-between">
      <button
          @click="handleAddToCart"
          :disabled="product.stock <= 0"
          class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 disabled:bg-gray-300"
      >
        {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { productService } from '~/services/productService.js';
import {counterStore} from "~/store/counterStore.js";
import {useToast} from "vue-toastification";

const route = useRoute();
const id = route.params.id;
const  store = counterStore();
const toast = useToast();

const showToastErr = (message) => {
  toast.error(message);
}
const showToastSuccess = (message) => {
  toast.success(message);
}

let product = ref(null);

const { data } = await useAsyncData('OrderDetail', async () => {
  const response = await productService.GetProductDetail(id);
  product.value = response;
  return product;
});

const handleAddToCart = () => {
  console.log(store.product.listCartItem);
  const existingItem = store.product.listCartItem.find(item => item.product_id === Number(id));
  console.log(existingItem)
  if(existingItem){
    existingItem.quantity+=1;
    product.value.stock-=1;
    showToastSuccess(`INCREASE QUANTITY IN CART`);
  }else{
    product.value.stock-=1;
    const item = {
      product_id: product.value.id,
      quantity: 1,
      price: product.value.price,
      name: product.value.name,
      img: product.value.preview_img_path,
      isChoose: false,
    };
    store.product.listCartItem.push(item);
    showToastSuccess(`ADD TO CART`);
  }
};
</script>

<style scoped>
</style>
