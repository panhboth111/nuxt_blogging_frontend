<template>
  <div class="pt-20 px-6 lg:px-10">
    <HeroSection :articles="newestArticles" />
    <CategoriesArticles
      :articles="newestArticles"
      :title="'Latest Articles'"
      :seeMoreLink="`/articles/latest`"
    />
    <CategoriesArticles
      v-for="(c, n) in categoriesArticles"
      :key="n"
      :articles="c.articles"
      :title="c.name"
      :seeMoreLink="`/categories/${c.slug}`"
    />
  </div>
</template>

<script>
import HeroSection from "~/components/Index/HeroSection.vue";
import CategoriesArticles from "~/components/Index/CategoriesArticles.vue";
export default {
  name: "IndexPage",
  layout: "footer",
  components: { HeroSection, CategoriesArticles },
  async asyncData({ $axios }) {
    try {
      const newestArticles = await $axios.$get(
        "/items/articles?filter[status]=published&limit=5&sort=-date_created&fields=title, date_created,slug, thumbnail,category.name, views"
      );
      const categoriesArticles = await $axios.$get(
        "/items/categories?filter[status]=published&sort=-order&fields=name, description, thumbnail, slug, articles.title,  articles.thumbnail,  articles.views, articles.date_created,articles.category.slug, articles.slug&deep[articles][_limit]=4&deep[articles][_sort]=-date_created&deep[articles][_filter][status]=published"
      );
      return {
        newestArticles: newestArticles.data,
        categoriesArticles: categoriesArticles.data,
      };
    } catch (error) {
      console.log(error.message);
      return {
        newestArticles: [],
      };
    }
  },
};
</script>
