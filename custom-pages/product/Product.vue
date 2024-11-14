<template>
  <div class="overflow-y-auto h-[90vh]" @scroll="handleScroll" ref="scrollContainer">
    <div class="px-4 py-6 mb-6">
      <form @submit.prevent="handleSubmit" class="justify-center gap-[15px] flex items-center w-full">
        <input
            v-model="store.product.inputSearch"
            type="text"
            placeholder="Type to search"
            class="w-full sm:w-[400px] md:w-[500px] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
            v-model="store.product.currentCategory"
            class="w-full sm:w-[180px] md:w-[200px] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select category</option>
          <option value="">All</option>
          <option v-for="category in store.product.listCategory" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>

    <div v-if="store.product.listItem.length">
      <div class="grid grid-cols-3 gap-[15px] px-[100px]">
        <div class="col-span-1" v-for="item in store.product.listItem" :key="item.id">
          <Card
              :id="item.id"
              :title="item.name"
              :img="item.preview_img_path"
              :price="item.price"
              :description="item.description"
              :category="item.category.name"
              :stock="item.stock"
              @sendId:id="(props)=>{handleAddToCart(props)}"
          />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
    <div v-if="loading" class="text-center p-4">Loading more items...</div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useCookie, useRouter} from '#app';
import Card from '~/components/Card.vue';
import {counterStore} from "~/store/counterStore.js";
import {productService} from '~/services/productService.js';
import {useToast} from "vue-toastification";

const store = counterStore();
const scrollContainer = ref(null);
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const toast = useToast();

const showToastErr = (message) => {
  toast.error(message);
}
const showToastSuccess = (message) => {
  toast.success(message);
}

const {data: list} = await useAsyncData("callItem", async () => {
  const {inputSearch, category, page} = route.query;
  if (inputSearch) {
    store.product.inputSearch = inputSearch;
  }
  if (category) {
    store.product.currentCategory = category;
  }
  if (page) {
    store.product.page = page;
  }
  const list = await productService.GetCardItem(store.product.currentPage, store.product.inputSearch, store.product.currentCategory);
  store.product.listItem = list.data;
  store.product.totalItem = list.total;
  return list;
})
console.log(list);

const {data: listCategory} = await useAsyncData("callCategory", async () => {
  const list = await productService.GetListCategory();
  store.product.listCategory = list.data;
  return list;
})
console.log(listCategory);

const loadItems = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const list = await productService.GetCardItem(
        store.product.currentPage,
        store.product.inputSearch,
        store.product.currentCategory
    );
    if (store.product.currentPage === 1) {
      store.product.listItem = list.data;
    } else {
      store.product.listItem = [...store.product.listItem, ...list.data];
    }
    store.product.totalItem = list.total;
    loading.value = false;
  } catch (error) {
    console.error('Error loading items:', error);
  }
};


const handleSubmit = () => {
  router.push({
    query: {
      inputSearch: store.product.inputSearch,
      category: store.product.currentCategory,
      page: store.product.currentPage,
    }
  });
  store.product.currentPage = 1;
  loadItems();
};

const handleScroll = () => {
  if (scrollContainer.value) {
    const {scrollTop, scrollHeight, clientHeight} = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value) {
      if (store.product.listItem.length < store.product.totalItem) {
        store.product.currentPage += 1;
        loadItems();
      }
    }
  }
};
const handleAddToCart = (props) => {
  const existingItem = store.product.listCartItem.find(item => item.product_id === props.id);
  const itemInList = store.product.listItem.find(item => item.id === props.id);
  if (existingItem) {
    itemInList.stock -= 1;
    existingItem.quantity += 1;
    showToastSuccess(`INCREASE QUANTITY ${props.title} IN CART`);
  } else {
    itemInList.stock -= 1;
    const item = {
      product_id: props.id,
      quantity: 1,
      price: props.price,
      name: props.title,
      img: props.img,
      isChoose: false,
    };
    store.product.listCartItem.push(item);
    showToastSuccess(`ADD ${props.title} TO CART`);
  }
};

</script>

<style scoped>
</style>
