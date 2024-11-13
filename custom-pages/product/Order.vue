<template>
  <div class="flex gap-8 p-8">
    <div class="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Your Order</h2>
      <ul class="overflow-y-auto max-h-[200px]">
        <li v-for="(item, index) in store.product.listOrder" :key="index" class="mb-4 flex justify-between">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span class="font-bold ml-[20px]">{{ item.price * item.quantity }}$</span>
        </li>
      </ul>
      <div class="flex justify-between font-bold text-lg mt-4">
        <span>Total:</span>
        <span>{{ totalPrice }}$</span>
      </div>
    </div>

    <div class="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Contact Information</h2>
      <form @submit.prevent="placeOrder">
        <div class="mb-4">
          <label for="phone" class="block text-lg mb-2">Phone Number</label>
          <input
              v-model="phone"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <div class="mb-4">
          <label for="address" class="block text-lg mb-2">Address</label>
          <input
              v-model="address"
              id="address"
              type="text"
              placeholder="Enter your address"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Place Order
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {counterStore} from "~/store/counterStore.js";
import {productService} from "~/services/productService.js";
import {useToast} from "vue-toastification";

const store = counterStore();
const phone = ref("");
const address = ref("");
const toast = useToast();

const showToastErr = (message) => {
  toast.error(message);
}
const showToastSuccess = (message) => {
  toast.success(message);
}

const resetInput = ()=>{
  phone.value = "";
  address.value = "";
}

const totalPrice = computed(() => {
  return store.product.listOrder.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
  );
});

const placeOrder = async () => {
  if(!store.product.listOrder.length){
    showToastErr("Order list Empty, please add to order!!");
    navigateTo('/product');
    return;
  }
  const data = {
    address: address.value,
    phone: phone.value,
    cart_item: store.product.listOrder,
  }
  try {
    const res = await productService.PostOrder(data);
    store.product.listCartItem = store.product.listCartItem.filter(item => !item.isChoose);
    store.product.listOrder = [];
    resetInput();
    showToastSuccess("order success!!!");
    console.log("đã add ");
    store.product.billOrder = data;
    navigateTo("/order-success");
  } catch (error) {
    resetInput();
    showToastErr("order Failed!!!");
    console.log(error)
  }
};
</script>

<style scoped>
</style>
