<template>
  <section class="benefits">
    <div class="benefits_header">
      <h2>⚡ {{ heading }}</h2>
      <p>{{ subheading }}</p>
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

    <!-- Scroll-Indikatoren für mobile Ansichten -->
    <div class="benefits__scroll-indicators">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="scroll-dot"
        :class="{ active: index === 0 }"
      ></div>
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

      /*
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

  mounted() {
    // Nach dem Mounting der Komponente Scroll-Indikatoren initialisieren
    this.initScrollIndicators();
  },

  methods: {
    initScrollIndicators() {
      // Nur für Tablet- und Phone-Ansicht: Initialisiere Scroll-Indikatoren
      const isTabletOrPhone = window.matchMedia("(max-width: 1024px)").matches;

      if (isTabletOrPhone) {
        const container = this.$el.querySelector(".benefits__grid");
        const dots = this.$el.querySelectorAll(".scroll-dot");

        if (container && dots.length) {
          // Initial ersten Dot aktivieren
          dots[0].classList.add("active");

          container.addEventListener("scroll", () => {
            // Berechne den Fortschritt des Scrollens
            const scrollPosition = container.scrollLeft;
            const totalWidth = container.scrollWidth;
            const viewportWidth = container.clientWidth;

            // Berechne, welche Karte gerade am sichtbarsten ist
            const activeIndex = Math.round(
              (scrollPosition / (totalWidth - viewportWidth)) *
                (dots.length - 1)
            );

            // Setze die aktive Klasse auf den entsprechenden Indikator
            dots.forEach((dot, index) => {
              dot.classList.toggle("active", index === activeIndex);
            });
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;
.benefits {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    // margin: $spacing-lg 0;
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

  &__grid {
    @include content-container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include respond(tablet) {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: flex-start;
      gap: $spacing-md;
      padding: 10px 0 20px;
      // margin-bottom: 5px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    @include respond(phone) {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: flex-start;
      gap: $spacing-sm;
      padding: 5px 0 15px;
      margin-bottom: 5px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;

      /* Verstecke die Scrollbar auch für Smartphones */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
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
      min-width: 280px;
      width: 70%;
      height: 350px;
      flex: 0 0 auto;
      margin: 0;
      padding: $spacing-sm;
    }

    @include respond(phone) {
      min-width: 260px;
      width: 100%;
      height: 300px;
      flex: 0 0 auto;
      margin-bottom: 0;
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

  /* Scroll-Indikatoren */
  &__scroll-indicators {
    display: none;
    justify-content: center;

    @include respond(tablet) {
      display: flex;
    }

    @include respond(phone) {
      display: flex;
    }

    .scroll-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px;
      background-color: rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease, transform 0.2s ease;

      &.active {
        background-color: $color-light-blue;
        transform: scale(1.3);
      }
    }
  }
}
</style>
