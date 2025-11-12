<template>
  <section class="benefits">
    <div class="benefits_header">
      <h2>🚀 {{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>

    <div
      class="benefits__grid"
      :class="{ 'snap-scroll': isMobile }"
      ref="benefitsGrid"
    >
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefits__card"
        :class="{ 'snap-item': isMobile }"
        :style="{ backgroundImage: `url(${benefit.image})` }"
      >
        <div class="benefits__content">
          <div class="benefits__content-inner">
            <h3 class="benefits__card-title">{{ benefit.title }}</h3>
            <p class="benefits__card-text">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll-Indikatoren für mobile Ansichten -->
    <div class="benefits__scroll-indicators">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="scroll-dot"
        :class="{ active: index === activeIndex }"
        @click="scrollToBenefit(index)"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",

  data() {
    return {
      heading: "Mit KI-Unterstützung zu Bestnoten!",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",

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
      activeIndex: 0,
      isMobile: false,
      isLaptopDown: false,
    };
  },

  mounted() {
    this.checkViewport();
    this.initScrollIndicators();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    checkViewport() {
      const width = window.innerWidth;
      // Basierend auf den Breakpoints in variables.scss
      this.isMobile = width <= 480; // phone
      this.isLaptopDown = width <= 1280; // laptop-down (inkl. tablet + phone)
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
          this.initScrollIndicators();
        }
      }, 200);
    },

    scrollToBenefit(index) {
      const container = this.$el.querySelector(".benefits__grid");
      const cards = this.$el.querySelectorAll(".benefits__card");

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

    initScrollIndicators() {
      this.$nextTick(() => {
        // Nur für laptop-down (≤1280px): Initialisiere Scroll-Indikatoren
        if (this.isLaptopDown) {
          const container = this.$el.querySelector(".benefits__grid");
          const dots = this.$el.querySelectorAll(".scroll-dot");
          const cards = this.$el.querySelectorAll(".benefits__card");

          if (container && dots.length && cards.length) {
            this.activeIndex = 0;

            container.addEventListener("scroll", () => {
              const scrollPosition = container.scrollLeft;

              if (this.isMobile) {
                // Phone: Snap-basierte Berechnung
                const cardWidth = cards[0].offsetWidth + 16;
                const currentCardIndex = Math.round(scrollPosition / cardWidth);
                this.activeIndex = Math.min(currentCardIndex, cards.length - 1);
              } else {
                // Laptop & Tablet: Proportionale Berechnung
                const totalWidth = container.scrollWidth;
                const viewportWidth = container.clientWidth;
                const activeIndex = Math.round(
                  (scrollPosition / (totalWidth - viewportWidth)) *
                    (dots.length - 1)
                );
                this.activeIndex = activeIndex;
              }

              dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === this.activeIndex);
              });
            });
          }
        }
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

.benefits {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet-down) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0;
  }

  &_header {
    @include content-container;
    margin-bottom: $spacing-lg;

    @include respond(laptop-down) {
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

  &__grid {
    @include content-container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include respond(laptop-down) {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: flex-start;
      gap: $spacing-md;
      padding: 10px 0 20px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    @include respond(phone) {
      gap: $spacing-sm;
      padding: 5px 0 15px;
      margin-bottom: 5px;

      &.snap-scroll {
        scroll-snap-type: x mandatory;
        scroll-padding: 0 16px;
      }
    }
  }

  &__card {
    width: 32%;
    height: 440px;
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

    &.snap-item {
      scroll-snap-align: center;
    }

    @include respond(laptop) {
      height: 380px;
    }

    @include respond(laptop-down) {
      min-width: 300px;
      width: 75%;
      flex: 0 0 auto;
      margin: 0;
    }

    @include respond(tablet) {
      min-width: 280px;
      width: 70%;
      height: 350px;
    }

    @include respond(phone) {
      min-width: 260px;
      width: 100%;
      height: 300px;
      margin-bottom: 0;
      padding: calc($spacing-sm - 4.5px);
    }

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
        rgba(0, 0, 0, 0.2) 50%,
        rgba(0, 0, 0, 0.4) 100%
      );
      z-index: 1;
    }
  }

  &__content {
    width: 100%;
    text-align: left;
    position: relative;
    z-index: 2;
    border-radius: $border-radius-md;
    overflow: hidden;
    box-shadow: $shadow-md;
    background-color: $color-dark-blue;
  }

  &__content-inner {
    padding: $spacing-md $spacing-md;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 150 Q200 100, 350 175 T 500 200' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M0 175 Q200 125, 350 200 T 500 225' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M500 400 Q375 450, 250 425 T 0 450' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M500 425 Q375 475, 250 450 T 0 475' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M500 500 Q300 525, 150 500 T 0 525' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M500 525 Q300 550, 150 525 T 0 550' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(48, 131, 233, 0.015) 0%,
        rgba(23, 43, 77, 0.12) 100%
      );
      z-index: 0;
    }

    @include respond(laptop) {
      padding: $spacing-sm;
    }

    @include respond(tablet) {
      padding: $spacing-sm $spacing-xs;
    }

    @include respond(phone) {
      padding: $spacing-sm;
    }
  }

  &__card-title {
    margin: 0;
    padding: 0;
    font-size: $font-size-h3-lg;
    position: relative;
    z-index: 1;

    @include respond(laptop) {
      font-size: calc($font-size-h3-lg - 0.05rem);
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
    position: relative;
    z-index: 1;

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

  &__scroll-indicators {
    display: none;
    justify-content: center;
    margin-top: $spacing-sm;

    @include respond(laptop-down) {
      display: flex;
    }

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
}
</style>
