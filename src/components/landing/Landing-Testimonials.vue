<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <!-- Wiederverwendbare Heading-Komponente (korrekt importiert als SectionHeading) -->
      <SectionHeading :heading="heading" :subheading="paragraph" />

      <!-- Desktop: Vier Spalten nebeneinander -->
      <div v-if="!isLaptopDown" class="testimonials-desktop-grid">
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

      <!-- Laptop-down: Horizontaler Scroll -->
      <div
        v-if="isLaptopDown"
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

      <!-- Scroll-Indikatoren für Laptop-down -->
      <div v-if="isLaptopDown" class="testimonials-scroll-indicators">
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
import SectionHeading from "@/components/headings/Section-Heading.vue";

export default {
  name: "TestimonialsSection",
  components: { SectionHeading },

  data() {
    return {
      heading: "💬 Was unsere Nutzer sagen",
      paragraph:
        "Mehr Verständnis, bessere Prüfungsvorbereitung und effektiveres Lernen – mit KI-gestützten Tools zum Erfolg.",
      testimonials: [
        {
          name: "Anna Müller",
          initials: "AM",
          headline: "Skripte schneller verstehen",
          testimonial:
            "Die KI-gestützte Zusammenfassung hilft mir, Skripte schnell zu erfassen. Besonders die Lernkarten sind ideal, um Wissen langfristig zu behalten und gezielt zu wiederholen.",
        },
        {
          name: "Thomas Schmidt",
          initials: "TS",
          headline: "Gezielte Prüfungsvorbereitung",
          testimonial:
            "Die KI extrahiert die wichtigsten Themen aus meinen Unterlagen, wodurch ich mich perfekt auf Prüfungen konzentrieren kann. Die Übungsfragen mit Feedback sind dabei besonders hilfreich.",
        },
        {
          name: "Laura Meier",
          initials: "LM",
          headline: "Schnelle Antworten auf alle Fragen",
          testimonial:
            "Der KI-Tutor ist eine riesige Hilfe! Ich kann jederzeit Fragen stellen und bekomme sofort präzise Antworten. So erkenne ich meine Wissenslücken schneller und gezielter.",
        },
        {
          name: "David Weber",
          initials: "DW",
          headline: "Effizient und motivierend",
          testimonial:
            "Seit ich die Plattform nutze, lerne ich viel strukturierter. Die klaren Zusammenfassungen und interaktiven Aufgaben motivieren mich und geben mir Sicherheit für jede Prüfung.",
        },
      ],
      isMobile: false,
      isLaptopDown: false,
      resizeTimer: null,
      activeIndex: 0,
    };
  },

  mounted() {
    this.checkViewport();
    window.addEventListener("resize", this.handleResize);

    if (this.isLaptopDown) {
      this.initScrollIndicators();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    checkViewport() {
      const width = window.innerWidth;
      this.isMobile = width <= 480;
      this.isLaptopDown = width <= 1280;
    },

    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        const wasMobile = this.isMobile;
        const wasLaptopDown = this.isLaptopDown;
        this.checkViewport();

        if (
          wasMobile !== this.isMobile ||
          wasLaptopDown !== this.isLaptopDown
        ) {
          if (this.isLaptopDown) {
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
        const gapWidth = this.isMobile ? 16 : 24;
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
  margin: calc($spacing-lg + 100px) 0 calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0;
  }

  &_row {
    @include content-container;

    /* Alte direkte h2/p Regeln bleiben erhalten, sie treffen weiterhin auf die
       h2/p innerhalb der ausgelagerten SectionHeading-Komponente zu. */
    & h2 {
      margin: 0 0 $spacing-xs 0;
      padding: 0;
      text-align: center;
      font-size: $font-size-h2-lg;

      @include respond(laptop) {
        font-size: calc($font-size-h2-lg - 0.1rem);
      }

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

      @include respond(tablet-down) {
        width: 85%;
      }

      @include respond(tablet) {
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

/* Desktop Grid: 4 Spalten nebeneinander */
.testimonials-desktop-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  margin-top: $spacing-lg;
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

  @include respond(phone) {
    padding: $spacing-md;
  }

  .testimonial-stars {
    display: flex;
    gap: 2px;
    margin-bottom: $spacing-md;

    @include respond(phone) {
      margin-bottom: $spacing-sm;
    }

    .fa-star {
      color: #fbbf24;
      font-size: 16px;

      @include respond(phone) {
        font-size: 14px;
      }
    }
  }

  .testimonial-content {
    flex: 1;
    margin-bottom: $spacing-md;

    @include respond(phone) {
      margin-bottom: $spacing-sm;
    }
  }

  .testimonial-quote {
    width: 100%;
    margin: 0;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;
    color: $color-text-dark;
    font-style: normal;

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

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-top: auto;
    padding-top: $spacing-sm;
    border-top: 1px solid #e5e7eb;

    @include respond(phone) {
      padding-top: calc($spacing-sm - 2px);
    }

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: $color-light-blue;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      color: white;
      flex-shrink: 0;

      @include respond(phone) {
        width: 36px;
        height: 36px;
        font-size: 13px;
      }
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

        @include respond(phone) {
          font-size: calc(#{$font-size-p-sm} - 1px);
        }
      }

      .author-headline {
        font-size: calc(#{$font-size-p-sm} - 2px);
        color: #6b7280;
        line-height: 1.2;

        @include respond(phone) {
          font-size: calc(#{$font-size-p-sm} - 3px);
        }
      }
    }
  }
}

/* Laptop-down Grid mit horizontalem Scroll */
.testimonials-grid {
  @include content-container;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: flex-start;
  gap: $spacing-md;
  padding: 0px 0 20px;
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

  @include respond(laptop) {
    .testimonial-card {
      min-width: 340px;
      width: 80%;
      flex: 0 0 auto;
      margin: 0;
    }
  }

  @include respond(tablet) {
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
      min-width: 100%;
      width: 100%;
      flex: 0 0 auto;
      margin: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transform: none;
      }
    }
  }
}

/* Scroll-Indikatoren für Laptop-down */
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
      background-color: $color-light-blue;
      transform: scale(1.3);
    }

    &:hover {
      background-color: rgba($color-light-blue, 0.5);
    }
  }
}
</style>
