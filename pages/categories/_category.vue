<template>
  <div class="pt-20 px-6 lg:px-10">
    <HeroSection :category="category" />
    <!-- filter and sort buttons -->
    <div class="my-4">
      <button
        :class="`${
          filter
            ? 'bg-gray-800 dark:bg-gray-400 text-white'
            : 'dark:bg-gray-100'
        } px-6 py-1 text-xs rounded-2xl mr-2 border border-primary text-primary`"
        @click="handleModeSelected(1)"
      >
        Filter
      </button>
      <!-- <button
        :class="`${
          sort
            ? 'bg-gray-800 dark:bg-gray-400 text-white'
            : 'bg-gray-200 dark:bg-gray-100'
        } px-6 py-1 text-xs rounded-2xl mr-2`"
        @click="handleModeSelected(2)"
      >
        Sort
      </button> -->
    </div>
    <!-- date filter -->
    <div class="my-2 dark:text-white" v-if="filter">
      <form @submit.prevent="handleSubmitFilter">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label for="fromDate" class="text-xs pl-2">From Date:</label><br />
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              class="pl-2 pr-4 border py-2 w-full mt-1 rounded-2xl dark:bg-gray-500"
              v-model="date.fromDate"
            />
          </div>
          <div>
            <label for="toDate" class="text-xs pl-2">To Date:</label><br />
            <input
              v-model="date.toDate"
              type="date"
              id="toDate"
              name="toDate"
              class="pl-2 pr-4 border py-2 w-full mt-1 rounded-2xl dark:bg-gray-500"
            />
          </div>
          <div>
            <label for="fromViews" class="text-xs pl-2">From views:</label
            ><br />
            <input
              v-model="views.fromViews"
              type="number"
              id="fromViews"
              name="fromViews"
              class="pl-2 pr-4 border py-2 w-full mt-1 rounded-2xl dark:bg-gray-500"
            />
          </div>
          <div>
            <label for="toViews" class="text-xs pl-2">To views:</label><br />
            <input
              v-model="views.toViews"
              type="number"
              id="toViews"
              name="toViews"
              class="pl-2 pr-4 border py-2 w-full mt-1 rounded-2xl dark:bg-gray-500"
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-primary px-10 text-white py-2 rounded-2xl text-sm mt-4"
        >
          SUBMIT
        </button>
      </form>
    </div>
    <!-- sort -->
    <div v-if="sort">This feature is still in development</div>
    <!-- articles -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-10 mt-8">
      <ArticleCard
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import HeroSection from "~/components/Categories/HeroSection.vue";
import ArticleCard from "~/components/Reusables/ArticleCard.vue";
export default {
  components: { HeroSection, ArticleCard },
  data: () => ({
    page: 1,
    filter: false,
    sort: false,
    date: {
      fromDate: null,
      toDate: null,
    },
    views: {
      fromViews: null,
      toViews: null,
    },
  }),
  async asyncData({ $axios, route }) {
    try {
      const category = await $axios.$get(
        `/items/categories?sort=-date_created&filter[slug][_eq]=${route.params.category}&fields=name, slug,description, thumbnail`
      );
      const articles = await $axios.$get(
        `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug]=${route.params.category}&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, slug, views,id, category.slug`
      );
      return {
        category: category.data[0],
        articles: articles.data,
      };
    } catch (error) {}
  },
  methods: {
    async handleScrollPagination() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = 50;
      if (currentScroll + modifier > documentHeight) {
        this.page = this.page + 1;
        let nextPageArticles;
        let requestString;
        if (this.filter) {
          requestString = `/items/articles?filter[category][slug]=${
            this.category.slug
          }${
            this.date.fromDate && this.date.toDate
              ? `&filter[date_created][_between]=${this.date.fromDate}, ${this.date.toDate}`
              : ""
          }${
            this.views.fromViews && this.views.toViews
              ? `&filter[views][_between]=${this.views.fromViews}, ${this.views.toViews}`
              : ""
          }&limit=10&page=${this.page}`;
        } else {
          requestString = `/items/articles?10&sort=-date_created&page=${this.page}&filter[category][slug]=${this.category.slug}&fields=title, body, thumbnail, date_created, slug, views`;
        }

        nextPageArticles = await this.$axios.$get(requestString);
        console.log(nextPageArticles.data);
        this.articles = [...this.articles, ...nextPageArticles.data];
      }
    },
    async handleModeSelected(mode) {
      if (mode == 1) {
        if (this.filter) {
          this.filter = false;
          this.date = {
            fromDate: null,
            toDate: null,
          };
          this.views = {
            fromViews: null,
            toViews: null,
          };
          const articles = await this.$axios.$get(
            `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug]=${this.category.slug}&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, slug, views,id, category.slug`
          );
          this.articles = [...articles.data];
        } else {
          this.filter = true;
        }
        this.sort = false;
        return;
      }
      this.filter = false;
      this.sort = !this.sort;
    },
    async handleSubmitFilter() {
      try {
        this.page = 1;
        const requestString = `/items/articles?filter[category][slug]=${
          this.category.slug
        }&
        ${
          this.date.fromDate && this.date.toDate
            ? `&filter[date_created][_between]=${this.date.fromDate}, ${this.date.toDate}`
            : ""
        }${
          this.views.fromViews && this.views.toViews
            ? `&filter[views][_between]=${this.views.fromViews}, ${this.views.toViews}`
            : ""
        }&limit=10&page=${this.page}`;
        console.log(requestString);
        const response = await this.$axios.$get(requestString);
        this.articles = [...response.data];
      } catch (error) {}
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
