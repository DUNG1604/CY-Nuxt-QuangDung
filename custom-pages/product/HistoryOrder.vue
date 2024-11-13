<template>
  <div class="container mx-auto px-4 py-8">
    <p class="text-center text-[#5046e5] text-[30px] font-extrabold mb-6">History Order</p>

    <table class="min-w-full bg-white border border-gray-200 mt-6 rounded-lg shadow-lg">
      <thead>
      <tr class="bg-gray-100 text-gray-600">
        <th class="py-3 px-4 border-b text-left w-1/12">STT</th>
        <th class="py-3 px-4 border-b text-left w-1/12">Total</th>
        <th class="py-3 px-4 border-b text-left w-5/12">Address</th>
        <th class="py-3 px-4 border-b text-left w-2/12">Phone</th>
        <th class="py-3 px-4 border-b text-left w-3/12">Created At</th>
        <th class="py-3 px-4 border-b"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(order, index) in store.product.listHistoryOrder" :key="order.id" class="border-b hover:bg-gray-50">
        <td class="py-3 px-4">{{ index+1 }}</td>
        <td class="py-3 px-4">{{ order.sub_total }}$</td>
        <td class="py-3 px-4 line-clamp-2 h-[60px]">{{ order.address }}</td>
        <td class="py-3 px-4">{{ order.phone }}</td>
        <td class="py-3 px-4">{{ new Date(order.created_at).toLocaleString() }}</td>
        <td class="py-3 px-4 text-center">
          <button
              @click="viewOrderDetails(order.id)"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { productService } from "~/services/productService.js";
import { counterStore } from "~/store/counterStore.js";

const store = counterStore();
const router = useRouter();

const { data } = await useAsyncData("HistoryOrder", async () => {
  const list = await productService.GetListOrder();
  store.product.listHistoryOrder = list;
  return list;
});

const viewOrderDetails = (orderId) => {
  router.push({
    params:{
      id: orderId,
    }
  })
  navigateTo(`/history-order/${orderId}`)
}
</script>

<style scoped>
</style>
