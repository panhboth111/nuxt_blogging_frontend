<template>
  <div class="mt-6" v-if="articles.length">
    <div class="flex items-center justify-between w-full">
      <p class="font-bold text-lg dark:text-white">{{ title }}</p>
      <nuxt-link :to="`${seeMoreLink}`"
        ><p class="text-primary">SEE MORE</p></nuxt-link
      >
    </div>
    <div
      class="hidden lg:grid lg:grid-cols-4 2xl:grid-cols-4 gap-10 mt-4"
      v-if="articles != undefined && articles.length > 0"
      data-aos="zoom-in-up"
    >
      <ArticleCard v-for="(a, n) in displayArticles" :key="n" :article="a" />
    </div>
    <div
      class="block lg:hidden"
      v-if="articles != undefined && articles.length > 0"
    >
      <VueSlickCarousel
        :speed="500"
        :arrows="true"
        :slidesToShow="1"
        :slidesToScroll="1"
        :edgeFriction="0.35"
        :dots="true"
        dotsClass="slick-dots text-red-300"
        class=""
      >
        <ArticleCard
          v-for="(a, n) in articles"
          :key="n"
          :article="a"
          class="px-2 pb-6"
        />
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import ArticleCard from "~/components/Reusables/ArticleCard.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: {
    title: String,
    articles: Array,
    seeMoreLink: String,
  },
  components: {
    ArticleCard,
    VueSlickCarousel,
  },
  data: () => ({
    displayArticles: [],
  }),
  methods: {
    handleScreenChange(e) {
      let width = parseInt(window.innerWidth);
      let articles = [...this.articles];
      if (width >= 1536) {
        this.displayArticles = [...articles];
      } else if (width < 1536) {
        this.displayArticles = articles.slice(0, 4);
      } else {
        this.displayArticles = articles;
      }
    },
    initialArticles() {
      let width = parseInt(window.innerWidth);
      let articles = [...this.articles];
      if (width >= 1536) {
        this.displayArticles = [...articles];
      } else if (width < 1536) {
        this.displayArticles = articles.slice(0, 4);
      } else {
        this.displayArticles = articles;
      }
    },
  },
  created() {
    if (process.client) {
      this.displayArticles = [...this.articles];
      this.initialArticles();
      window.addEventListener("resize", this.handleScreenChange);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("resize", this.handleScreenChanger);
    }
  },
};
</script>

<style>
button.slick-prev:before,
button.slick-next:before {
  color: black !important;
}
</style>
