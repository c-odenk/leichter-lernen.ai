<template>
  <div class="view-product">
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewProduct",
  components: {
    Header,

    Footer,
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-product {
  width: 100%;
  overflow: hidden;
}
</style>
