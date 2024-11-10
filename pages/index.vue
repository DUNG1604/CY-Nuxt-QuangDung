<template>
  <div
      class="overflow-y-auto h-screen"
      @scroll="handleScroll"
      ref="scrollContainer"
  >
    <div class="mt-[20px]">
      <form class="flex gap-[10px] w-full justify-center" @submit.prevent="searchItems">
        <input
            v-model="news.searchQuery"
            placeholder="Search news..."
            class="border-black border rounded-[5px] w-[60%] px-[20px] py-[5px]"
        />
        <button class="px-[5px] border border-black rounded-[5px] hover:bg-gray-300" type="submit">search</button>
      </form>
      <div class="ml-4 mt-[10px] text-[17px]"><span class="font-medium text-[20px]">{{ news.countRes }}</span> Kết quả
        tìm
        kiếm !!
      </div>
    </div>
    <div v-for="(item, index) in news.items" :key="index" class="p-4 border-b flex">
      <div class="flex-1">
        <h2 class="font-[600] text-[20px]">{{ item.title }}</h2>
        <div class="line-clamp-3">{{ item.description }}</div>
        <a :href="item.url" target="_blank" class="text-blue-500">Read more</a>
      </div>
      <div class="w-[300px]">
        <img :src="item.urlToImage" alt="" class="w-full h-48 object-cover"/>
      </div>
    </div>
    <div v-if="news.loading" class="text-center p-4">Loading more items...</div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';

const news = ref({
  items: [] as any[],
  page: 1,
  loading: false,
  searchQuery: '',
  countRes: 0,
});

const scrollContainer = ref(null);

const loadItems = async () => {
  news.value.loading = true;
  try {
    let query = news.value.searchQuery || 'bitcoin';
    const response = await $fetch(`/api/v1/search?pageNumber=${news.value.page}&strSearch=${query}`);
    news.value.items = [...news.value.items, ...response.articles];
    news.value.page++;
    news.value.countRes = response.totalResults;
    news.value.loading = false;
  } catch (error) {
    console.error(error);
  }
};

const searchItems = () => {
  news.value.page = 1;
  news.value.items = [];
  loadItems();
};

onMounted(() => {
  loadItems();
});

const handleScroll = () => {
  if (scrollContainer.value) {
    const scrollTop = scrollContainer.value.scrollTop;
    const scrollHeight = scrollContainer.value.scrollHeight;
    const clientHeight = scrollContainer.value.clientHeight;
    // console.log(clientHeight)

    if (scrollTop + clientHeight >= scrollHeight - 10 && !news.value.loading) {
      if (news.value.items.length < news.value.countRes) {
        loadItems();
      }
    }
  }
};
</script>

<style scoped>
</style>
