<template>
  <div class="landing-benefits">
    <div class="landing-benefits_row-1">
      <div class="landing-benefits_row-1_col-1">
        <h2>⚡ {{ heading }}</h2>
        <p>{{ subheading }}</p>
      </div>
    </div>

    <div class="landing-benefits_row-2">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="landing-benefits_row-2_col"
        :style="{ backgroundImage: `url(${benefit.image})` }"
      >
        <div class="content-container">
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BenefitsSection",
  data() {
    return {
      heading: "Lerne effizienter mit KI-Unterstützung",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",
      benefits: [
        {
          title: "🚀 Schnelle Zusammenfassungen in wenigen Sekunden",
          description:
            "Lade deine Vorlesungsskripte hoch und erhalte prägnante Zusammenfassungen. Erfasse die wichtigsten Inhalte schneller und spare wertvolle Lernzeit.",
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
      /*
      benefitsAlt: [
        {
          title:
            "🚀 Schnelle Zusammenfassungen statt stundenlanges Mitschreiben",
          description:
            "Lade deine Vorlesungsskripte hoch, und unsere KI erstellt für dich prägnante, leicht verständliche Zusammenfassungen. So erfasst du die wichtigsten Inhalte bis zu 40 % schneller und hast mehr Zeit für das Wesentliche.",
        },
        {
          title: "🎯 Effizient wiederholen mit intelligenten Lernkarten",
          description:
            "Kein lästiges Karteikarten-Schreiben mehr! Unsere KI generiert automatisch interaktive Lernkarten aus deinen Unterlagen und nutzt die Spaced Repetition Methode, damit du dir den Stoff langfristig merkst.",
        },
        {
          title: "💡 Teste dein Wissen – Erklären wie ein Profi",
          description:
            "Erkläre der KI dein Thema oder stelle gezielte Fragen – unser RAG-gestützter Chat gibt dir sofort Feedback und zeigt dir, wo du noch Lücken hast. So festigst du dein Wissen spielend leicht!",
        },
      ],
      */
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-benefits {
  width: 100%;
  margin: 100px 0 100px 0;

  &_row-1 {
    width: $width-desktop;
    margin: 0 auto 50px auto;

    &_col-1 {
      width: 45%;

      & h2 {
        margin: 0 0 10px 0;
        padding: 0;
      }

      & p {
        margin: 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
      }
    }
  }

  &_row-2 {
    width: $width-desktop;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;

    &_col {
      width: 32%;
      height: 500px;
      padding: 20px;
      border-radius: 15px;
      box-sizing: border-box;
      position: relative;
      color: white;
      display: flex;
      align-items: flex-end;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .content-container {
      background: rgba(0, 0, 0, 0.7);
      padding: 30px 20px;
      border-radius: 10px;
      width: 100%;
      text-align: left;

      & h3 {
        margin: 0;
        padding: 0;
      }

      & p {
        margin: 15px 0 10px 0;
        padding: 0;
        // font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
      }
    }
  }
}
</style>
