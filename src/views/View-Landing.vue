<template>
  <div class="view-landing">
    <Header />
    <LandingHero />
    <LandingProduct />
    <LandingBenefits />
    <LandingTestimonials />
    <LandingCTA />
    <LandingQA />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import LandingHero from "@/components/landing/Landing-Hero.vue";
import LandingProduct from "@/components/landing/Landing-Product.vue";
import LandingBenefits from "@/components/landing/Landing-Benefits.vue";
import LandingTestimonials from "@/components/landing/Landing-Testimonials.vue";
import LandingQA from "@/components/landing/Landing-FAQ.vue";
import LandingCTA from "@/components/landing/Landing-CTA.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewLanding",
  components: {
    Header,
    LandingHero,
    LandingProduct,
    LandingBenefits,
    LandingTestimonials,
    LandingQA,
    LandingCTA,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-landing {
}
</style>
