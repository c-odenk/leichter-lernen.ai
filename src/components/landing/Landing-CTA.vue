<template>
  <div class="landing-cta">
    <div class="landing-cta_row">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
      <router-link to="/#"> Start now </router-link>
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
    width: $width-desktop;
    margin: 0 auto;
    padding: 190px 0;
    text-align: center;
    border-radius: 15px;
    background-color: $color-dark-blue;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & h2 {
      margin: 0;
      padding: 0;
      color: #fff;
    }

    & p {
      margin: 10px 0 40px 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: #fff;
    }

    & a {
      display: inline-block;
      margin: 0;
      padding: 15px 50px;
      font-size: 18px;
      text-decoration: none;
      color: #fff;
      background-color: $color-light-blue;
      border-radius: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken($color-light-blue, 10%);
      }

      @include respond(laptop) {
      }

      @include respond(tablet) {
      }

      @include respond(phone) {
      }
    }
  }
}
</style>
