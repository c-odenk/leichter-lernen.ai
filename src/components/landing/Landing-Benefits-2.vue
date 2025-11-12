<template>
  <section class="benefits">
    <!-- Wiederverwendbare Überschrift-Komponente -->
    <SectionHeading :heading="heading" :subheading="subheading" />

    <div class="benefits_grid">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefit_card"
      >
        <div class="benefit_content">
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
          <router-link to="/product"
            >Zum Produkt <i class="fa-solid fa-arrow-right"></i
          ></router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeading from "@/components/headings/Section-Heading.vue";

export default {
  name: "BenefitsSection",
  components: {
    SectionHeading,
  },

  data() {
    return {
      heading: "🚀 Mit KI-Unterstützung zu Bestnoten!",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",

      benefits: [
        {
          title: "⚡ Schnelle Zusammenfassungen",
          description:
            "Lade deine Vorlesungsskripte hoch und erhalte prägnante Zusammenfassungen. So erkennst du die wichtigsten Inhalte schneller und sparst wertvolle Lernzeit.",
        },
        {
          title: "🎯 Interaktive Lernkarten",
          description:
            "Der KI-Tutor generiert automatisch Lernkarten und nutzt die Spaced Repetition Methode. So prägst du dir Wissen effizient ein und erinnerst dich langfristig.",
        },
        {
          title: "💡 Dein KI-Tutor",
          description:
            "Stelle Fragen zu deinem Lernstoff und erhalte direkt fundierte Antworten. So erkennst du Wissenslücken und vertiefst dein Verständnis spielend leicht.",
        },
        /*
        {
          title: "📊 Fortschritt verfolgen",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
        },
        {
          title: "🎓 Prüfungsvorbereitung",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
        },
        {
          title: "🔄 Wiederholungen planen",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
        },
        */
      ],
    };
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

  // display: none;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet-down) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0;
  }

  &_grid {
    @include content-container;
    display: flex;
    flex-wrap: wrap;
    gap: 2%;
    row-gap: 10px;
    align-items: stretch;

    @include respond(laptop-down) {
      row-gap: $spacing-sm;
    }
  }

  .benefit_card {
    flex: 0 0 32%;
    padding: 40px 30px 40px 30px;
    background-color: $color-dark-blue;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 150 Q200 100, 350 175 T 500 200' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M0 175 Q200 125, 350 200 T 500 225' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M500 400 Q375 450, 250 425 T 0 450' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M500 425 Q375 475, 250 450 T 0 475' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M500 500 Q300 525, 150 500 T 0 525' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M500 525 Q300 550, 150 525 T 0 550' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    border-radius: $border-radius-lg;
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;

    @include respond(laptop) {
      padding: calc($spacing-md + 15px) calc($spacing-md + 5px)
        calc($spacing-md + 10px) calc($spacing-md + 5px);
    }

    @include respond(laptop-down) {
      flex: 0 0 49%;
    }

    @include respond(tablet-down) {
      flex: 0 0 100%;
      padding: $spacing-md;
    }

    @include respond(phone) {
      padding: $spacing-sm;
    }

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
      z-index: 1;
    }

    .benefit_content {
      position: relative;
      z-index: 2;
      color: $color-text-white;
      line-height: $line-height;
      letter-spacing: $letter-spacing;

      h3 {
        margin: 0 0;
        padding: 0;
        font-size: $font-size-h3-lg;
        // text-align: center;

        @include respond(laptop) {
          margin: 0 0 $spacing-md 0;
          font-size: calc($font-size-h3-lg - 0.05rem);
          // text-align: left;
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

      p {
        margin: $spacing-md 0;
        padding: 0;
        font-size: $font-size-p-xl;
        line-height: $line-height;

        @include respond(laptop) {
          font-size: $font-size-p-lg;
          margin: 0 0 $spacing-sm 0;
        }

        @include respond(tablet) {
          font-size: $font-size-p-md;
          margin: 0 0 $spacing-sm 0;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
          margin: 0 0 $spacing-xs 0;
        }
      }

      a {
        display: inline-block;
        text-decoration: none;
        font-size: $font-size-p-xl;
        line-height: $line-height;
        color: $color-text-white;

        @include respond(laptop) {
          font-size: $font-size-p-md;
        }

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
        }

        & i {
          margin: 0 0 0 5px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
