<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <!-- Auf Desktop/Tablet: Masonry Layout -->
      <div
        v-if="!isMobile"
        class="masonry-container"
        :class="{ 'tablet-layout': isTablet }"
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

      <!-- Auf Smartphone: Horizontales Scroll Layout mit neuem Design -->
      <div v-if="isMobile" class="mobile-testimonials-container">
        <div class="mobile-testimonials-carousel" ref="mobileCarousel">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="mobile-testimonial-card"
            ref="mobileTestimonialCards"
          >
            <div class="quote-icon">❝</div>
            <div class="testimonial-content">
              <p class="testimonial-quote">{{ testimonial.testimonial }}</p>
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

        <!-- Scroll-Indikatoren für Smartphone -->
        <div class="scroll-indicators">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="`dot-${index}`"
            class="scroll-dot"
            :class="{ active: index === activeIndex }"
            @click="scrollToItem(index)"
          ></div>
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
      activeIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
    };
  },

  mounted() {
    this.checkViewport();
    this.initLayout();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("load", this.initLayout);

    // Touch events für Mobile Swipe
    if (this.isMobile) {
      this.setupTouchEvents();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("load", this.initLayout);

    // Touch events entfernen
    const carousel = this.$refs.mobileCarousel;
    if (carousel) {
      carousel.removeEventListener("touchstart", this.handleTouchStart);
      carousel.removeEventListener("touchend", this.handleTouchEnd);
    }
  },

  methods: {
    checkViewport() {
      const width = window.innerWidth;
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1024;

      // Setup touch events wenn Mobile
      if (this.isMobile) {
        this.$nextTick(() => {
          this.setupTouchEvents();
          this.addScrollListener();
        });
      }
    },

    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.checkViewport();

        // Wenn der Viewport geändert wurde (Mobile <-> Desktop)
        if (wasMobile !== this.isMobile) {
          this.initLayout();
        }
      }, 200);
    },

    initLayout() {
      if (this.isMobile) {
        // Mobile Layout initialisieren
        this.activeIndex = 0;
      } else {
        this.initMasonry();
      }
    },

    setupTouchEvents() {
      this.$nextTick(() => {
        const carousel = this.$refs.mobileCarousel;
        if (carousel) {
          carousel.removeEventListener("touchstart", this.handleTouchStart);
          carousel.removeEventListener("touchend", this.handleTouchEnd);

          carousel.addEventListener("touchstart", this.handleTouchStart, {
            passive: true,
          });
          carousel.addEventListener("touchend", this.handleTouchEnd, {
            passive: true,
          });
        }
      });
    },

    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },

    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },

    handleSwipe() {
      const swipeThreshold = 50; // Minimale Swipe-Distanz

      if (this.touchEndX < this.touchStartX - swipeThreshold) {
        // Swipe nach links -> nächstes Testimonial
        if (this.activeIndex < this.testimonials.length - 1) {
          this.scrollToItem(this.activeIndex + 1);
        }
      }

      if (this.touchEndX > this.touchStartX + swipeThreshold) {
        // Swipe nach rechts -> vorheriges Testimonial
        if (this.activeIndex > 0) {
          this.scrollToItem(this.activeIndex - 1);
        }
      }
    },

    addScrollListener() {
      // Warten auf DOM-Update
      this.$nextTick(() => {
        const container = this.$refs.mobileCarousel;
        if (container) {
          // Altes Event-Listener entfernen (falls vorhanden)
          container.removeEventListener("scroll", this.handleScroll);
          // Neues Event-Listener hinzufügen
          container.addEventListener("scroll", this.handleScroll);
        }
      });
    },

    handleScroll() {
      const container = this.$refs.mobileCarousel;
      const items = this.$refs.mobileTestimonialCards || [];

      if (!container || items.length === 0) return;

      // Bestimme welche Karte am meisten sichtbar ist
      let maxVisibleIndex = 0;
      let maxVisible = 0;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Berechne, wie viel der Karte im sichtbaren Bereich ist
        const leftVisible = Math.max(rect.left, containerRect.left);
        const rightVisible = Math.min(rect.right, containerRect.right);
        const visibleWidth = Math.max(0, rightVisible - leftVisible);

        if (visibleWidth > maxVisible) {
          maxVisible = visibleWidth;
          maxVisibleIndex = index;
        }
      });

      this.activeIndex = maxVisibleIndex;
    },

    scrollToItem(index) {
      const container = this.$refs.mobileCarousel;
      const items = this.$refs.mobileTestimonialCards || [];

      if (!container || !items || !items[index]) return;

      const item = items[index];

      // Zum ausgewählten Item scrollen
      item.scrollIntoView({ behavior: "smooth", inline: "center" });

      this.activeIndex = index;
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
    margin: $spacing-md 0;
  }

  @include respond(phone) {
    margin: $spacing-sm 0 $spacing-sm 0;
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
        margin-bottom: $spacing-md;
      }
    }
  }
}

/* Desktop/Tablet Layout */
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

  &.tablet-layout .testimonial {
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: $shadow-lg;
    }
  }
}

.masonry-item {
  transition: transform 0.3s ease;

  &:hover {
    z-index: 1;
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
  }

  &_header {
    @include flex-between;
    margin: 0 0 $spacing-md 0;
    position: relative;
    z-index: 1;

    @include respond(tablet) {
      margin: 0 0 $spacing-sm 0;
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
    }
  }
}

/* MOBILE LAYOUT - Kombiniertes Design mit horizontalem Scroll */
@include respond(phone) {
  .mobile-testimonials-container {
    @include content-container;
    margin: 0 auto $spacing-xs auto;
    padding: 0;
    position: relative;
  }

  .mobile-testimonials-carousel {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 0;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari/Opera */
    }
  }

  .mobile-testimonial-card {
    flex: 0 0 100%;
    scroll-snap-align: center;
    margin-right: $spacing-sm;
    background: $color-dark-blue;
    border-radius: $border-radius-md;
    padding: $spacing-md;
    color: white;
    box-shadow: $shadow-md;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    position: relative;

    &:first-child {
      margin-left: $spacing-xs;
    }

    &:last-child {
      margin-right: $spacing-xs;
    }

    .quote-icon {
      position: absolute;
      top: $spacing-xs;
      left: $spacing-xs;
      font-size: 2.5rem;
      color: rgba(255, 255, 255, 0.3);
      line-height: 1;
    }

    .testimonial-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: $spacing-xs $spacing-xs $spacing-sm $spacing-xs;
      z-index: 1;
    }

    .testimonial-quote {
      margin: 0 0 $spacing-sm;
      font-size: $font-size-p-md;
      line-height: 1.4;
      text-align: center;
      font-style: italic;
      color: white;
    }

    .testimonial-headline {
      font-size: $font-size-p-sm;
      font-weight: 600;
      text-align: center;
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

  /* Scroll-Indikatoren für Mobile */
  .scroll-indicators {
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
      transition: all 0.3s ease;
      cursor: pointer;

      &.active {
        background-color: $color-light-blue;
        transform: scale(1.3);
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
