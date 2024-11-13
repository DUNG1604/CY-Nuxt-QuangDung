<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
      <!-- Success Message -->
      <div class="text-center mb-8 flex flex-col items-center">
        <div class="w-[40px] h-[40px]">
          <img class="w-full h-full object-cover" src="@/assets/icons/check.png">
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mt-[20px]">
          Order Placed Successfully!
        </h2>
        <p class="text-gray-600">Thank you for shopping with us. Your order has been confirmed.</p>
      </div>

      <!-- Order Information -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Order Details</h3>
        <div class="mt-2 text-gray-700">
          <p><strong>Order ID:</strong> #123456789</p>
          <p><strong>Order Date:</strong> {{ new Date().getHours()}}:{{ new Date().getMinutes()}} - {{new Date().getDay()}}/{{new Date().getMonth()}}/{{new Date().getFullYear()}}</p>
          <p><strong>Total Amount:</strong> {{ totalPrice }}$</p>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Shipping Information</h3>
        <div class="mt-2 text-gray-700">
          <p><strong>Name:</strong> {{ name }}</p>
          <p><strong>Address:</strong> {{ store.product.billOrder.address }}</p>
          <p><strong>Phone:</strong> {{ store.product.billOrder.phone }} </p>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800">Products Ordered</h3>
        <ul class="mt-2 space-y-3">
          <li v-for="(item, index) in store.product.billOrder.cart_item" :key="index" class="grid grid-cols-8 p-2 bg-gray-50 rounded gap-[10px]">
            <span class="col-span-1">{{ index + 1}}</span>
            <span class="line-clamp-1 col-span-5">{{ item.name }}</span>
            <span class="col-span-1">SL: {{ item.quantity }}</span>
            <span class="col-span-1">{{item.quantity*item.price}}$</span>
          </li>
        </ul>
      </div>

      <div class="text-center">
        <button
            @click="goToHomePage"
            class="mt-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {counterStore} from "~/store/counterStore.js";
import {computed} from "vue";

const store = counterStore();
const name = useCookie('name');
function goToHomePage() {
  navigateTo("/product");
}
const totalPrice = computed(() => {
  return store.product.billOrder.cart_item.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
  );
});
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
