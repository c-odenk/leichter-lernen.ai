<template>
  <div class="landing-faq">
    <div class="landing-faq_row">
      <div class="landing-faq_row_col-1">
        <h2>Hast du Fragen? Unsere FAQs helfen dir weiter!</h2>
        <p>
          Hier findest du Antworten auf die häufigsten Fragen rund um unser
          Angebot.
        </p>
      </div>
      <div class="landing-faq_row_col-2">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFAQ(index)">
            <h3>{{ faq.question }}</h3>
            <span :class="{ rotated: activeIndex === index }"
              ><i class="fa-solid fa-chevron-down"></i
            ></span>
          </div>
          <div class="faq-answer" v-if="activeIndex === index">
            <p>{{ faq.answer }}</p>
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
            "Zurzeit ist die Plattform auf die deutsche Sprache ausgerichtet. Wir planen jedoch, in Zukunft zusätzliche Sprachunterstützung anzubieten.",
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
  margin: 200px 0 150px 0;

  &_row {
    width: $width-desktop - 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;

    &_col-1 {
      width: 50%;

      & h2 {
        margin: 0 0 10px 0;
        padding: 0;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
      }

      & p {
        margin: 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
      }
    }

    &_col-2 {
      width: 40%;
      display: flex;
      flex-direction: column;
    }
  }
}

.faq-item {
  margin: 0 0 25px 0;
  padding: 0 0 7.5px 0;
  border-bottom: 1px solid #ccc;

  cursor: pointer;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // margin: 0 0 5px 0;

  & h3 {
    margin: 0 0 0 0;
    padding: 0;
    // font-weight: bold;
  }
}

.faq-answer {
  & p {
    margin: 15px 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
  }
}

span.rotated {
  transform: rotate(180deg);
}
</style>
