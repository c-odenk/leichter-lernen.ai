<template>
  <section class="benefits">
    <div class="benefits_header">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>

    <div class="benefits__container">
      <!-- Erste Spalte: Lernmaterialien -->
      <div class="benefits__content-column">
        <div class="benefits__content-inner">
          <h3 class="benefits__column-title">{{ column1.title }}</h3>
          <p class="benefits__column-text">{{ column1.description }}</p>
        </div>
      </div>

      <!-- Zweite Spalte: KI Tutor -->
      <div class="benefits__content-column">
        <div class="benefits__content-inner">
          <h3 class="benefits__column-title">{{ column2.title }}</h3>
          <p class="benefits__column-text">{{ column2.description }}</p>
        </div>
      </div>

      <!-- Dritte Spalte: Bild/Grafik -->
      <div class="benefits__image-column">
        <!-- Hier wird später ein Bild eingefügt, vorerst ein Platzhalter -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",

  data() {
    return {
      heading: "Lerne effizienter mit KI-Unterstützung",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",

      column1: {
        title: "🚀 Umfassende Lernmaterialien erstellen",
        description:
          "Lade deine Vorlesungsskripte hoch und unsere KI generiert für dich prägnante Zusammenfassungen und interaktive Lernkarten. Erfasse wichtige Inhalte schneller und prägse dir dein Wissen mit der Spaced Repetition Methode langfristig ein.",
      },

      column2: {
        title: "💡 Dein persönlicher KI-Tutor",
        description:
          "Stelle Fragen zu deinem Lernstoff und erhalte in Echtzeit fundierte Antworten von deinem persönlichen KI-Tutor. So erkennst du Wissenslücken, vertiefst dein Verständnis und lernst effektiver und zeitsparender.",
      },
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

.benefits {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0 $spacing-md 0;
  }

  &_header {
    @include content-container;
    margin-bottom: $spacing-lg;

    @include respond(tablet) {
      margin-bottom: $spacing-md;
    }

    @include respond(phone) {
      margin-bottom: $spacing-sm;
    }

    & h2 {
      margin: 0 0 $spacing-xs 0;
      padding: 0;
      text-align: center;
      font-size: $font-size-h2-lg;

      @include respond(tablet) {
        font-size: $font-size-h2-md;
      }

      @include respond(phone) {
        font-size: $font-size-h2-sm;
      }
    }

    & p {
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      text-align: center; /* Immer zentriert */

      @include respond(laptop) {
        width: 70%;
        font-size: $font-size-p-lg;
      }

      @include respond(tablet) {
        width: 80%;
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        width: 95%;
        font-size: $font-size-p-sm;
        margin-bottom: $spacing-md;
      }
    }
  }

  &__container {
    @include content-container;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: $spacing-sm;

    @include respond(tablet) {
      flex-direction: column;
      gap: $spacing-sm;
    }

    @include respond(phone) {
      flex-direction: column;
      gap: $spacing-sm;
    }
  }

  &__content-column {
    width: 30%;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;
    background-color: $color-text-white;
    overflow: hidden;
    transition: transform $transition-speed-medium,
      box-shadow $transition-speed-medium;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-lg;
    }

    @include respond(laptop) {
      width: 30%;
    }

    @include respond(tablet) {
      width: 100%;
      margin-bottom: $spacing-md;
    }

    @include respond(phone) {
      width: 100%;
      margin-bottom: $spacing-md;
    }
  }

  &__content-inner {
    padding: $spacing-lg;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23ffffff' /%3E%3Cg opacity='0.15'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    position: relative;

    @include respond(laptop) {
      padding: $spacing-md;
    }

    @include respond(tablet) {
      padding: $spacing-md;
    }

    @include respond(phone) {
      padding: $spacing-sm;
    }
  }

  &__column-title {
    margin: 0 0 $spacing-md 0;
    padding: 0;
    font-size: $font-size-h3-lg;
    color: $color-dark-blue;
    position: relative;
    z-index: 1;

    @include respond(laptop) {
      font-size: $font-size-h3-md;
      margin-bottom: $spacing-sm;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
      margin-bottom: $spacing-sm;
    }
  }

  &__column-text {
    margin: 0;
    padding: 0;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-size: $font-size-p-xl;
    color: $color-text-dark;
    flex-grow: 1;
    position: relative;
    z-index: 1;

    @include respond(laptop) {
      font-size: $font-size-p-lg;
    }

    @include respond(tablet) {
      font-size: $font-size-p-md;
    }

    @include respond(phone) {
      font-size: $font-size-p-sm;
    }
  }

  &__image-column {
    width: 40%;
    background-color: $color-dark-blue;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;
    position: relative;
    overflow: hidden;
    min-height: 400px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 150 Q200 100, 350 175 T 500 200' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M0 175 Q200 125, 350 200 T 500 225' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M500 400 Q375 450, 250 425 T 0 450' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M500 425 Q375 475, 250 450 T 0 475' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M500 500 Q300 525, 150 500 T 0 525' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M500 525 Q300 550, 150 525 T 0 550' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3C/svg%3E");
      background-size: cover;
      opacity: 0.8;
      z-index: 1;
    }

    @include respond(laptop) {
      width: 40%;
      min-height: 350px;
    }

    @include respond(tablet) {
      width: 100%;
      height: 300px;
      min-height: auto;
    }

    @include respond(phone) {
      width: 100%;
      height: 250px;
      min-height: auto;
    }
  }
}
</style>
