<template>
  <div
    :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${
        apiUrl + '/assets/' + category.thumbnail
      })`,
    }"
    class="w-full h-80 lg:h-100 object-cover bg-center bg-no-repeat bg-cover rounded-3xl relative"
  >
    <div class="absolute bottom-0 left-0 pb-10 pl-6 lg:pb-32 lg:pl-16">
      <div class="text-white font-light">{{ category.name }}</div>
      <div class="text-white lg:text-4xl font-bold uppercase">
        {{ category.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  computed: {
    apiUrl() {
      return process.env.API_URL;
    },
  },
};
</script>

<style></style>
