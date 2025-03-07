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
    margin: 50px auto 100px auto;
    padding: 100px 50px;
    background-color: $color-dark-blue;
    border-radius: 15px;
    box-sizing: border-box;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & h2 {
      margin: 0 0 10px 0;
      padding: 0;
      color: #fff;
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: #fff;
    }
  }
}
</style>
