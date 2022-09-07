<template>
  <div>
    <div class="parent h-72 w-full">
      <div
        class="child h-full w-full bg-no-repeat bg-cover bg-center"
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${'/icon.png'})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "test",
  methods: {
    handleTestClick() {
      const test = document.getElementById("test");
    },
  },
};
</script>

<style>
.parent:hover .child,
.parent:focus .child {
  transform: scale(1.2);
}
</style>
