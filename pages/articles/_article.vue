<template>
  <div class="pt-20 px-2 lg:px-10 grid grid-cols-1 lg:grid-cols-article gap-6">
    <div>
      <div
        class="bg-white dark:bg-gray-900 dark:text-white p-10 filter drop-shadow-2xl rounded-3xl flex justify-center items-center"
      >
        <!-- title and detail -->
        <div>
          <div class="text-2xl lg:text-5xl font-bold">{{ article.title }}</div>
          <div class="my-2"><hr /></div>
          <div class="pl-2 font-thin">
            <span class="text-primary mr-4">{{
              formatDate(article.date_created)
            }}</span
            ><span>{{ article.views }} views</span>
          </div>
        </div>
      </div>
      <!-- next articles -->
      <div
        class="bg-white dark:bg-gray-900 filter drop-shadow-xl lg:drop-shadow-2xl mt-6 sticky top-4 py-10 px-16 rounded-2xl h-next_articles overflow-scroll hidden lg:block"
      >
        <div class="font-bold dark:text-white text-2xl">RELATED ARTICLES</div>
        <div class="grid grid-cols-1 gap-4 mt-6">
          <ArticleCard
            v-for="(article, index) in nextArticles"
            :key="index"
            :article="article"
          />
        </div>
      </div>
    </div>
    <!-- body -->
    <div
      class="p-4 lg:p-10 bg-white dark:bg-gray-900 dark:text-white filter drop-shadow-xl lg:drop-shadow-2xl rounded-3xl"
    >
      <img
        :src="apiUrl + '/assets/' + article.thumbnail"
        alt=""
        class="w-full rounded-2xl mt-4"
      />
      <div class="py-10 px-2">
        <p v-html="article.body" class="article_body font-light"></p>
      </div>
    </div>
    <div
      class="bg-white filter drop-shadow-2xl rounded-3xl px-4 py-10 lg:hidden h-102"
    >
      <div class="font-bold text-xl px-2">RELATED ARTICLES</div>
      <VueSlickCarousel
        :speed="500"
        :arrows="false"
        :slidesToShow="1"
        :slidesToScroll="1"
        :edgeFriction="0.35"
        :dots="true"
        dotsClass="slick-dots text-red-300"
        class=""
      >
        <ArticleCard
          v-for="(a, n) in nextArticles"
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
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "og:image",
          name: "og:image",
          content: this.apiUrl + "/assets/" + this.article.thumbnail,
        },

        {
          hid: "og:title",
          name: "og:title",
          content: this.article.title,
        },
        {
          hid: "image",
          name: "image",
          content: this.apiUrl + "/assets/" + this.article.thumbnail,
        },
      ],
    };
  },
  components: {
    ArticleCard,
    VueSlickCarousel,
  },
  computed: {
    apiUrl() {
      return process.env.API_URL;
    },
  },
  async asyncData({ params, $axios }) {
    const article = await $axios.$get(
      encodeURI(
        `/items/articles?filter[status]=published&filter[slug][_eq]=${params.article}&fields=title,id,keywords,body,slug,thumbnail, thumbnail_facebook,date_created,views,category.name,category.slug   `
      )
    );
    const nextArticles = await $axios.$get(
      encodeURI(
        `/items/articles?limit=4&sort=-date_created&filter[status]=published&filter[slug][_neq]=${params.article}&fields=title,thumbnail, date_created,views,user_created.first_name, user_created.last_name, slug, category.slug, category.name`
      )
    );
    return {
      article: article.data[0],
      nextArticles: nextArticles.data,
    };
  },
  methods: {
    formatDate(d) {
      var date = new Date(d);
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var day = date.getDate();
      var month = months[date.getMonth()];
      return month + " " + day + " " + date.getFullYear();
    },
    async onArticleViewed() {
      // console.log("article viewed");
      const response = await this.$axios.$get(
        "/articles/views/" + this.$route.params.article
      );
    },
  },
  async created() {
    if (process.client) {
      await this.onArticleViewed();
    }
  },
};
</script>

<style>
.article_body a {
  text-decoration: underline;
  font-weight: bold;
  color: #e50914;
}
.article_body {
  line-height: 2;
}
.article_body strong {
  font-weight: 900;
  line-height: 1.5;
}
.article_body img {
  margin: 2rem 0;
  border-radius: 1.5rem;
}
</style>
