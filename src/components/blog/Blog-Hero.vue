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
      width: 80%;
      margin: 0 auto 10px auto;
      font-size: 40px;
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
