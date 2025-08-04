<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>{{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <!-- Desktop/Laptop: Drei Spalten nebeneinander -->
      <div v-if="!isMobile && !isTablet" class="testimonials-desktop-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="`desktop-${index}`"
          class="testimonial-card"
        >
          <div class="testimonial-stars">
            <i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">"{{ testimonial.testimonial }}"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">
              {{ testimonial.initials }}
            </div>
            <div class="author-info">
              <span class="author-name">{{ testimonial.name }}</span>
              <span class="author-headline">{{ testimonial.headline }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Smartphone & Tablet: Horizontaler Scroll -->
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
          <div class="testimonial-stars">
            <i v-for="star in 5" :key="star" class="fa-solid fa-star"></i>
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">"{{ testimonial.testimonial }}"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">
              {{ testimonial.initials }}
            </div>
            <div class="author-info">
              <span class="author-name">{{ testimonial.name }}</span>
              <span class="author-headline">{{ testimonial.headline }}</span>
            </div>
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
          initials: "AM",
          headline: "Skripte schneller verstehen",
          testimonial:
            "Die KI-gestützte Zusammenfassung hilft mir, Skripte schnell zu erfassen. Besonders die Lernkarten sind ideal für langfristiges Lernen!",
        },
        {
          name: "Thomas Schmidt",
          initials: "TS",
          headline: "Gezielte Prüfungsvorbereitung",
          testimonial:
            "Die KI extrahiert die Kernthemen aus meinen Unterlagen. So finde ich schnell die wichtigen Punkte und kann mich gezielt vorbereiten. Die automatischen Prüfungsfragen mit direktem Feedback sind ein echter Gamechanger!",
        },
        {
          name: "Laura Meier",
          initials: "LM",
          headline: "Schnelle Antworten auf alle Fragen",
          testimonial:
            "Der KI-Tutor ist eine riesige Hilfe! Ich kann jederzeit Fragen stellen und bekomme sofort präzise Antworten. So erkenne ich schnell meine Wissenslücken.",
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
    window.addEventListener("resize", this.handleResize);

    // Für Tablet und Mobile Scroll-Indikatoren initialisieren
    if (this.isMobile || this.isTablet) {
      this.initScrollIndicators();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
        const wasMobile = this.isMobile;
        const wasTablet = this.isTablet;
        this.checkViewport();
        const mobileChanged = wasMobile !== this.isMobile;
        const tabletChanged = wasTablet !== this.isTablet;

        if (mobileChanged || tabletChanged) {
          if (this.isMobile || this.isTablet) {
            this.initScrollIndicators();
          }
        }
      }, 200);
    },

    initScrollIndicators() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".testimonials-grid");
        const dots = this.$el.querySelectorAll(".scroll-dot");
        const cards = this.$el.querySelectorAll(".testimonial-card");

        if (container && dots.length) {
          this.activeIndex = 0;

          container.addEventListener("scroll", () => {
            const scrollPosition = container.scrollLeft;
            const totalWidth = container.scrollWidth;
            const viewportWidth = container.clientWidth;

            if (this.isMobile) {
              const cardWidth = cards[0].offsetWidth + 16;
              const currentCardIndex = Math.round(scrollPosition / cardWidth);
              this.activeIndex = Math.min(currentCardIndex, cards.length - 1);
            } else {
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
        const gapWidth = 16;
        const scrollPosition = index * (cardWidth + gapWidth);

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });

        this.activeIndex = index;
      }
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
  margin: calc($spacing-lg + 80px) 0 calc($spacing-lg + 50px) 0;

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
      width: 100%;
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

/* Desktop Grid: 3 Spalten nebeneinander */
.testimonials-desktop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-top: $spacing-lg;

  @include respond(laptop) {
    gap: $spacing-md;
  }
}

/* Basis-Stile für alle Testimonial-Karten */
.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: $spacing-md;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: auto;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .testimonial-stars {
    display: flex;
    gap: 2px;
    margin-bottom: $spacing-md;

    .fa-star {
      color: #fbbf24;
      font-size: 16px;
    }
  }

  .testimonial-content {
    flex: 1;
    margin-bottom: $spacing-md;
  }

  .testimonial-quote {
    width: 100%;
    margin: 0;
    font-size: $font-size-p-md;
    line-height: 1.5;
    color: #374151;
    font-style: normal;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-top: auto;
    padding-top: $spacing-sm;
    border-top: 1px solid $color-dark-blue-lighter;

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: $color-dark-blue-lighter;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      color: white;
      flex-shrink: 0;
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .author-name {
        font-size: $font-size-p-sm;
        font-weight: 600;
        color: #111827;
        line-height: 1.2;
      }

      .author-headline {
        font-size: calc(#{$font-size-p-sm} - 2px);
        color: #6b7280;
        line-height: 1.2;
      }
    }
  }
}

/* Mobile & Tablet Grid mit horizontalem Scroll */
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
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.snap-scroll {
    scroll-snap-type: x mandatory;
    scroll-padding: 0 16px;
  }

  .snap-item {
    scroll-snap-align: center;
  }

  @include respond(tablet) {
    gap: $spacing-md;

    .testimonial-card {
      min-width: 320px;
      width: 70%;
      flex: 0 0 auto;
      margin: 0;
    }
  }

  @include respond(phone) {
    gap: $spacing-sm;
    padding: 5px 0 15px;

    .testimonial-card {
      min-width: 280px;
      width: 100%;
      flex: 0 0 auto;
      margin: 0;
      padding: $spacing-md;
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
    cursor: pointer;

    &.active {
      background-color: #3b82f6;
      transform: scale(1.3);
    }
  }
}
</style>
