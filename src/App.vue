<template>
  <router-view />
</template>

<style lang="scss">
@import "@/variables/variables.scss";

/* Globaler Font: exakt wie lokal (Systemfonts) */
body,
#app {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500; /* optional: 400/500/600 nach Geschmack */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overscroll-behavior: none;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
</style>
