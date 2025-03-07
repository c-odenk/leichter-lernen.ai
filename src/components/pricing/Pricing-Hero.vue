<template>
  <div class="pricing-hero">
    <div class="pricing-hero_row">
      <h2>{{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingHeroSection",
  data() {
    return {
      heading: "Finde das beste Angebot für deine Klausurenphase.",
      subheading:
        "Wähle das passende Paket für deine Prüfungsvorbereitung und starte noch heute mit KI-gestütztem Lernen und Üben.",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.pricing-hero {
  width: 100%;

  &_row {
    width: $width-desktop;
    margin: 150px auto 150px auto;
    text-align: center;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & h2 {
      font-size: 40px;
      margin: 0 0 10px 0;
    }

    & p {
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
    }
  }
}
</style>
