<template>
  <section class="benefits">
    <div class="benefits__header">
      <h2 class="benefits__title">⚡ {{ heading }}</h2>
      <p class="benefits__subtitle">{{ subheading }}</p>
    </div>

    <div class="benefits__grid">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefits__card"
        :style="{ backgroundImage: `url(${benefit.image})` }"
      >
        <div class="benefits__content">
          <h3 class="benefits__card-title">{{ benefit.title }}</h3>
          <p class="benefits__card-text">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Hauptüberschrift der Benefits-Sektion
       * Betont den zentralen Mehrwert der Plattform (effizienteres Lernen)
       */
      heading: "Lerne effizienter mit KI-Unterstützung",

      /**
       * Erweiterter Text unter der Hauptüberschrift
       * Erklärt die konkreten Vorteile für den Lernenden
       */
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",

      /**
       * Array mit den drei Hauptvorteilen/Funktionen
       * Jeder Vorteil enthält einen Titel mit Emoji, eine Beschreibung und ein Hintergrundbild
       */
      benefits: [
        {
          title: "🚀 Schnelle Zusammenfassungen in wenigen Sekunden",
          description:
            "Lade deine Vorlesungsskripte hoch und erhalte prägnante Zusammenfassungen. So erfasst du die wichtigsten Inhalte schneller sparst wertvolle Lernzeit.",
          image: require("@/assets/studying.jpg"),
        },
        {
          title: "🎯 Interaktive Lernkarten mit smarter Wiederholung",
          description:
            "Unsere KI generiert automatisch Lernkarten und nutzt die Spaced Repetition Methode. So prägst du dir Wissen effizient ein und erinnerst dich langfristig.",
          image: require("@/assets/examination.jpeg"),
        },
        {
          title: "💡 Dein KI-Tutor beantwortet Fragen in Echtzeit",
          description:
            "Stelle Fragen zu deinem Lernstoff und erhalte direkt fundierte Antworten. So erkennst du Wissenslücken und vertiefst dein Verständnis spielend leicht.",
          image: require("@/assets/tutoring.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.benefits {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: calc($spacing-lg + 50px) 0 $spacing-lg 0;
  }

  &__header {
    @include content-container;
    margin-bottom: $spacing-lg;

    @include respond(tablet) {
      margin-bottom: $spacing-md;
    }

    @include respond(phone) {
      margin-bottom: $spacing-sm;
    }
  }

  &__title {
    margin: 0 0 $spacing-xs;
    padding: 0;
    font-size: $font-size-h2-lg;
    text-align: left;

    @include respond(tablet) {
      font-size: $font-size-h2-md;
      text-align: center;
    }

    @include respond(phone) {
      font-size: $font-size-h2-sm;
      margin-bottom: calc($spacing-xs - 2px);
      text-align: left;
    }
  }

  &__subtitle {
    width: 45%;
    margin: 0;
    padding: 0;
    font-size: $font-size-p-xl;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    text-align: left;

    @include respond(laptop) {
      width: 70%;
      font-size: calc($font-size-p-md + 2px);
    }

    @include respond(tablet) {
      width: 80%;
      margin: 0 auto;
      font-size: $font-size-p-md;
      text-align: center;
    }

    @include respond(phone) {
      width: 100%;
      font-size: $font-size-p-sm;
      text-align: left;
    }
  }

  &__grid {
    @include content-container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include respond(tablet) {
      gap: $spacing-sm;
    }

    @include respond(phone) {
      gap: $spacing-sm;
    }
  }

  &__card {
    width: 32%;
    height: 500px;
    padding: $spacing-md;
    border-radius: $border-radius-lg;
    box-sizing: border-box;
    position: relative;
    color: $color-text-white;
    display: flex;
    align-items: flex-end;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: $shadow-md;
    transition: $transition-speed-medium $transition-timing;
    overflow: hidden;

    @include respond(laptop) {
      height: 400px;
      padding: calc($spacing-md - 10px);
    }

    @include respond(tablet) {
      width: calc(50% - #{$spacing-xs});
      height: 350px;
      margin-bottom: $spacing-sm;
      padding: $spacing-sm;
    }

    @include respond(phone) {
      width: 100%;
      height: 300px;
      margin-bottom: calc($spacing-sm - 10px);
      padding: calc($spacing-sm - 7.5px);
    }

    /* Subtle overlay for better text readability */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0.6) 100%
      );
      z-index: 1;
    }
  }

  &__content {
    background: rgba(0, 0, 0, 0.7);
    padding: $spacing-md $spacing-sm;
    border-radius: $border-radius-md;
    width: 100%;
    text-align: left;
    position: relative;
    z-index: 2;

    @include respond(laptop) {
      padding: $spacing-sm;
    }

    @include respond(tablet) {
      padding: $spacing-sm $spacing-xs;
    }

    @include respond(phone) {
      padding: $spacing-xs;
      text-align: center;
    }
  }

  &__card-title {
    margin: 0;
    padding: 0;
    font-size: $font-size-h3-lg;

    @include respond(laptop) {
      font-size: $font-size-h3-md;
    }

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
      text-align: center;
    }
  }

  &__card-text {
    margin: $spacing-sm 0 $spacing-xs;
    padding: 0;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-size: $font-size-p-lg;

    @include respond(laptop) {
      font-size: calc($font-size-p-md + 1px);
      margin: $spacing-xs 0 0;
    }

    @include respond(tablet) {
      font-size: $font-size-p-md;
      margin: calc($spacing-xs - 2px) 0 0;
    }

    @include respond(phone) {
      font-size: $font-size-p-sm;
      margin: calc($spacing-xs - 4px) 0 0;
      line-height: 1.4;
      text-align: left;
    }
  }
}
</style>
