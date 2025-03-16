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
        <router-link to="/login"> Jetzt ausprobieren </router-link>
      </div>
      <div class="landing-hero_image" aria-hidden="true">
        <!-- Hintergrundbild wird per CSS geladen -->
      </div>
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

.landing-hero {
  width: 100%;
  margin: $spacing-lg 0;
  padding: 0 $spacing-sm;
  box-sizing: border-box;

  // Content-Container mixin anwenden für responsive Breite
  &_container {
    @include content-container;
    @include flex-between;
    gap: $spacing-lg;

    @include respond(tablet) {
      flex-direction: column;
      gap: $spacing-md;
    }
  }

  &_content {
    width: 50%;

    @include respond(tablet) {
      width: 100%;
      text-align: center;
    }

    h1 {
      margin: 0;
      font-size: 40px; // Feste Größe wie gewünscht
      line-height: 1.2;
      letter-spacing: $letter-spacing;
      color: $color-dark-blue;

      .highlight {
        color: $color-light-blue;
      }

      @include respond(laptop) {
        font-size: 36px;
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

      @include respond(tablet) {
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }

    & a {
      @include primary-button;
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
    }

    @include respond(phone) {
      height: 300px;
    }
  }
}
</style>
