<template>
  <div class="pricing-price-cards">
    <div class="pricing-price-cards_row" ref="scrollContainer">
      <!-- Iteration über alle Preispläne -->
      <div
        v-for="(plan, index) in productSortiment"
        :key="index"
        class="price-card"
        :class="{ mostWantedBody: plan.mostWanted }"
      >
        <h3>{{ plan.title }}</h3>
        <p>{{ plan.description }}</p>
        <p>
          <span class="preis">{{ plan.price }}</span> {{ plan.priceModel }}
        </p>

        <div class="button-container">
          <LinkButtonBlue
            to="/login"
            :text="plan.available ? 'Jetzt loslegen' : ''"
            :disabledText="!plan.available ? 'Bald verfügbar' : ''"
            :disabled="!plan.available"
            :block="true"
          />
        </div>

        <ul>
          <li v-for="(feature, idx) in plan.features" :key="idx">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Scroll-Indikatoren nur für Tablet -->
    <div class="scroll-indicators tablet-only" v-if="indicatorCount > 1">
      <div
        v-for="n in indicatorCount"
        :key="n"
        class="scroll-dot"
        :class="{ active: n - 1 === activeIndex }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingPriceCards",
  props: {
    productSortiment: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
      indicatorCount: 0,
      scrollHandler: null,
      resizeHandler: null,
    };
  },
  mounted() {
    this.scrollHandler = this.onScroll.bind(this);
    this.resizeHandler = this.onResize.bind(this);

    this.setupIfTablet();
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeUnmount() {
    const container = this.$refs.scrollContainer;
    if (container && this.scrollHandler) {
      container.removeEventListener("scroll", this.scrollHandler);
    }
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    isTablet() {
      return window.matchMedia("(min-width: 481px) and (max-width: 1024px)")
        .matches;
    },
    setupIfTablet() {
      const container = this.$refs.scrollContainer;
      if (!container) return;

      if (this.isTablet()) {
        this.computeIndicatorCount();
        container.removeEventListener("scroll", this.scrollHandler);
        container.addEventListener("scroll", this.scrollHandler);
        this.onScroll();
      } else {
        container.removeEventListener("scroll", this.scrollHandler);
        this.indicatorCount = 0;
        this.activeIndex = 0;
      }
    },
    computeIndicatorCount() {
      const container = this.$refs.scrollContainer;
      if (!container) {
        this.indicatorCount = 0;
        return;
      }
      const total = container.scrollWidth;
      const view = container.clientWidth;
      if (view <= 0) {
        this.indicatorCount = 0;
        return;
      }
      const pages = Math.max(1, Math.ceil(total / view));
      this.indicatorCount = pages;
      if (this.activeIndex >= this.indicatorCount) {
        this.activeIndex = this.indicatorCount - 1;
      }
    },
    onScroll() {
      const container = this.$refs.scrollContainer;
      if (!container || this.indicatorCount <= 1) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      const idx = Math.round(progress * (this.indicatorCount - 1));
      this.activeIndex = Math.min(Math.max(0, idx), this.indicatorCount - 1);
    },
    onResize() {
      this.setupIfTablet();
      if (this.isTablet()) {
        this.computeIndicatorCount();
        this.onScroll();
      } else {
        this.activeIndex = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

/* ensure padding doesn't add to width */
*,
*::before,
*::after {
  box-sizing: border-box;
}

.pricing-price-cards {
  width: 100%;
  overflow: visible; // <-- Fix: Sichtbarkeit nach oben erlauben!

  &_row {
    width: 62%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 auto 50px auto;
    gap: 24px;
    scroll-behavior: smooth;
    overflow: visible; // <-- ebenfalls sichtbar, damit Badge nicht abgeschnitten wird!

    @include respond(laptop) {
      @include content-container;
      margin: 0 auto;
      overflow: visible; // wichtig für Badge
    }

    @include respond(desktop) {
      @include content-container;
      overflow: visible; // Badge sichtbar auf großen Bildschirmen
    }

    @include respond(tablet) {
      @include content-container;
      overflow-x: auto;
      overflow-y: visible; // Badge sichtbar auf Tablet
      flex-wrap: nowrap;
      padding: 40px 0 20px 0;
      position: relative;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    @include respond(phone) {
      @include content-container;
      flex-direction: column;
      align-items: center;
      overflow: visible;
      gap: 20px;
      margin-bottom: 30px;
    }

    /* price-card basics */
    .price-card {
      flex: 0 0 auto;
      width: 31.5%;
      margin: 0;
      padding: 40px 25px;
      border: 1px solid rgba(0, 0, 0, 0.07);
      border-radius: $border-radius-lg;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      @include respond(laptop) {
        width: 31.5%;
        padding: 40px 25px 20px 25px;
      }

      @include respond(tablet) {
        min-width: 300px;
        max-width: 520px;
        width: auto;
      }

      @include respond(phone) {
        width: 100%;
        min-width: unset;
      }

      &:hover {
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.15);
      }

      h3 {
        margin: 0 0 20px 0;
        font-size: $font-size-h3-lg;
      }

      p {
        margin: 0 0 10px 0;
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

        &:first-of-type {
          margin-bottom: 20px;
          min-height: 95px;

          @include respond(tablet) {
            min-height: 67px;
          }
        }

        .preis {
          font-size: 2.8125rem;
          font-weight: 500;

          @include respond(tablet) {
            font-size: 2rem;
          }

          @include respond(phone) {
            font-size: 1.6rem;
          }
        }
      }

      .button-container {
        width: 100%;
        margin: 20px 0 50px 0;

        @include respond(phone) {
          margin: 20px 0 30px 0;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          margin: 0;
          padding: 0 0 20px 25px;
          font-size: $font-size-p-desktop;
          letter-spacing: $letter-spacing-p-desktop;
          line-height: $line-height-p-desktop;
          position: relative;
          word-break: break-word;

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

          &::before {
            content: "\f00c";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 0;
            top: 2px;
            color: $color-success;
          }

          &:last-child::before {
            content: "\f0e7";
            color: $color-warning;
          }
        }
      }
    }

    .mostWantedBody {
      background-color: $color-dark-blue;
      color: $color-text-white;

      &::before {
        content: "Beliebt";
        position: absolute;
        top: -20px; // ragt über den Container
        left: 50%;
        transform: translateX(-50%);
        background-color: $color-warning;
        color: $color-text-dark;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: calc($font-size-p-lg - 3px);
        letter-spacing: 0.5px;
        font-weight: 600;
        z-index: 2; // sicherstellen, dass es über anderen Elementen liegt
      }
    }
  }

  /* Scroll-Indikatoren */
  .scroll-indicators {
    display: none;
    justify-content: center;
    margin-top: 12px;

    @include respond(tablet) {
      display: flex;
    }

    @include respond(phone) {
      display: none;
    }

    .scroll-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 6px;
      background-color: rgba(0, 0, 0, 0.18);
      transition: background-color 0.25s ease, transform 0.2s ease;

      &.active {
        background-color: $color-light-blue;
        transform: scale(1.05);
      }
    }
  }

  .tablet-only {
    display: none;

    @include respond(tablet) {
      display: flex;
    }
  }
}
</style>
