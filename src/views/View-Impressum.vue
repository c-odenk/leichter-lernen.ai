<template>
  <div class="view-impressum">
    <Header />
    <h1>Impressum</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewImpressum",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-impressum {
}
</style>
