<template>
  <div class="landing-faq">
    <div class="landing-faq__row">
      <div class="landing-faq__column-left">
        <h2 class="landing-faq__heading">🔍 {{ heading }}</h2>
        <p class="landing-faq__subheading">{{ subheading }}</p>
      </div>
      <div class="landing-faq__column-right">
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
  data() {
    return {
      heading: "Hast du Fragen? Unsere FAQs helfen dir weiter!",
      subheading:
        "Hier findest du Antworten auf die häufigsten Fragen rund um unser Angebot.",
      activeIndex: null,
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
  methods: {
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-faq {
  width: 100%;
  margin: $spacing-xl $spacing-xs $spacing-xl $spacing-xs;

  &__row {
    // @include content-container;
    width: $width-desktop - 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__column-left {
    width: 50%;

    @include respond(tablet) {
      width: 100%;
      margin-bottom: $spacing-lg;
    }

    @include respond(phone) {
      width: 100%;
    }
  }

  &__column-right {
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

  &__heading {
    margin: 0 0 $spacing-xs 0;
    padding: 0;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-size: $font-size-h2-lg;

    @include respond(tablet) {
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      font-size: $font-size-h2-sm;
    }
  }

  &__subheading {
    margin: 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;

    @include respond(tablet) {
      @include text-content-responsive;
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
  // margin-bottom: $spacing-xs;

  &--active {
    background-color: $color-dark-blue;
    color: $color-text-white;
    box-shadow: $shadow-sm;
    // border-radius: $border-radius-sm $border-radius-sm 0 0;
  }

  &__question {
    @include flex-between;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-size: $font-size-h3-lg;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
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
      @include text-content-responsive;
    }
  }
}
</style>
