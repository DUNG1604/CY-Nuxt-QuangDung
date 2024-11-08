<template>
  <div>
    <div>
      Post Page {{ useRoute().params.id }}
    </div>
    <div>
      <nuxt-link :to="{name:'Test'}">Change</nuxt-link>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "haha"
})
</script>

<style lang="scss" scoped>

</style>