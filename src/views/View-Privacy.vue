<template>
  <div class="view-privacy">
    <Header />
    <h1>Privacy</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewPrivacy",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-privacy {
}
</style>
