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
    <div class="mt-10">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Layouts/Navbar.vue";
import Footer from "~/components/Layouts/Footer.vue";
export default {
  components: { Navbar, Footer },
};
</script>

<style></style>
