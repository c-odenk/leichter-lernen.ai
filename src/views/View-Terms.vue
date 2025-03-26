<template>
  <div class="view-terms">
    <Header />
    <Terms />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Terms from "@/components/terms/Terms.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewTerms",
  components: {
    Header,
    Terms,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-terms {
}
</style>
