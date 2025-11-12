<template>
  <div class="view-pricing">
    <Header />
    <PricingHero :heading="heroHeading" :subheading="heroSubheading" />
    <PricingPriceCards :productSortiment="productSortiment" />
    <PricingWaranty />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import PricingHero from "@/components/headings/Page-Heading.vue";
import PricingPriceCards from "@/components/pricing/Pricing-Price-Cards.vue";
import PricingWaranty from "@/components/pricing/Pricing-Waranty.vue";
import Footer from "@/components/footer/Footer.vue";

import { ProductSortiment } from "@/assets/ProductSortiment.js";

export default {
  name: "ViewPricing",
  components: {
    Header,
    PricingHero,
    PricingPriceCards,
    PricingWaranty,
    Footer,
  },
  data() {
    return {
      productSortiment: ProductSortiment,
      heroHeading: "Finde das beste Angebot für deine Klausurenphase.",
      heroSubheading:
        "Wähle das passende Paket für deine Prüfungsvorbereitung und starte noch heute mit KI-gestütztem Lernen und Üben.",
    };
  },
};
</script>
