<template>
  <section class="landing-hero">
    <div class="landing-hero_container">
      <div class="landing-hero_container_col-1">
        <h3>✨ Willkommen bei deinem KI-Tutor</h3>
        <h1>
          Effizienter <span class="highlight">lernen mit KI</span> – schneller
          verstehen, besser merken!
        </h1>
        <p>
          Automatische Zusammenfassungen, smarte Lernkarten und ein
          intelligenter KI-Tutor für all deine Fragen.
          <b>Lerne schneller, effektiver und ohne Umwege!</b>
        </p>

        <div class="button-group">
          <LinkButtonBlue to="/login">
            Jetzt ausprobieren <i class="fa-solid fa-arrow-right"></i>
          </LinkButtonBlue>
          <LinkButtonWhite to="/produkt">
            Mehr erfahren <i class="fa-solid fa-magnifying-glass"></i>
          </LinkButtonWhite>
        </div>
      </div>
      <div class="landing-hero_container_col-2" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-hero {
  width: 100%;
  margin: calc($spacing-lg + 75px) auto;

  @include respond(laptop) {
    margin: calc($spacing-lg + 75px) auto;
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

    &_col-1 {
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
        text-align: center;
      }

      h3 {
        display: inline-block;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        padding: 8px 20px;
        border: 1px solid rgba($color-light-blue, 0.25);
        border-radius: 100px;
        font-size: $font-size-p-md;
        font-weight: 500;
        color: $color-light-blue;
        margin-bottom: $spacing-md;
        letter-spacing: $letter-spacing;
        box-shadow: 0 8px 24px rgba($color-light-blue, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);

        display: none;
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
          font-size: 26px;
        }
      }

      p {
        margin: $spacing-md 0 calc($spacing-md + 10px) 0;
        padding: 0;
        font-size: $font-size-p-xl;
        line-height: 1.4;
        letter-spacing: $letter-spacing;
        color: $color-text-dark;

        @include respond(laptop) {
          margin: $spacing-md 0 calc($spacing-md + 10px) 0;
          line-height: 1.5;
        }

        @include respond(phone) {
          margin: $spacing-md 0;
          font-size: $font-size-p-sm;
        }
      }

      .button-group {
        display: flex;
        gap: $spacing-sm;
        flex-wrap: wrap;
        align-items: center;

        @include respond(tablet) {
          justify-content: center;
        }

        @include respond(phone) {
          flex-direction: column;
          width: 100%;
        }
      }
    }

    &_col-2 {
      width: 45%;
      height: 600px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("~@/assets/background-image-hero.avif");
      border-radius: $border-radius-lg;
      box-shadow: $shadow-md;

      @include respond(laptop) {
        height: 500px;
      }

      @include respond(tablet) {
        width: 100%;
        height: 400px;
        display: none;
      }

      @include respond(phone) {
        height: 300px;
        display: none;
      }
    }
  }
}
</style>
