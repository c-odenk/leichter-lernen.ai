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
        "Lernen mit Vertrauen: Solltest du mit deinem Lernpaket nicht zufrieden sein, finden wir für dich eine passende Lösung – versprochen!",
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
    padding: 100px 50px;
    background-color: $color-dark-blue;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.2'%3E%3Cpath d='M0 200 Q125 250, 250 225 T 500 250' fill='none' stroke='%233083e9' stroke-width='0.8' /%3E%3C/g%3E%3Cg opacity='0.15'%3E%3Cpath d='M0 300 Q200 250, 350 325 T 500 350' fill='none' stroke='%23ffffff' stroke-width='0.5' /%3E%3C/g%3E%3Cg opacity='0.2'%3E%3Cpath d='M500 275 Q375 325, 250 300 T 0 325' fill='none' stroke='%233083e9' stroke-width='0.8' /%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    background-position: center;
    border-radius: $border-radius-lg;
    box-sizing: border-box;
    box-shadow: $shadow-lg;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(48, 131, 233, 0.01) 0%,
        rgba(23, 43, 77, 0.08) 100%
      );
      z-index: 1;
    }

    @include respond(laptop) {
      width: 75%;
      padding: $spacing-lg $spacing-md;
    }

    @include respond(tablet) {
      width: 85%;
      padding: $spacing-md;
      margin: $spacing-md auto;
      border-radius: $border-radius-md;
    }

    @include respond(phone) {
      width: 95%;
      padding: $spacing-md $spacing-sm;
      margin: $spacing-sm auto;
      border-radius: $border-radius-sm;
    }

    & h2 {
      margin: 0 0 $spacing-xs 0;
      padding: 0;
      color: $color-text-white;
      font-size: $font-size-h2-lg;
      position: relative;
      z-index: 2;

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
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;
      position: relative;
      z-index: 2;

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
