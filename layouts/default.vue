<template>
  <div
    class="relative bg-gray-100 dark:bg-black transition ease-in-out duration-700"
  >
    <div>
      <Navbar />
    </div>
    <div class="pb-20">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Layouts/Navbar.vue";

export default {
  components: { Navbar },
};
</script>

<style></style>
