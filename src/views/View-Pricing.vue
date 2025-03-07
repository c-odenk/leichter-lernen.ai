<template>
  <div class="view-pricing">
    <Header />
    <PricingHero />
    <PricingPriceCards />
    <PricingWaranty />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import PricingHero from "@/components/pricing/Pricing-Hero.vue";
import PricingPriceCards from "@/components/pricing/Pricing-Price-Cards.vue";
import PricingWaranty from "@/components/pricing/Pricing-Waranty.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewPricing",
  components: {
    Header,
    PricingHero,
    PricingPriceCards,
    PricingWaranty,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-pricing {
}
</style>
