<template>
  <div class="landing-faq">
    <div class="landing-faq_row">
      <div class="landing-faq_col-1">
        <h2>{{ heading }}</h2>
        <p>{{ subheading }}</p>
      </div>
      <div class="landing-faq_col-2">
        <div
          class="faq-item"
          :class="{ 'faq-item--active': activeIndex === index }"
          v-for="(faq, index) in faqs"
          :key="index"
        >
          <div class="faq-item__question" @click="toggleFAQ(index)">
            <h3 class="faq-item__title">
              {{ faq.question }}
            </h3>
            <i
              :class="[
                'fa-solid',
                activeIndex === index ? 'fa-minus' : 'fa-plus',
                'faq-item__icon',
              ]"
            ></i>
          </div>
          <div class="faq-item__answer" v-if="activeIndex === index">
            <p class="faq-item__text">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQSection",

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Hauptüberschrift der FAQ-Sektion
       */
      heading: "Hast du Fragen? Unsere FAQs helfen dir weiter!",

      /**
       * Unterüberschrift/Beschreibung der FAQ-Sektion
       */
      subheading:
        "Hier findest du Antworten auf die häufigsten Fragen rund um unser Angebot.",

      /**
       * Speichert den Index des aktuell geöffneten FAQ-Elements
       * null bedeutet, dass kein Element geöffnet ist
       */
      activeIndex: null,

      /**
       * Array mit den FAQ-Daten
       * Jedes Objekt enthält eine Frage (question) und die zugehörige Antwort (answer)
       */
      faqs: [
        {
          question: "Wie hilft mir die KI beim Lernen?",
          answer:
            "Unsere KI analysiert deine hochgeladenen Skripte, erstellt verständliche Zusammenfassungen, generiert interaktive Lernkarten und beantwortet deine Fragen in einem intelligenten Chat. So lernst du effizienter und sparst Zeit.",
        },
        {
          question: "Welche Dateiformate kann ich hochladen?",
          answer:
            "Du kannst gängige Formate wie PDF, DOCX und TXT hochladen. Unsere KI verarbeitet deine Inhalte und erstellt daraus maßgeschneiderte Lernmaterialien.",
        },
        {
          question: "Wie funktioniert das Wiederholen mit Lernkarten?",
          answer:
            "Die KI erstellt automatisch interaktive Lernkarten aus deinen Unterlagen und nutzt die Spaced Repetition Methode, damit du dir den Stoff langfristig merkst.",
        },
        {
          question:
            "Wie wird die Qualität der Zusammenfassungen und Lernkarten sichergestellt?",
          answer:
            "Unsere KI nutzt fortschrittliche Algorithmen, um die Kernthemen deiner Dokumente zu extrahieren und prägnante, verständliche Zusammenfassungen sowie Lernkarten zu erstellen. Die Qualität wird kontinuierlich optimiert, um den höchsten Standard zu gewährleisten.",
        },
        {
          question: "Kann ich die KI für spezifische Fachbereiche nutzen?",
          answer:
            "Ja, die KI ist flexibel und kann für eine Vielzahl von Fachbereichen genutzt werden. Ob für Ingenieurwissenschaften, Medizin, Wirtschaft oder andere Disziplinen, die Plattform hilft dir, den Stoff effizient zu bearbeiten.",
        },
        {
          question: "Bietet die Plattform Unterstützung für mehrere Sprachen?",
          answer:
            "Zurzeit ist die Plattform auf die deutsche Sprache ausgerichtet. Zusätzliche Sprachunterstützung ist geplant.",
        },
      ],
    };
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Öffnet oder schließt ein FAQ-Element
     * Wenn das Element bereits geöffnet ist, wird es geschlossen (activeIndex = null)
     * Wenn das Element geschlossen ist, wird es geöffnet (activeIndex = index)
     *
     * @param {number} index - Der Index des zu öffnenden/schließenden FAQ-Elements
     */
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-faq {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0 $spacing-xl 0;

  @include respond(laptop) {
  }

  @include respond(tablet) {
    margin: calc($spacing-lg) 0 calc($spacing-lg + 50px) 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0 calc($spacing-lg + 20px) 0;
  }

  &_row {
    @include content-container;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @include respond(tablet) {
    }
  }

  &_col-1 {
    width: 50%;

    @include respond(tablet) {
      width: 100%;
      margin: 0 $spacing-sm $spacing-sm $spacing-sm;
    }

    @include respond(phone) {
      width: 100%;
      margin: 0 $spacing-sm $spacing-md $spacing-sm;
    }

    & h2 {
      margin: 0 0 $spacing-xs 0;
      padding: 0;
      font-size: $font-size-h2-lg;

      @include respond(tablet) {
        font-size: $font-size-h2-md;
        // text-align: center;
      }

      @include respond(phone) {
        font-size: $font-size-h2-sm;
      }
    }

    & p {
      width: 80%;
      margin: 0;
      padding: 0;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;

      @include respond(laptop) {
        width: 70%;
        font-size: $font-size-p-lg;
      }

      @include respond(tablet) {
        width: 80%;
        font-size: $font-size-p-md;
        // text-align: center;
      }

      @include respond(phone) {
        width: 95%;
        font-size: $font-size-p-sm;
      }
    }
  }

  &_col-2 {
    width: 40%;
    display: flex;
    flex-direction: column;

    @include respond(tablet) {
      width: 100%;
    }

    @include respond(phone) {
      width: 100%;
    }
  }
}

.faq-item {
  padding: $spacing-sm;
  border-bottom: 1px solid $color-dark-blue-lighter;
  box-sizing: border-box;
  transition: background-color $transition-speed-medium $transition-timing,
    color $transition-speed-medium $transition-timing;
  cursor: pointer;

  &--active {
    background-color: $color-dark-blue;
    color: $color-text-white;
    box-shadow: $shadow-sm;
  }

  &__question {
    @include flex-between;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-size: calc($font-size-h3-lg - 1px);

    @include respond(laptop) {
      font-size: calc($font-size-h3-lg - 1px);
    }

    @include respond(tablet) {
      width: 100%;
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      width: 90%;
      font-size: $font-size-h3-sm;
    }
  }

  &__icon {
    transition: transform $transition-speed-medium $transition-timing;
  }

  &__answer {
    margin-top: $spacing-sm;
  }

  &__text {
    margin: $spacing-sm 0 $spacing-md 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;

    @include respond(tablet) {
      font-size: $font-size-p-md;
    }

    @include respond(tablet) {
      // @include text-content-responsive;
    }
  }
}
</style>
