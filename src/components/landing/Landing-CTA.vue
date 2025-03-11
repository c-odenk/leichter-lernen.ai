<template>
  <div class="landing-cta">
    <div class="landing-cta_row">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
      <router-link to="/#"> Jetzt ausprobieren </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTASection",
  data() {
    return {
      heading: "Effizienter lernen, weniger Zeit verschwenden!",
      subheading:
        "Nutze künstliche Intelligenz, um deine Lernzeit zu optimieren und Wissen effizienter zu verinnerlichen.",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-cta {
  width: 100%;
  margin: 100px 0;

  &_row {
    @include content-container;
    margin: 0 auto;
    padding: 190px 0;
    text-align: center;
    border-radius: $border-radius-lg;
    background-color: $color-dark-blue;
    box-shadow: $shadow-lg;

    @include respond(laptop) {
      padding: $spacing-xl 0;
    }

    @include respond(tablet) {
      padding: $spacing-lg 0;
      border-radius: $border-radius-md;
    }

    @include respond(phone) {
      padding: $spacing-md 0;
      border-radius: $border-radius-sm;
    }

    & h2 {
      margin: 0;
      padding: 0;
      color: $color-text-white;
      font-size: $font-size-h2-lg;

      @include respond(tablet) {
        font-size: $font-size-h2-md;
        padding: 0 $spacing-md;
      }

      @include respond(phone) {
        font-size: $font-size-h2-sm;
        padding: 0 $spacing-sm;
      }
    }

    & p {
      margin: $spacing-xs 0 $spacing-lg 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;
      width: 60%;
      margin-left: auto;
      margin-right: auto;

      @include respond(tablet) {
        font-size: $font-size-p-md;
        width: 80%;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
        width: 90%;
        margin: $spacing-xs 0 $spacing-md 0;
      }
    }

    & a {
      @include primary-button;
    }
  }
}
</style>
