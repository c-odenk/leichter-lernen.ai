<template>
  <div class="view-impressum">
    <Header />
    <Impressum />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Impressum from "@/components/impressum/Impressum.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewImpressum",
  components: {
    Header,
    Impressum,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-impressum {
}
</style>
