<template>
  <div
    class="relative bg-gray-100 dark:bg-black transition ease-in-out duration-700 layout-default"
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

<style>
.layout-default {
  transition: ease-in-out 0.7s;
  -webkit-transition: ease-in-out 0.7s;
}
</style>
