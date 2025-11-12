<template>
  <section class="landing-product">
    <!-- Wiederverwendbare Überschrift-Komponente -->
    <SectionHeading :heading="heading" :subheading="subheading" />

    <div class="landing-product_grid">
      <div class="landing-product_grid_col-1">
        <div v-for="(step, index) in steps" :key="index" class="product_card">
          <div class="step-icon">
            <svg
              v-if="index === 0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 21a8 8 0 0 1 13.292-6" />
              <circle cx="10" cy="8" r="5" />
              <path d="M19 16v6" />
              <path d="M22 19h-6" />
            </svg>
            <svg
              v-if="index === 1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
              />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M9 15h6" />
              <path d="M12 18v-6" />
            </svg>
            <svg
              v-if="index === 2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
              />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
            <router-link to="/product"
              >Mehr erfahren <i class="fa-solid fa-arrow-right"></i
            ></router-link>
          </div>
        </div>
      </div>

      <div class="landing-product_grid_col-2">
        <div
          v-for="(box, i) in highlightBoxes"
          :key="i"
          :class="['highlight-box', box.position]"
        >
          <span class="highlight-icon">{{ box.icon }}</span>
          <p>{{ box.text }}</p>
        </div>

        <!-- Mockup Platzhalter -->
        <div class="img-platzhalter"></div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeading from "@/components/headings/Section-Heading.vue";

export default {
  name: "ProductSection",
  components: {
    SectionHeading,
  },

  data() {
    return {
      /*
      heading: "🎯 Effizienter lernen mit KI",
      subheading:
        "leichter-lernen.ai verwandelt deine Dokumente in klare Zusammenfassungen, Quizze und Prüfungen – für nachhaltigen Lernerfolg.",
      */
      heading: "🚀 Mit KI-Unterstützung zu Bestnoten!",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",

      steps: [
        {
          title: "Anmelden",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        },
        {
          title: "Dokumente hochladen",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
        },
        {
          title: "Lernen & Bestehen",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sd diam.",
        },
      ],
      highlightBoxes: [
        {
          position: "highlight-box-1",
          icon: "🚀",
          text: "Blitzschnelle Zusammenfassungen",
        },
        {
          position: "highlight-box-2",
          icon: "📚",
          text: "Interaktive Lernkarten",
        },
        {
          position: "highlight-box-3",
          icon: "💡",
          text: "Intelligenter KI-Tutor",
        },
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

.landing-product {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 50px) 0;
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
    gap: 2%;
    padding: 0;
    align-items: stretch;

    @include respond(laptop-down) {
      flex-direction: column;
      gap: $spacing-md;
    }

    &_col-1 {
      flex: 0 0 44%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      @include respond(laptop-down) {
        flex: 1;
        width: 100%;
      }

      & .product_card {
        width: 100%;
        padding: 40px;
        background-color: $color-dark-blue;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 600'%3E%3Crect width='500' height='600' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 50 Q125 100, 250 75 T 500 100' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M0 75 Q125 125, 250 100 T 500 125' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 150 Q200 100, 350 175 T 500 200' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M0 175 Q200 125, 350 200 T 500 225' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M500 400 Q375 450, 250 425 T 0 450' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3Cpath d='M500 425 Q375 475, 250 450 T 0 475' fill='none' stroke='%233083e9' stroke-width='0.9' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M500 500 Q300 525, 150 500 T 0 525' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3Cpath d='M500 525 Q300 550, 150 525 T 0 550' fill='none' stroke='%23ffffff' stroke-width='0.6' /%3E%3C/g%3E%3C/svg%3E");
        background-size: cover;
        border-radius: $border-radius-lg;
        color: white;
        display: flex;
        align-items: flex-start;
        gap: 25px;
        position: relative;
        overflow: hidden;

        @include respond(laptop) {
          padding: calc($spacing-md + 15px) $spacing-md;
          gap: $spacing-sm;
        }

        @include respond(tablet-down) {
          padding: $spacing-md;
          gap: $spacing-sm;
        }

        @include respond(phone) {
          padding: $spacing-sm;
          gap: $spacing-xs;
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

        .step-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          background-color: $color-light-blue;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          z-index: 2;

          @include respond(laptop) {
            width: 38px;
            height: 38px;
          }

          @include respond(tablet-down) {
            width: 36px;
            height: 36px;
          }

          @include respond(phone) {
            width: 32px;
            height: 32px;
          }

          svg {
            width: 25px;
            height: 25px;

            @include respond(laptop) {
              width: 20px;
              height: 20px;
            }

            @include respond(tablet-down) {
              width: 18px;
              height: 18px;
            }

            @include respond(phone) {
              width: 16px;
              height: 16px;
            }
          }
        }

        .step-content {
          flex: 1;
          position: relative;
          z-index: 2;
          color: $color-text-white;
          line-height: $line-height;
          letter-spacing: $letter-spacing;

          h3 {
            margin: 0 0 10px 0;
            padding: 0;
            font-size: $font-size-h3-lg;

            @include respond(laptop) {
              font-size: calc($font-size-h2-lg - 0.1rem);
            }

            @include respond(tablet) {
              font-size: $font-size-h2-md;
              margin: 0 0 8px 0;
            }

            @include respond(phone) {
              font-size: $font-size-h2-sm;
              margin: 0 0 6px 0;
            }
          }

          p {
            margin: 0;
            padding: 0;
            font-size: $font-size-p-xl;

            @include respond(laptop) {
              font-size: $font-size-p-lg;
            }

            @include respond(tablet) {
              font-size: $font-size-p-md;
            }

            @include respond(phone) {
              font-size: $font-size-p-sm;
              margin: 0 0 $spacing-xs 0;
            }
          }

          a {
            display: inline-block;
            margin: $spacing-sm 0 0 0;
            text-decoration: none;
            font-size: $font-size-p-xl;
            line-height: $line-height;
            color: $color-text-white;

            // display: none;

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

    &_col-2 {
      flex: 0 0 55%;
      background-color: $color-dark-blue;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1200'%3E%3Crect width='800' height='1200' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 150 Q250 220, 450 180 T 800 220' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M0 190 Q280 260, 420 220 T 800 260' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 380 Q320 330, 500 410 T 800 460' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M0 420 Q290 370, 530 450 T 800 500' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M800 680 Q600 750, 400 710 T 0 750' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M800 720 Q570 790, 450 750 T 0 790' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M800 900 Q600 960, 380 920 T 0 970' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M800 940 Q620 1000, 350 960 T 0 1010' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3C/svg%3E");
      background-size: cover;
      border-radius: $border-radius-lg;
      position: relative;
      overflow: hidden;

      @include respond(laptop) {
        // display: none;
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

      & .img-platzhalter {
        width: 340px;
        height: 560px;
        background-color: $color-img-platzhalter;
        position: relative;
        bottom: -20%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 3;
        border-radius: 30px;
      }

      & .highlight-box {
        margin: 0;
        padding: 7.5px 12.5px;
        display: flex;
        align-items: center;
        position: absolute;
        background-color: white;
        border-radius: $border-radius-lg;

        gap: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 4;

        .highlight-icon {
          width: 45px;
          height: 45px;
          background-color: $color-light-blue;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 24px;
        }

        p {
          margin: 0;
          padding: 0;
          color: $color-dark-blue;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.3;
          white-space: nowrap;
        }
      }

      .highlight-box-1 {
        top: 40%;
        left: 5%;
        z-index: 5;

        @include respond(laptop) {
          // display: none;
        }
      }

      .highlight-box-2 {
        top: 55%;
        left: 55%;
        z-index: 5;

        @include respond(laptop) {
          // display: none;
        }
      }

      .highlight-box-3 {
        top: 70%;
        left: 5%;
        z-index: 5;

        @include respond(laptop) {
          // display: none;
        }
      }
    }
  }
}
</style>
