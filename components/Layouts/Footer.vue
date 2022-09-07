<template>
  <div class="h-96 bg-gray-700 px-4 lg:px-10 py-8">
    <div class="flex flex-col items-center justify-center h-full">
      <div
        class="text-3xl cursor-pointer lg:text-5xl font-bold text-primary w-full text-center"
        @click="closeDrawer('/')"
      >
        GAMIFY
      </div>
      <ul class="flex justify-center items-center text-white list-none mt-6">
        <nuxt-link
          to="/"
          class="px-4 hover:text-primary transition ease-in-out duration-700"
          ><li>Home</li></nuxt-link
        >
        <nuxt-link
          v-for="(category, index) in categories"
          :key="index"
          :to="`/categories/${category.slug}`"
          class="px-4 hover:text-primary transition ease-in-out duration-700"
          ><li>{{ category.name }}</li></nuxt-link
        >
      </ul>
      <div class="text-center w-104 text-white mt-6">
        This is not an official website. This website was developed by a student
        of the Kirirom Institute of Technology for learning purposes only. The
        articles an images here were copied from other websites just for demo
        purpose. I do not own any of the content on this website except for the
        code. The orignal websites are listed below. If I failed to mention any
        website, please understand that this is a website I created to learn. I
        am not making any profit off of this website. Thank you.
      </div>
      <ul class="flex justify-center items-center text-white list-none mt-6">
        <a
          href="https://www.epicgames.com/fortnite/en-US/news"
          target="_blank"
          class="mx-6"
          >EPIC GAMES NEWS</a
        >
        <a href="https://www.dota2.com/news" target="_blank" class="mx-6"
          >DOTA2 NEWS</a
        >
        <a href="https://valorantesports.com/news" class="mx-6" target="_blank"
          >VALORANT NEWS</a
        >
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style>
.divider {
  border: none;
  height: 1px;
  /* Set the hr color */
  color: red; /* old IE */
  background-color: red; /* Modern Browsers */
}
</style>
