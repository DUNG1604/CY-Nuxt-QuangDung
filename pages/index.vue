<template>
  <div
      class="lg:px-24 lg:py-10 md:py-10 md:px-44 px-4 py-10 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
    <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
      <div class="relative">
        <div class="">
          <div class="">
            <h1 class="my-2 text-gray-800 font-bold text-[30px]">
              Welcome to Andrew's Shop
            </h1>
            <p class="my-2 text-gray-800">
              Discover an incredible variety of high-quality products from around the globe. At Andrew's Shop, we are
              committed to bringing you only the best items, from fashion to electronics, with a focus on quality,
              affordability, and convenience. Start your journey with us and find something special today!
            </p>
            <NuxtLink :to="{ name: 'Product' }">
              <button
                  class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                Go Shopping
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[600px] h-[300px]">
      <img class="w-full h-full object-cover" src="https://i.ibb.co/ck1SGFJ/Group.png"/>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
