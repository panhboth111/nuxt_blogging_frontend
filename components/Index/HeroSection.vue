<template>
  <div
    :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${
        apiUrl + '/assets/' + articles[currentIndex].thumbnail
      })`,
    }"
    class="w-full h-80 lg:h-104 object-cover bg-center bg-no-repeat bg-cover rounded-3xl relative"
  >
    <div
      class="text-white absolute bottom-0 lg:pl-20 pl-4 lg:pb-40 pb-10 lg:w-104"
    >
      <div class="text-2xl lg:text-5xl font-bold">
        {{ articles[currentIndex].title }}
      </div>
      <div>
        <nuxt-link :to="`/articles/${articles[currentIndex].slug}`">
          <button
            class="bg-primary text-white px-10 py-2 mt-4 rounded-lg hover:bg-opacity-0 border border-primary transition ease-in-out duration-700"
          >
            READ MORE
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
  },
  data: () => ({
    currentIndex: 0,
  }),
  computed: {
    apiUrl() {
      return process.env.API_URL;
    },
  },
  methods: {
    autoPlayCarousel() {
      setInterval(() => {
        if (this.currentIndex == this.articles.length - 1) {
          this.currentIndex = 0;
          return;
        }
        this.currentIndex += 1;
      }, 5000);
    },
  },
  mounted() {
    this.autoPlayCarousel();
  },
};
</script>

<style></style>
