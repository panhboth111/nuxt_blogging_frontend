<template>
  <div>
    <nav
      :class="`${
        scrollPosition > 0
          ? 'bg-white dark:bg-black border-b border-b-black dark:border-b-white'
          : ''
      }  flex fixed top-0 w-full justify-between items-center lg:items-end px-4 lg:px-10 pb-6 pt-4 z-50 navbar`"
      id="navbar"
    >
      <div class="flex items-end">
        <div
          class="text-3xl cursor-pointer lg:text-4xl font-bold text-primary mr-10"
          @click="closeDrawer('/')"
        >
          GAMIFY
        </div>
        <ul
          class="hidden lg:flex items-center list-none dark:text-white"
          v-show="categories.length"
        >
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
            @click="closeDrawer"
            ><li>{{ category.name }}</li></nuxt-link
          >
        </ul>
      </div>
      <div class="flex items-center">
        <div v-if="$colorMode.preference == 'dark'" class="mr-4">
          <button
            @click="
              $colorMode.preference =
                $colorMode.preference == 'dark' ? 'light' : 'dark'
            "
          >
            <MoonIcon :scrollPosition="scrollPosition" />
          </button>
        </div>
        <div class="mr-4" v-else>
          <button
            @click="
              $colorMode.preference =
                $colorMode.preference == 'dark' ? 'light' : 'dark'
            "
          >
            <SunIcon :scrollPosition="scrollPosition" />
          </button>
        </div>
        <nuxt-link to="/search"
          ><div class="mr-4"><SearchIcon /></div
        ></nuxt-link>
        <div><MenuIcon :toggleDrawer="toggleDrawer" /></div>
      </div>
    </nav>
    <!-- drawer -->
    <div
      class="drawer w-full fixed bg-gray-800 z-50 mt-20 lg:hidden"
      id="drawer"
    >
      <ul
        class="list-none drawer-items text-white font-light text-2xl"
        id="drawer-items"
      >
        <li class="py-4 pl-6 border-b-2" @click="closeDrawer(`/`)">Home</li>
        <li
          v-for="(c, i) in categories"
          :key="i"
          class="py-4 pl-6 border-b-2"
          @click="closeDrawer(`/categories/${c.slug}`)"
        >
          {{ c.name }}
        </li>
        <!-- <nuxt-link
          v-for="(c, i) in categories"
          :key="i"
          :to="`/categories/${c.slug}`"
          @click="closeDrawer"
        >
          <li class="py-4 pl-6 border-b-2">
            {{ c.name }}
          </li>
        </nuxt-link> -->
      </ul>
    </div>
  </div>
</template>

<script>
import SearchIcon from "~/components/Icons/SearchIcon.vue";
import MenuIcon from "~/components/Icons/MenuIcon.vue";
import SunIcon from "~/components/Icons/SunIcon.vue";
import MoonIcon from "~/components/Icons/MoonIcon.vue";
export default {
  components: { SearchIcon, MenuIcon, SunIcon, MoonIcon },
  data: () => ({
    drawer: false,
    scrollPosition: 0,
    lastScroll: 0,
  }),
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.getElementById("navbar");
      if (this.scrollPosition == 0) {
        navbar.style.top = "0";
      }
      if (this.scrollPosition > 0) {
        if (scrollTop > this.lastScroll) {
          navbar.style.top = "-50%";
        } else {
          navbar.style.top = "0";
        }
      }
      this.lastScroll = scrollTop;
    },
    toggleDrawer() {
      const drawer = document.getElementById("drawer");
      const drawer_items = document.getElementById("drawer-items");

      drawer.style.height = this.drawer ? "0" : "100%";
      drawer_items.style.opacity = this.drawer ? "0" : "1";
      this.drawer = !this.drawer;
      if (this.drawer) {
        window.addEventListener("scroll", this.handleDisableScroll);
      } else {
        window.removeEventListener("scroll", this.handleDisableScroll);
      }
    },
    closeDrawer(to) {
      const drawer = document.getElementById("drawer");
      const drawer_items = document.getElementById("drawer-items");
      if (drawer && drawer_items) {
        drawer.style.height = "0";
        drawer_items.style.opacity = "0";
        this.drawer = false;
      }
      this.$router.push(to);
      window.removeEventListener("scroll", this.handleDisableScroll);
      //   this.drawer = false;
    },
    handleDisableScroll() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
.drawer {
  height: 0;
  transition: height 1s;
  overflow: hidden;
}
.drawer-items {
  opacity: 0;
  transition: opacity 1s;
}
.navbar {
  z-index: 2147483647;
  transition: top 0.7s ease-in-out;
}
</style>
