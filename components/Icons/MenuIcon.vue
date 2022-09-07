<template>
  <div
    @click="toggleDrawer"
    class="border-2 rounded-md border-gray-500 p-2 lg:hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 dark:text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    toggleDrawer: Function,
  },
};
</script>

<style></style>
