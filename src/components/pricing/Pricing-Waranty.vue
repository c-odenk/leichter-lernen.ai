<template>
  <div class="pricing-waranty">
    <div class="pricing-waranty_row">
      <h2>{{ heading }}</h2>
      <p>{{ paragraph }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingWarantySection",
  data() {
    return {
      heading: "🛡️ Dein Wissen – Unser Versprechen!",
      paragraph:
        "Lerne mit Vertrauen: Solltest du mit deinem Lernpaket nicht zufrieden sein, finden wir für dich eine passende Lösung – versprochen!",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.pricing-waranty {
  width: 100%;

  &_row {
    width: 62%;
    margin: $spacing-md auto $spacing-xl auto;
    // padding: $spacing-xl $spacing-lg;
    padding: 100px 50px;
    background-color: $color-dark-blue;
    border-radius: $border-radius-lg;
    box-sizing: border-box;
    box-shadow: $shadow-lg;

    @include respond(laptop) {
      width: 75%;
      padding: $spacing-lg $spacing-md;
    }

    @include respond(tablet) {
      width: 85%;
      padding: $spacing-md;
      margin: $spacing-md auto;
    }

    @include respond(phone) {
      width: 95%;
      padding: $spacing-md $spacing-sm;
      margin: $spacing-sm auto;
    }

    & h2 {
      margin: 0 0 $spacing-xs 0;
      padding: 0;
      color: $color-text-white;
      font-size: $font-size-h2-lg;

      @include respond(tablet) {
        font-size: $font-size-h2-md;
      }

      @include respond(phone) {
        font-size: $font-size-h2-sm;
      }
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;

      @include respond(tablet) {
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }
  }
}
</style>
