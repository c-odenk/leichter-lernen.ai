<template>
  <div class="landing-cta">
    <div class="landing-cta_row">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
      <router-link to="/login"> Jetzt ausprobieren </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTASection",

  // Reaktive Daten der Komponente
  data() {
    return {
      heading: "Effizienter lernen, weniger Zeit verschwenden!",
      subheading:
        "Nutze künstliche Intelligenz, um deine Lernzeit zu optimieren und Wissen effizienter zu verinnerlichen.",
    };
  },

  // Diese einfache Komponente benötigt keine weiteren Methoden oder Computed Properties,
  // könnte aber in Zukunft erweitert werden, um beispielsweise:
  // - A/B-Tests verschiedener Überschriften und Texte durchzuführen
  // - Tracking der CTA-Button-Klicks zu implementieren
  // - Dynamische Anpassung der Nachricht basierend auf Nutzerverhalten
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-cta {
  width: 100%;
  margin: calc($spacing-lg + 0px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: calc($spacing-lg) 0;
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
    box-shadow: $shadow-lg;
    position: relative;
    overflow: hidden;

    @include respond(laptop) {
      padding: 120px 0;
    }

    @include respond(tablet) {
      padding: $spacing-lg 0;
      border-radius: $border-radius-md;
    }

    @include respond(phone) {
      padding: $spacing-md 0;
      border-radius: $border-radius-sm;
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
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;
      width: 60%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      z-index: 2;

      @include respond(laptop) {
        width: 80%;
        margin: $spacing-xs auto calc($spacing-xs + 15px) auto;
        font-size: $font-size-p-lg;
      }

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
      position: relative;
      z-index: 2;

      @include respond(laptop) {
        font-size: $font-size-p-md;
      }
    }
  }
}
</style>
