<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 px-4 pt-[40px]">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Order Details</h3>
        <div class="mt-2 text-gray-700">
          <p><strong>Order ID:</strong> #{{ order.id }}</p>
          <p><strong>Order Date:</strong> {{ new Date(order.created_at).toLocaleString() }}</p>
          <p><strong>Total Amount:</strong> {{ order.sub_total }}$</p>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Shipping Information</h3>
        <div class="mt-2 text-gray-700">
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Phone:</strong> {{ order.phone }} </p>
        </div>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800">Products Ordered</h3>
        <ul class="mt-2 space-y-3">
          <li v-for="(item, index) in order.order_items" :key="index" class="grid grid-cols-8 p-2 bg-gray-50 rounded gap-[10px]">
            <span class="col-span-1">{{ index + 1}}</span>
            <span class="line-clamp-1 col-span-5">{{ item.name }}</span>
            <span class="col-span-1">SL: {{ item.quantity }}</span>
            <span class="col-span-1">{{ item.quantity * item.price }}$</span>
          </li>
        </ul>
      </div>

      <div class="text-center">
        <button
            @click="navigateTo('/history-order')"
            class="mt-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Return
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productService } from "~/services/productService.js";

const route = useRoute();
const id  = route.params.id;

let order = null;

const { data } = await useAsyncData("OrderDetail", async () => {
  const response = await productService.GetOrder(id);
  order = response;
  return order;
});

</script>

<style scoped>
</style>
