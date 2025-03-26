<template>
  <div class="view-privacy">
    <Header />
    <Privacy />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Privacy from "@/components/privacy/Privacy.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewPrivacy",
  components: {
    Header,
    Privacy,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-privacy {
}
</style>
