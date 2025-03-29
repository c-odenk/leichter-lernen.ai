<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <!-- Desktop/Laptop: Masonry Layout mit neuem Design -->
      <div
        v-if="!isMobile && !isTablet"
        class="masonry-container"
        ref="masonryContainer"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`desktop-${index}`"
          class="masonry-item"
          ref="masonryItems"
        >
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-quote">"{{ testimonial.testimonial }}"</p>
              <div class="testimonial-headline">{{ testimonial.headline }}</div>
            </div>
            <div class="testimonial-author">
              <img
                :src="require(`@/assets/${testimonial.image}`)"
                alt="User Image"
              />
              <span>{{ testimonial.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Smartphone & Tablet: Horizontales Scroll Layout mit neuem Design -->
      <div
        v-if="isMobile || isTablet"
        class="testimonials-grid"
        :class="{ 'snap-scroll': isMobile }"
        ref="mobileTestimonialCards"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`mobile-${index}`"
          class="testimonial-card"
          :class="{ 'snap-item': isMobile }"
        >
          <div class="testimonial-content">
            <p class="testimonial-quote">"{{ testimonial.testimonial }}"</p>
            <div class="testimonial-headline">{{ testimonial.headline }}</div>
          </div>
          <div class="testimonial-author">
            <img
              :src="require(`@/assets/${testimonial.image}`)"
              alt="User Image"
            />
            <span>{{ testimonial.name }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll-Indikatoren für Smartphone & Tablet -->
      <div v-if="isMobile || isTablet" class="testimonials-scroll-indicators">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`dot-${index}`"
          class="scroll-dot"
          :class="{ active: index === activeIndex }"
          @click="scrollToCard(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestimonialsSection",

  data() {
    return {
      heading: "Was unsere Nutzer sagen",
      paragraph:
        "Mehr Verständnis, bessere Prüfungsvorbereitung und effektiveres Lernen – mit KI-gestützten Tools zum Erfolg.",
      testimonials: [
        {
          name: "Anna Müller",
          headline: "Skripte schneller verstehen",
          testimonial:
            "Die KI-gestützte Zusammenfassung hilft mir, Skripte schnell zu erfassen. Besonders die Lernkarten sind ideal für langfristiges Lernen!",
          image: "anonymous-user.png",
        },
        {
          name: "Thomas Schmidt",
          headline: "Gezielte Prüfungsvorbereitung",
          testimonial:
            "Die KI extrahiert die Kernthemen aus meinen Unterlagen. So finde ich schnell die wichtigen Punkte und kann mich gezielt vorbereiten. Die automatischen Prüfungsfragen mit direktem Feedback sind ein echter Gamechanger!",
          image: "anonymous-user.png",
        },
        {
          name: "Laura Meier",
          headline: "Schnelle Antworten auf alle Fragen",
          testimonial:
            "Der KI-Tutor ist eine riesige Hilfe! Ich kann jederzeit Fragen stellen und bekomme sofort präzise Antworten. So erkenne ich schnell meine Wissenslücken.",
          image: "anonymous-user.png",
        },
        {
          name: "Felix Weber",
          headline: "Sofortige Testergebnisse",
          testimonial:
            "Ich liebe es, dass ich meine Tests direkt ausgewertet bekomme. Das Feedback zeigt mir sofort, wo ich noch nachbessern muss – perfekt für die Prüfungsvorbereitung!",
          image: "anonymous-user.png",
        },
        {
          name: "Julia Braun",
          headline: "Alles in einem Paket",
          testimonial:
            "Das Semester-Paket ist eine echte Erleichterung! Alle Tools, die ich brauche, sind vereint – besonders die automatischen Prüfungsfragen helfen mir enorm beim Lernen.",
          image: "anonymous-user.png",
        },
        {
          name: "Lukas Fischer",
          headline: "Struktur und Zeitersparnis",
          testimonial:
            "Ich lade meine Skripte hoch und erhalte sofort eine klare Struktur und Zusammenfassung. Das spart mir viel Zeit und lässt mich effizienter lernen. Top!",
          image: "anonymous-user.png",
        },
      ],
      isMobile: false,
      isTablet: false,
      resizeTimer: null,
      activeIndex: 0,
    };
  },

  mounted() {
    this.checkViewport();
    this.initLayout();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("load", this.initLayout);

    // Für Tablet und Mobile Scroll-Indikatoren initialisieren
    if (this.isMobile || this.isTablet) {
      this.initScrollIndicators();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("load", this.initLayout);
  },

  methods: {
    checkViewport() {
      const width = window.innerWidth;
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1024;
    },

    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        // Aktuelle Zustände speichern
        const wasMobile = this.isMobile;
        const wasTablet = this.isTablet;

        // Viewport überprüfen
        this.checkViewport();

        // Prüfen, ob sich etwas geändert hat
        const mobileChanged = wasMobile !== this.isMobile;
        const tabletChanged = wasTablet !== this.isTablet;

        // Layout neu initialisieren wenn sich etwas geändert hat
        if (mobileChanged || tabletChanged) {
          this.initLayout();
        }
      }, 200);
    },

    initLayout() {
      if (this.isMobile || this.isTablet) {
        this.initScrollIndicators();
      } else {
        this.initMasonry();
      }
    },

    initScrollIndicators() {
      // Nach dem DOM-Update warten
      this.$nextTick(() => {
        const container = this.$el.querySelector(".testimonials-grid");
        const dots = this.$el.querySelectorAll(".scroll-dot");
        const cards = this.$el.querySelectorAll(".testimonial-card");

        if (container && dots.length) {
          // Initial ersten Dot aktivieren
          this.activeIndex = 0;

          container.addEventListener("scroll", () => {
            // Berechne den Fortschritt des Scrollens
            const scrollPosition = container.scrollLeft;
            const totalWidth = container.scrollWidth;
            const viewportWidth = container.clientWidth;

            if (this.isMobile) {
              // Für Mobile: Berechne, welche Karte am sichtbarsten ist basierend auf Kartenposition
              const cardWidth = cards[0].offsetWidth + 16; // Kartenbreite + gap
              const currentCardIndex = Math.round(scrollPosition / cardWidth);
              this.activeIndex = Math.min(currentCardIndex, cards.length - 1);
            } else {
              // Für Tablet: Bisherige Logik beibehalten
              const activeIndex = Math.round(
                (scrollPosition / (totalWidth - viewportWidth)) *
                  (dots.length - 1)
              );
              this.activeIndex = activeIndex;
            }
          });
        }
      });
    },

    scrollToCard(index) {
      const container = this.$el.querySelector(".testimonials-grid");
      const cards = this.$el.querySelectorAll(".testimonial-card");

      if (container && cards.length > index) {
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = 16; // $spacing-sm oder $spacing-md je nach Viewport
        const scrollPosition = index * (cardWidth + gapWidth);

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });

        this.activeIndex = index;
      }
    },

    initMasonry() {
      this.$nextTick(() => {
        const container = this.$refs.masonryContainer;
        const items = this.$refs.masonryItems || [];

        if (!container || items.length === 0) return;

        // Padding des Containers berücksichtigen
        const style = window.getComputedStyle(container);
        const paddingLeft = parseInt(style.paddingLeft) || 0;
        const paddingRight = parseInt(style.paddingRight) || 0;

        // Berechne die tatsächlich verfügbare Breite
        const containerWidth =
          container.clientWidth - paddingLeft - paddingRight;

        // Spaltenanzahl
        const columnCount = 3;

        // Berechne Spaltenbreite und Abstand
        const gap = 16; // $spacing-xs
        const columnWidth =
          (containerWidth - gap * (columnCount - 1)) / columnCount;

        // Höhen der Spalten zurücksetzen
        const columnHeights = Array(columnCount).fill(0);

        // Elemente positionieren
        items.forEach((item) => {
          // Zurücksetzen für saubere Neuberechnung
          item.style.width = `${columnWidth}px`;

          // Finde die kürzeste Spalte
          const minColumnIndex = columnHeights.indexOf(
            Math.min(...columnHeights)
          );

          // Berechne Position
          const xPos = minColumnIndex * (columnWidth + gap) + paddingLeft;
          const yPos = columnHeights[minColumnIndex];

          // Element positionieren
          item.style.position = "absolute";
          item.style.left = `${xPos}px`;
          item.style.top = `${yPos}px`;

          // Aktualisiere Spaltenhöhe
          columnHeights[minColumnIndex] += item.offsetHeight + gap;
        });

        // Container-Höhe anpassen
        container.style.height = `${Math.max(...columnHeights)}px`;
      });
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

.landing-testimonials {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-md 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0 $spacing-md 0;
  }

  &_row {
    @include content-container;

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
}

/* Gemeinsame Basis-Stile für alle Testimonial-Karten */
.testimonial-card {
  background: $color-dark-blue;
  border-radius: $border-radius-md;
  padding: $spacing-md;
  color: white;
  box-shadow: $shadow-md;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  .testimonial-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $spacing-xs $spacing-xs $spacing-sm $spacing-xs;
    z-index: 1;
  }

  .testimonial-quote {
    margin: 0 auto $spacing-sm auto;
    font-size: $font-size-p-md;
    line-height: 1.4;
    text-align: center; /* Immer zentriert */
    // font-style: italic;
    color: white;
  }

  .testimonial-headline {
    font-size: $font-size-p-sm;
    font-weight: 600;
    text-align: center; /* Immer zentriert */
    margin-bottom: $spacing-sm;
    color: rgba(255, 255, 255, 0.9);
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    padding-top: $spacing-sm;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid white;
      margin-right: $spacing-xs;
      object-fit: cover;
    }

    span {
      font-size: $font-size-p-sm;
      font-weight: 600;
      color: white;
    }
  }
}

/* Desktop/Laptop: Masonry Layout */
.masonry-container {
  width: 100%;
  margin: $spacing-lg auto 0 auto;
  position: relative;
  padding: $spacing-md 0;
  min-height: 600px; // Mindesthöhe, wird dynamisch angepasst
}

.masonry-item {
  position: absolute; // Wird durch JavaScript positioniert
  width: 32%; // Standardbreite, wird durch JavaScript angepasst
  margin-bottom: $spacing-md;
  transition: all 0.3s ease;
}

/* Mobile & Tablet Grid mit horizontalem Scroll wie bei Benefits */
.testimonials-grid {
  @include content-container;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: flex-start;
  gap: $spacing-md;
  padding: 10px 0 20px;
  margin-top: $spacing-md;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }

  /* Snap-Scrolling nur für Mobile */
  &.snap-scroll {
    scroll-snap-type: x mandatory;
    scroll-padding: 0 16px;
  }

  /* Snap-Items für Mobile View */
  .snap-item {
    scroll-snap-align: center;
  }

  @include respond(tablet) {
    gap: $spacing-md;

    .testimonial-card {
      min-width: 280px;
      width: 70%;
      flex: 0 0 auto;
      margin: 0;
    }
  }

  @include respond(phone) {
    gap: $spacing-sm;
    padding: 5px 0 15px;

    .testimonial-card {
      min-width: 260px;
      width: 100%;
      flex: 0 0 auto;
      margin: 0;
    }
  }
}

/* Scroll-Indikatoren für Tablet und Mobile */
.testimonials-scroll-indicators {
  display: flex;
  justify-content: center;
  margin: 15px auto 0;
  padding: 0;

  .scroll-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer; /* Zeigt an, dass die Punkte klickbar sind */

    &.active {
      background-color: $color-light-blue;
      transform: scale(1.3);
    }
  }
}
</style>
