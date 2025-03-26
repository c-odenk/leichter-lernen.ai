<template>
  <div class="pricing-price-cards">
    <div class="pricing-price-cards_row">
      <!-- Iteration über alle Preispläne mit v-for -->
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
        <!-- Call-to-Action Button mit der global registrierten LinkButtonBlue-Komponente -->
        <div class="button-container">
          <LinkButtonBlue
            to="/login"
            :text="plan.available ? 'Jetzt loslegen' : ''"
            :disabledText="!plan.available ? 'Bald verfügbar' : ''"
            :disabled="!plan.available"
            :block="true"
          />
        </div>
        <!-- Liste der Features für diesen Preisplan -->
        <ul>
          <li v-for="(feature, idx) in plan.features" :key="idx">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
    <!-- Scroll-Indikatoren nur für Tablet-Ansicht -->
    <div class="scroll-indicators tablet-only">
      <div class="scroll-dot active"></div>
      <div class="scroll-dot"></div>
      <div class="scroll-dot"></div>
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
  mounted() {
    // Nur für Tablet-Ansicht: Initialisiere Scroll-Indikatoren
    this.initScrollIndicators();
  },
  methods: {
    initScrollIndicators() {
      // Prüfen, ob wir in der Tablet-Ansicht sind
      const isTablet = window.matchMedia(
        "(max-width: 1024px) and (min-width: 768px)"
      ).matches;

      if (isTablet) {
        const container = this.$el.querySelector(".pricing-price-cards_row");
        const dots = this.$el.querySelectorAll(".scroll-dot");

        if (container && dots.length) {
          container.addEventListener("scroll", () => {
            // Berechne den Fortschritt des Scrollens (0 bis 1)
            const scrollProgress =
              container.scrollLeft /
              (container.scrollWidth - container.clientWidth);

            // Bestimme, welcher Indikator aktiv sein sollte
            const activeIndex = Math.round(scrollProgress * (dots.length - 1));

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

*,
*::before,
*::after {
  box-sizing: border-box;
}

.pricing-price-cards {
  width: 100%;

  &_row {
    width: 62%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto 50px auto;
    scroll-behavior: smooth;

    @include respond(laptop) {
      @include content-container;
      margin: 0 auto;
    }

    @include respond(tablet) {
      @include content-container;
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      justify-content: flex-start;
      gap: 20px;
      padding: 20px 0;
      margin: 0 auto 0 auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }

      &::after {
        content: "";
      }
    }

    @include respond(phone) {
      @include content-container;
      flex-direction: column;
      align-items: center;
      overflow-x: visible;
      margin: 0 auto;
    }

    & .price-card {
      width: 31.5%;
      margin: 0;
      padding: 40px 25px;
      box-sizing: border-box;
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
        min-width: 280px;
        max-width: 500px;
        width: 60%;
        flex: 0 0 auto;
      }

      @include respond(phone) {
        width: 100%;
        min-width: unset;
      }

      &:hover {
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.15);
      }

      & h3 {
        min-height: 40px;
        margin: 0 0 25px 0;
        padding: 0;
        font-size: $font-size-h3-lg;

        @include respond(phone) {
          font-size: $font-size-h3-sm;
        }
      }

      & p {
        margin: 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;

        &:first-of-type {
          margin: 0 0 20px 0;
          min-height: 95px;

          @include respond(tablet) {
            min-height: 67px;
          }

          @include respond(phone) {
            min-height: auto;
          }
        }

        &:last-of-type {
          font-size: $font-size-p-lg;
        }

        & .preis {
          margin: 0;
          padding: 0;
          font-size: 2.8125rem;
          font-weight: 500;

          @include respond(tablet) {
            font-size: 2.2rem;
          }
        }
      }

      & .button-container {
        width: 100%;
        margin: 20px 0 50px 0;

        @include respond(phone) {
          margin: 20px 0 30px 0;
        }
      }

      & ul {
        margin: 0;
        padding: 0;
        list-style: none;

        & li {
          margin: 0;
          padding: 0 0 20px 25px;
          font-size: $font-size-p-lg;
          line-height: $line-height;
          letter-spacing: $letter-spacing;
          position: relative;

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

    & .mostWantedBody {
      background-color: $color-dark-blue;
      color: $color-text-white;

      &::before {
        content: "Beliebt";
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $color-warning;
        color: $color-text-dark;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: calc($font-size-p-lg - 3px);
        letter-spacing: 0.5px;
        font-weight: 600;
      }
    }
  }

  /* Scroll-Indikatoren (nur für Tablets) */
  .scroll-indicators {
    display: none;
    justify-content: center;

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
      margin: 0 5px;
      background-color: rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease;

      &.active {
        background-color: $color-light-blue;
      }
    }
  }

  /* Hilfsklasse für Elemente, die nur auf Tablets angezeigt werden */
  .tablet-only {
    display: none;

    @include respond(tablet-only) {
      display: flex;
    }
  }
}
</style>
