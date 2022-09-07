<template>
  <div class="pt-20 px-6 lg:px-10 min-h-screen">
    <div class="text-2xl font-bold">Search</div>
    <form action="" @submit.prevent="handleSearchSubmit" class="mt-4">
      <input
        type="text"
        placeholder="search"
        class="border lg:w-72 pl-4 pr-10 py-2"
        v-model="search"
      />
      <button
        class="bg-primary text-white px-10 py-2 rounded-2xl"
        type="submit"
      >
        SUBMIT
      </button>
    </form>
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
import ArticleCard from "~/components/Reusables/ArticleCard.vue";
export default {
  components: {
    ArticleCard,
  },
  data: () => ({
    search: "",
    articles: [],
    page: 1,
  }),
  methods: {
    async handleSearchSubmit() {
      try {
        const articles = await this.$axios.$get(
          `/items/articles?filter[status]=published&limit=10&page=1&search=${this.search}&fields=title, thumbnail, date_created, slug, category.slug, views`
        );
        console.log(articles);
        this.articles = [...articles.data];
      } catch (error) {}
    },
    async handleScrollPagination() {
      try {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        // When the user is [modifier]px from the bottom, fire the event.
        let modifier = 50;
        if (currentScroll + modifier > documentHeight) {
          this.page = this.page + 1;
          const articles = await this.$axios.$get(
            `/items/articles?filter[status]=published&limit=10&page=${this.page}&search=${this.search}&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, slug, category.slug, views`
          );

          this.articles = [...this.articles, ...articles.data];
        }
      } catch (error) {
        console.log("error");
      }
    },
  },

  mounted() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScrollPagination);
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("scroll", this.handleScrollPagination);
    }
  },
};
</script>

<style></style>
