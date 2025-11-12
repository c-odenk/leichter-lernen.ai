<template>
  <div class="view-landing">
    <Header />
    <div class="section-wrapper" v-for="section in sections" :key="section.key">
      <component :is="section.component" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import LandingHero from "@/components/landing/Landing-Hero-4.vue";
import LandingProduct from "@/components/landing/Landing-Product-2.vue";
import LandingBenefits from "@/components/landing/Landing-Benefits-3.vue";
import LandingTestimonials from "@/components/landing/Landing-Testimonials.vue";
import LandingQA from "@/components/landing/Landing-FAQ.vue";
import LandingCTA from "@/components/landing/Landing-CTA.vue";

export default {
  name: "ViewLanding",
  components: {
    Header,
    Footer,
    LandingHero,
    LandingProduct,
    LandingBenefits,
    LandingTestimonials,
    LandingQA,
    LandingCTA,
  },
  setup() {
    const sections = ref([
      { key: "hero", component: LandingHero },
      { key: "benefits", component: LandingBenefits },
      { key: "product", component: LandingProduct },
      { key: "testimonials", component: LandingTestimonials },
      { key: "cta", component: LandingCTA },
      { key: "qa", component: LandingQA },
    ]);

    return {
      sections,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-landing {
  width: 100%;
  overflow: hidden;
}
</style>
