<template>
  <div class="landing-faq">
    <div class="landing-faq_row">
      <div class="landing-faq_col-1">
        <h2>💡 {{ heading }}</h2>
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
            <div class="faq-item__icon-wrapper">
              <i
                :class="[
                  'fa-solid',
                  'fa-chevron-down',
                  'faq-item__icon',
                  { 'faq-item__icon--rotated': activeIndex === index },
                ]"
              ></i>
            </div>
          </div>
          <div class="faq-item__answer" v-show="activeIndex === index">
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
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-faq {
  width: 100%;
  margin: calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg) 0 calc($spacing-lg + 50px) 0;
  }

  @include respond(tablet) {
    margin: calc($spacing-lg + 20px) 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0;
  }

  &_row {
    @include content-container;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
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
        margin: 0 0 $spacing-xs 0;
        text-align: center;
        font-size: $font-size-h2-md;
      }

      @include respond(phone) {
        margin: 0 0 $spacing-md 0;
        text-align: center;
        font-size: $font-size-h2-sm;
      }
    }

    & p {
      width: 80%;
      margin: 0;
      padding: 0;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;

      @include respond(laptop) {
        width: 90%;
        font-size: $font-size-p-laptop;
        letter-spacing: $letter-spacing-p-laptop;
      }

      @include respond(tablet) {
        width: 100%;
        text-align: center;
        font-size: $font-size-p-tablet;
        letter-spacing: $letter-spacing-p-tablet;
      }

      @include respond(phone) {
        width: 100%;
        font-size: $font-size-p-phone;
        letter-spacing: $letter-spacing-p-phone;
        text-align: center;
      }
    }
  }

  &_col-2 {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @include respond(tablet) {
      width: 100%;
    }

    @include respond(phone) {
      width: 100%;
    }
  }
}

.faq-item {
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: $spacing-md;
  box-sizing: border-box;
  transition: all $transition-speed-medium $transition-timing;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @include respond(tablet-down) {
    padding: $spacing-sm;
  }

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  &--active {
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);

    .faq-item__icon-wrapper {
      background-color: #3b82f6;

      .faq-item__icon {
        color: white;
      }
    }
  }

  &__question {
    @include flex-between;
    align-items: flex-start;
    gap: $spacing-sm;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-size: calc($font-size-h3-lg - 1px);
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
    flex: 1;

    @include respond(laptop) {
      font-size: calc($font-size-h3-lg - 2px);
    }

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }

  &__icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-speed-medium $transition-timing;
    flex-shrink: 0;

    @include respond(phone) {
      width: 28px;
      height: 28px;
    }
  }

  &__icon {
    font-size: 14px;
    color: #6b7280;
    transition: all $transition-speed-medium $transition-timing;
    transform: rotate(0deg);

    @include respond(phone) {
      font-size: 12px;
    }

    &--rotated {
      transform: rotate(180deg);
    }
  }

  &__answer {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid #f3f4f6;

    @include respond(tablet) {
      margin-top: $spacing-sm;
      padding-top: $spacing-sm;
    }
  }

  &__text {
    margin: 0;
    padding: 0;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;

    @include respond(laptop) {
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
      line-height: $line-height-p-laptop;
    }

    @include respond(tablet) {
      font-size: $font-size-p-tablet;
      letter-spacing: $letter-spacing-p-tablet;
      line-height: $line-height-p-tablet;
    }

    @include respond(phone) {
      font-size: $font-size-p-phone;
      letter-spacing: $letter-spacing-p-phone;
      line-height: $line-height-p-phone;
    }
  }
}
</style>
