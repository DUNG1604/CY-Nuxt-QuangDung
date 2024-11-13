<template>
  <div class="bg-white">
    <div class="py-2 px-12 border-b border-gray-200 shadow-md">
      <div class="flex justify-between items-center">
        <div @click="navigateTo('/')" class="cursor-pointer text-center text-[#5046e5] text-3xl font-extrabold">
          Shop's Andrew
        </div>
        <div v-if="name" class="flex gap-4 items-center">
          <div class="text-lg font-medium">{{ name }}</div>
          <div class="relative cursor-pointer" @click="toggleDropdown">
            <span class="material-symbols-outlined text-3xl">
              account_circle
            </span>
            <!-- Dropdown Menu -->
            <div v-if="isDropdownVisible" class="absolute z-40 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <ul class="text-gray-700">
                <li @click="goToOrderHistory" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Order History</li>
                <li @click="logout" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
              </ul>
            </div>
          </div>
          <div @click="navigateTo('/cart')" class="cursor-pointer">
            <span class="material-symbols-outlined text-3xl">
              shopping_cart
            </span>
          </div>
        </div>
        <div v-else>
          <button @click="navigateTo('/login')" class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCookie } from "#app";
import { counterStore } from "~/store/counterStore.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const name = useCookie("name").value;

const showToastSuccess = (message) => {
  toast.success(message);
}

const store = counterStore();
const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const goToOrderHistory = () => {
  navigateTo('/order-history');
  isDropdownVisible.value = false;
};

const logout = () => {
  const tokenCookie = useCookie('token');
  const nameCookie = useCookie('name');
  tokenCookie.value = null;
  nameCookie.value = null;
  store.product.listOrder = [];
  store.product.listCartItem = [];
  showToastSuccess("Logout Success");
  navigateTo('/login');
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
