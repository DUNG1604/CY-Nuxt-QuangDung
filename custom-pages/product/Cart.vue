<template>
  <p class="text-center text-[#5046e5] text-[30px] font-extrabold">My cart</p>
  <div class="px-[100px]" v-if="store.product.listCartItem.length">
    <!-- Cart Items -->
    <div class="overflow-y-auto max-h-[500px]">
      <div class="relative" v-for="item in store.product.listCartItem" :key="item.product_id">
          <input
              class="cursor-pointer w-[25px] h-[25px] absolute top-[60px] left-[20px]"
              type="checkbox"
              v-model="item.isChoose"
              @change="updateOrderList(item)"
          />
          <ItemCart
              :id="item.product_id"
              :price="item.price"
              :img="item.img"
              :name="item.name"
              :quantity="item.quantity"
          />
      </div>
    </div>
  </div>

  <div class="px-[100px] text-center text-[30px] mt-[30px] font-bold" v-else>
    <div>Cart Empty :((</div>
    <button @click="navigateTo('/product')" class="lg:w-auto my-2 border rounded md py-1 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 text-[20px]">
      Shopping Now
    </button>
  </div>
  <div class="px-[100px] mt-4 p-4 border-t">
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold text-gray-800">Total: {{ totalPrice }}$</p>
      <button
          class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          @click="placeOrder"
      >
        Order
      </button>
    </div>
  </div>
</template>

<script setup>
import {counterStore} from "~/store/counterStore.js";
import {computed, watch} from 'vue';
import {useToast} from "vue-toastification";

const store = counterStore();
const toast = useToast();

const showToastErr = (message) => {
  toast.error(message);
}
const showToastSuccess = (message) => {
  toast.success(message);
}

const updateOrderList = (item) => {
  console.log("checker",item.product_id)
  const itemOrder = {
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    name: item.name
  }
  if (item.isChoose) {
    if (!store.product.listOrder.find(i => i.product_id === item.product_id)) {
      store.product.listOrder.push(itemOrder);
    }
  } else {
    store.product.listOrder = store.product.listOrder.filter(i => i.product_id !== item.product_id);
  }
};

const totalPrice = computed(() => {
  return store.product.listOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const placeOrder = () => {
  if(store.product.listOrder.length){
    navigateTo('/order');
  }else {
    showToastErr("Order list Empty, please add to order!!");
  }

};

</script>

<style scoped>
</style>
