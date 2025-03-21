<template>
  <section class="landing-hero">
    <div class="landing-hero_container">
      <div class="landing-hero_content">
        <h1>
          Effizienter <span class="highlight">lernen mit KI</span> – schneller
          verstehen, besser merken!
        </h1>
        <p>
          Automatische Zusammenfassungen, smarte Lernkarten und ein
          intelligenter KI-Tutor für all deine Fragen.
          <b>Lerne schneller, effektiver und ohne Umwege!</b>
        </p>
        <LinkButtonBlue text="Jetzt ausprobieren" to="/login" />
      </div>
      <div class="landing-hero_image" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-hero {
  width: 100%;
  margin: calc($spacing-lg + 75px) auto;

  @include respond(laptop) {
    // margin: calc($spacing-lg + 45px) 0;
    margin: calc($spacing-xl - 30px) 0;
  }

  @include respond(tablet) {
    margin: calc($spacing-xl + 20px) 0;
  }

  &_container {
    @include content-container;
    @include flex-between;

    @include respond(tablet) {
      flex-direction: column;
      gap: $spacing-md;
    }
  }

  &_content {
    width: 50%;

    @include respond(laptop) {
      width: 50%;
    }

    @include respond(tablet) {
      width: 90%;
      margin: 0 auto;
      text-align: center;
    }

    @include respond(phone) {
      width: 100%;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 40px;
      line-height: 1.2;
      letter-spacing: $letter-spacing;
      color: $color-dark-blue;

      .highlight {
        color: $color-light-blue;
      }

      @include respond(laptop) {
        font-size: 30px;
      }

      @include respond(phone) {
        font-size: 32px;
      }
    }

    p {
      margin: $spacing-md 0 $spacing-lg 0;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-dark;

      @include respond(laptop) {
        margin: 10px 0 20px 0;
        font-size: $font-size-p-lg;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }
  }

  &_image {
    width: 45%;
    height: 600px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("~@/assets/background-image-hero.avif");
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;

    @include respond(laptop) {
      height: 450px;
    }

    @include respond(tablet) {
      width: 100%;
      height: 400px;

      display: none;
    }

    @include respond(phone) {
      height: 300px;
    }
  }
}
</style>
