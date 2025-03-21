<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <div
        class="masonry-container"
        :class="{ 'mobile-scroll': isMobile, 'tablet-layout': isTablet }"
        ref="masonryContainer"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="masonry-item"
          ref="masonryItems"
        >
          <div class="testimonial">
            <div class="testimonial_header">
              <img
                :src="require(`@/assets/${testimonial.image}`)"
                alt="User Image"
              />
              <h3>{{ testimonial.name }}</h3>
            </div>
            <div class="testimonial_body">
              <h3>{{ testimonial.headline }}</h3>
              <p class="testimonial-text">{{ testimonial.testimonial }}</p>
            </div>
          </div>
        </div>
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
    };
  },

  mounted() {
    this.checkViewport();
    this.initLayout();
    window.addEventListener("resize", this.handleResize);

    // Bilder laden abwarten und dann Layout neu berechnen
    window.addEventListener("load", this.initLayout);
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
        this.checkViewport();
        this.initLayout();
      }, 200);
    },

    initLayout() {
      if (this.isMobile) {
        this.initHorizontalScroll();
      } else {
        this.initMasonry();
      }
    },

    initHorizontalScroll() {
      const container = this.$refs.masonryContainer;
      const items = this.$refs.masonryItems || [];

      if (!container || items.length === 0) return;

      // Container-Höhe zurücksetzen
      container.style.height = "";

      // Für mobile Ansicht als flex-scrollbaren Container stylen
      items.forEach((item) => {
        item.style.position = "";
        item.style.top = "";
        item.style.left = "";
        item.style.width = "calc(95vw - 16px)"; // 95vw minus Abstand
        item.style.marginRight = "16px";
      });
    },

    initMasonry() {
      const container = this.$refs.masonryContainer;
      const items = this.$refs.masonryItems || [];

      if (!container || items.length === 0) return;

      // Padding des Containers berücksichtigen
      const style = window.getComputedStyle(container);
      const paddingLeft = parseInt(style.paddingLeft) || 0;
      const paddingRight = parseInt(style.paddingRight) || 0;

      // Berechne die tatsächlich verfügbare Breite
      const containerWidth = container.clientWidth - paddingLeft - paddingRight;

      // Spaltenanzahl je nach Viewport
      const columnCount = this.isTablet ? 2 : 3;

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

.landing-testimonials {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0;
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
      text-align: center;

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
      }
    }
  }
}

.masonry-container {
  width: 100%;
  margin: $spacing-lg auto 0 auto;
  position: relative;
  padding: $spacing-md 0;
  border-radius: $border-radius-lg;

  @include respond(tablet) {
    margin: $spacing-md auto 0 auto;
    padding: $spacing-sm 0;
  }

  @include respond(phone) {
    margin: $spacing-sm auto 0 auto;
    padding: $spacing-xs 0;
  }

  &.tablet-layout .testimonial {
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: $shadow-lg;
    }
  }

  &.mobile-scroll {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: $spacing-xs 0;
    margin: 0 auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.masonry-item {
  transition: transform 0.3s ease;

  &:hover {
    // transform: translateY(-5px);
    z-index: 1;
  }

  .mobile-scroll & {
    position: static;
    scroll-snap-align: start;
    flex: 0 0 auto;
    margin: 0 $spacing-xs 0 $spacing-xs;

    &:hover {
      // transform: translateY(-3px) scale(1.02);
    }

    &:last-child {
      // margin-right: $spacing-xs;
    }
  }
}

.testimonial {
  padding: $spacing-md $spacing-sm $spacing-lg $spacing-sm;
  box-sizing: border-box;
  border: none;
  border-radius: $border-radius-lg;
  background-color: white;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-shadow: $shadow-md;
  transition: box-shadow $transition-speed-medium $transition-timing,
    transform $transition-speed-medium $transition-timing;

  @include respond(tablet) {
    padding: $spacing-sm $spacing-sm $spacing-md $spacing-sm;
    border-radius: $border-radius-md;
  }

  @include respond(phone) {
    padding: $spacing-xs $spacing-xs $spacing-sm $spacing-sm;
    border-radius: $border-radius-sm;
  }

  &:hover {
    box-shadow: $shadow-lg;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle,
      rgba(48, 131, 233, 0.25) 2px,
      transparent 2px
    );
    background-size: 18px 18px;
    z-index: 0;
    mask-image: linear-gradient(
      315deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%
    );
    -webkit-mask-image: linear-gradient(
      315deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%
    );

    @include respond(tablet) {
      background-size: 16px 16px;
    }

    @include respond(phone) {
      background-size: 14px 14px;
    }
  }

  &_header {
    @include flex-between;
    margin: 0 0 $spacing-md 0;
    position: relative;
    z-index: 1;

    @include respond(tablet) {
      margin: 0 0 $spacing-sm 0;
    }

    @include respond(phone) {
      margin: 0 0 $spacing-xs 0;
    }

    & img {
      width: 65px;
      height: 65px;
      border-radius: $border-radius-round;

      @include respond(laptop) {
        width: 50px;
        height: 50px;
      }

      @include respond(tablet) {
        width: 48px;
        height: 48px;
      }

      @include respond(phone) {
        width: 42px;
        height: 42px;
      }
    }

    & h3 {
      display: inline-block;
      margin: 0 $spacing-xs 0 0;
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
      }
    }
  }

  &_body {
    position: relative;
    z-index: 1;

    & h3 {
      color: $color-dark-blue;
      font-size: $font-size-h3-lg;
      margin: 0 0 $spacing-xs 0;

      @include respond(laptop) {
        font-size: $font-size-h3-md;
      }

      @include respond(tablet) {
        font-size: $font-size-h3-md;
        margin: 0 0 calc($spacing-xs - 2px) 0;
      }

      @include respond(phone) {
        font-size: $font-size-h3-sm;
        margin: 0 0 calc($spacing-xs - 4px) 0;
      }
    }

    & p.testimonial-text {
      width: 100%;
      margin: 0;
      text-align: left;
      font-size: $font-size-p-lg;

      @include respond(laptop) {
        font-size: calc($font-size-p-md + 1px);
      }

      @include respond(tablet) {
        font-size: calc($font-size-p-md - 1px);
        line-height: 1.4;
      }

      @include respond(phone) {
        font-size: calc(#{$font-size-p-sm} - 1px);
        line-height: 1.3;
      }
    }
  }
}
</style>
