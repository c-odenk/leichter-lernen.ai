<template>
  <div class="landing-cta">
    <div class="landing-cta_row">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
      <LinkButtonBlue text="Jetzt ausprobieren" to="/login" />
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
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-cta {
  width: 100%;
  margin: calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0;
  }

  &_row {
    @include content-container;
    margin: 0 auto;
    padding: 190px 0;
    text-align: center;
    border-radius: $border-radius-lg;
    background-color: $color-dark-blue;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 150 Q200 100, 350 175 T 500 200' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M0 175 Q200 125, 350 200 T 500 225' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M500 400 Q375 450, 250 425 T 0 450' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M500 425 Q375 475, 250 450 T 0 475' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M500 500 Q300 525, 150 500 T 0 525' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M500 525 Q300 550, 150 525 T 0 550' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    position: relative;
    overflow: hidden;

    @include respond(laptop) {
      padding: 140px 0;
    }

    @include respond(tablet) {
      padding: 80px $spacing-md;
      border-radius: $border-radius-md;
    }

    @include respond(phone) {
      padding: calc($spacing-lg) $spacing-md;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(48, 131, 233, 0.015) 0%,
        rgba(23, 43, 77, 0.12) 100%
      );
      z-index: 1;
    }

    & h2 {
      margin: 0;
      padding: 0;
      color: $color-text-white;
      font-size: $font-size-h2-lg;
      position: relative;
      z-index: 2;

      @include respond(laptop) {
        font-size: calc($font-size-h2-lg - 0.1rem);
      }

      @include respond(tablet) {
        font-size: $font-size-h2-md;
      }

      @include respond(phone) {
        font-size: $font-size-h2-sm;
        margin: 0 0 $spacing-sm 0;
      }
    }

    & p {
      width: 60%;
      margin: $spacing-xs auto $spacing-lg auto;
      padding: 0;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      color: $color-text-white;
      position: relative;
      z-index: 2;

      @include respond(laptop) {
        width: 85%;
        margin: $spacing-xs auto $spacing-md auto;
        font-size: $font-size-p-laptop;
        letter-spacing: $letter-spacing-p-laptop;
      }

      @include respond(tablet) {
        width: 90%;
        font-size: $font-size-p-tablet;
        letter-spacing: $letter-spacing-p-tablet;
      }

      @include respond(phone) {
        width: 100%;
        margin: $spacing-xs 0 $spacing-md 0;
        font-size: $font-size-p-phone;
        letter-spacing: $letter-spacing-p-phone;
      }
    }
  }
}
</style>
