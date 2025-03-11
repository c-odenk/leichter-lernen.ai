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
    @include content-container;
    margin: $spacing-xl auto;
    // margin: 150px auto;
    text-align: center;

    @include respond(laptop) {
      margin: $spacing-lg auto;
    }

    @include respond(tablet) {
      margin: $spacing-md auto;
    }

    @include respond(phone) {
      margin: $spacing-sm auto;
    }

    & h2 {
      font-size: $font-size-h1-lg;
      margin: 0 0 $spacing-xs 0;
      color: $color-dark-blue;
      line-height: $line-height;

      @include respond(tablet) {
        font-size: $font-size-h1-md;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
      }

      @include respond(phone) {
        font-size: $font-size-h1-sm;
        width: 100%;
      }
    }

    & p {
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-dark;

      @include respond(tablet) {
        width: 80%;
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        width: 95%;
        font-size: $font-size-p-sm;
      }
    }
  }
}
</style>
