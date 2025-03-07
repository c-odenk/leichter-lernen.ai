<template>
  <div class="view-dashboard">
    <Header />
    <h1>Dashboard</h1>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewDashboard",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-dashboard {
}
</style>
