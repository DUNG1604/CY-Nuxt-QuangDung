<template>
  <div>
    <div class="w-full flex flex-col h-fit gap-4 mt-[10px]">
      <div class="grid grid-cols-8 p-4 text-lg font-semibold shadow-md border rounded-sm items-center gap-4">
        <div class="col-span-2 flex justify-center">
          <div class="w-28 h-28">
            <img class="w-full h-full object-cover"
                 :src="img">
          </div>
        </div>
        <div class="col-span-3">
          <p class="text-lg text-gray-800 font-semibold line-clamp-1">{{ name }}</p>
        </div>
        <div class="col-span-1 text-center">
          <p class="text-gray-800 font-normal text-xl">{{ price }}$/item</p>
        </div>
        <div class="col-span-1 flex items-center gap-2 justify-center">
          <button @click="handleIncrease" class="w-5 h-5 rounded-full border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
            </svg>
          </button>
          <input type="text" readonly="readonly" :value="quantity"
                 class="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm">
          <button @click="handleReduce" class="w-5 h-5 rounded-full border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
        <div class="col-span-1 flex justify-center">
          <button class="mx-auto">
            <svg height="24px" width="24px" id="Layer_1" style="enable-background:new 0 0 512 512;"
                 version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g>
                <path
                    d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z"/>
                <g>
                  <rect height="241" width="14" x="249" y="160"/>
                  <polygon points="320,160 305.4,160 294.7,401 309.3,401"/>
                  <polygon points="206.5,160 192,160 202.7,401 217.3,401"/>
                </g>
              </g>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

import {counterStore} from "~/store/counterStore.js";

const store = counterStore();
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 49.99,
  },
  name: {
    type: String,
    default: "Adidas Coreracer Men's Shoes",
  },
  img: {
    type: String,
    default: "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-masculino/09/NQQ-4635-309/NQQ-4635-309_zoom1.jpg?ts=1675445414&ims=544x",
  },
});

const emit = defineEmits(["increase", "reduce"]);
const dataIncreateEmit = {
  props:props,
  count: 1,
}
const dataReduceEmit = {
  props:props,
  count: -1,
}
const handleIncrease = () => {
  emit("increase", dataIncreateEmit);
}
const handleReduce = () => {
  emit("reduce", dataReduceEmit);
}

</script>

<style lang="scss" scoped>
</style>
