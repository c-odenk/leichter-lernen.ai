<template>
  <div class="view-login">
    <Header />
    <h1>Login</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewLogin",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-login {
}
</style>
