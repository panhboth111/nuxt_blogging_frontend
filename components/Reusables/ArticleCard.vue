<template>
  <nuxt-link :to="`/articles/${article.slug}`">
    <div
      class="p-4 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 filter drop-shadow-lg rounded-2xl lg:my-0 my-4 news-card"
    >
      <img
        format="webp"
        loading="lazy"
        :src="apiUrl + '/assets/' + article.thumbnail"
        alt=""
        class="h-52 w-full object-cover bg-no-repeat bg-center rounded-2xl thumbnail block"
      />
      <div class="mt-2 px-2 flex flex-col justify-between h-24">
        <div class="font-bold text-xl line-clamp-2">{{ article.title }}</div>
        <div class="flex justify-between">
          <div>{{ formatDate(article.date_created) }}</div>
          <div>{{ article.views }} views</div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: Object,
  },
  computed: {
    apiUrl() {
      return process.env.API_URL;
    },
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
  },
};
</script>

<style>
.news-card {
  transform: scale(1);
  transition: 0.3s ease-in-out;
}
@media screen and (min-width: 769px) {
  .news-card:hover {
    transform: scale(1.05);
  }
}
</style>
