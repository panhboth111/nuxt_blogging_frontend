<template>
  <div class="pt-20 px-6 lg:px-10 min-h-screen">
    <HeroSection
      :name="'Latest'"
      :description="'ABOUT GAMING'"
      :image="'/latest.jpg'"
    />
    <div
      class="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      v-if="articles.length"
    >
      <ArticleCard
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import HeroSection from "~/components/Reusables/HeroSection.vue";
import ArticleCard from "~/components/Reusables/ArticleCard.vue";
export default {
  components: { HeroSection, ArticleCard },
  data: () => ({
    currentPage: 1,
  }),
  async asyncData({ app, $axios, route }) {
    try {
      const articles = await $axios.$get(
        `/items/articles?limit=10&sort=-date_created&page=1&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, slug, id, category.name, views, category.slug`
      );
      return {
        articles: articles.data,
      };
    } catch (error) {
      console.log(error.message);
      return {
        articles: [],
      };
    }
  },
  methods: {
    async handleScrollPagination() {
      try {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        // When the user is [modifier]px from the bottom, fire the event.
        let modifier = 50;
        if (currentScroll + modifier > documentHeight) {
          this.currentPage = this.currentPage + 1;
          const nextPageArticles = await this.$axios.$get(
            `/items/articles?limit=10&sort=-date_created&page=${this.currentPage}&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, slug, id, category.name, views`
          );
          this.articles = [...this.articles, ...nextPageArticles.data];
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScrollPagination);
    }
  },
};
</script>

<style></style>
