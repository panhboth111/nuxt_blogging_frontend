<template>
  <div
    class="relative bg-gray-100 dark:bg-black transition ease-in-out duration-700 layout"
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

<style>
.layout {
  transition: ease-in-out 0.7s;
  -webkit-transition: ease-in-out 0.7s;
}
</style>
