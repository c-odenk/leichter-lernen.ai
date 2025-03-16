<template>
  <div class="blog-hero">
    <div class="blog-hero_row">
      <h2>{{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogHeroSection",
  data() {
    return {
      heading:
        "Erkenntnisse zu den häufigsten Problemen bei der Prüfungsvorbereitung.",
      subheading:
        "Stressige Prüfungsphasen und die richtige Lernstrategie: in unseren Blogbeiträgen zeigen wir dir, welche Herausforderungen es gibt und wie du sie effektiv überwindest.",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.blog-hero {
  width: 100%;

  &_row {
    @include content-container;
    margin: $spacing-xl auto;
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
      width: 80%;
      margin: 0 auto $spacing-xs auto;
      font-size: $font-size-h1-lg;
      color: $color-dark-blue;
      line-height: $line-height;

      @include respond(tablet) {
        width: 90%;
        font-size: $font-size-h1-md;
      }

      @include respond(phone) {
        width: 100%;
        font-size: $font-size-h1-sm;
      }
    }

    & p {
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-xl;
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
