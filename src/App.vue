<template>
  <router-view />
</template>

<style lang="scss">
@import "@/variables/variables.scss";

#app {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  // height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // overflow-x: hidden;
  overscroll-behavior: none;
}
</style>
