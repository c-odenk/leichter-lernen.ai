<template>
  <div class="view-pitch">
    <Header />
    <h1>Pitch</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewPitch",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-pitch {
}
</style>
