<template>
  <div class="landing-hero">
    <div class="landing-hero_row">
      <div class="landing-hero_row_col-1">
        <h1>
          Effizienter <span class="orange">lernen mit KI</span> – schneller
          verstehen, besser merken!
        </h1>
        <p>
          Automatische Zusammenfassungen, smarte Lernkarten und ein
          intelligenter KI-Tutor für all deine Fragen.
          <b>Lerne schneller, effektiver und ohne Umwege!</b>
        </p>
        <router-link to="/#"> Get started </router-link>
      </div>
      <div class="landing-hero_row_col-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-hero {
  width: 100%;
  margin: 50px 0;

  @include respond(laptop) {
  }

  @include respond(tablet) {
  }

  @include respond(phone) {
  }

  &_row {
    width: $width-desktop;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    &_col-1 {
      width: 40%;

      & h1 {
        margin: 0 0 0 0;
        padding: 0;
        font-size: 40px;
        line-height: 1;
        letter-spacing: $letter-spacing;

        & .orange {
          // color: $color-orange;
        }
      }

      & p {
        margin: 20px 0 40px 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
      }

      & a {
        display: inline-block;
        margin: 0;
        padding: 15px 60px;
        text-decoration: none;
        // font-weight: bold;
        // color: $color-orange;
        // background-color: $color-orange;
        // background-color: $color-img-platzhalter;
        // background-color: $color-teal;
        background-color: $color-dark-blue;
        border-radius: 8px;
        transition: background-color 0.3s ease;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
        color: #fff;

        &:hover {
          // background-color: lighten($color-orange, 10%);
        }

        @include respond(laptop) {
        }

        @include respond(tablet) {
        }

        @include respond(phone) {
        }
      }
    }

    &_col-2 {
      width: 47.5%;
      height: 700px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("~@/assets/background-image-hero.avif");
      border-radius: 15px;
    }
  }
}
</style>
