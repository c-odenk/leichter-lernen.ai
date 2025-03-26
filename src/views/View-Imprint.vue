<template>
  <div class="view-impressum">
    <Header />
    <Impressum />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Impressum from "@/components/impressum/Imprint.vue";
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
@use "../variables/variables.scss" as *;

.view-impressum {
}
</style>
