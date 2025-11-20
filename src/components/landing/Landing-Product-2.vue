<template>
  <section class="landing-product">
    <!-- Badge -->
    <div class="badge">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-sparkles-icon lucide-sparkles"
      >
        <path
          d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        />
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
        <circle cx="4" cy="20" r="2" />
      </svg>
      <p>Unsere Lösung</p>
    </div>

    <!-- Wiederverwendbare Überschrift-Komponente -->
    <SectionHeading :heading="heading" :subheading="subheading" />

    <div class="landing-product_grid">
      <div class="landing-product_grid_col-1">
        <div
          v-for="(box, i) in highlightBoxes"
          :key="i"
          :class="['highlight-box', box.position]"
        >
          <span class="highlight-icon">{{ box.icon }}</span>
          <p>{{ box.text }}</p>
        </div>

        <img src="@/assets/ipad-mockup.png" alt="Lernplattform Vorschau" />
      </div>

      <div class="landing-product_grid_col-2">
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
  margin: calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 50px) 0;
  }

  @include respond(tablet) {
    margin: calc($spacing-lg + 20px) 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0;
  }

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: fit-content;
    background-color: #e6f2ff;
    color: #3083e9;
    padding: 12px 50px;
    border-radius: 50px;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: 1;
    font-weight: 500;
    margin: 0 auto calc($spacing-xs + 10px) auto;

    // display: none;

    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    @include respond(laptop) {
      margin: 0 auto calc($spacing-md - 4px) auto;
      padding: 7px 18px;
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
    }

    @include respond(tablet) {
      margin: 0 auto calc($spacing-sm + 4px) auto;
      padding: 7px 16px;
      font-size: $font-size-p-tablet;
      letter-spacing: $letter-spacing-p-tablet;
    }

    @include respond(phone) {
      margin: 0 auto $spacing-sm auto;
      padding: 6px 14px;
      font-size: $font-size-p-phone;
      letter-spacing: $letter-spacing-p-phone;
    }

    p {
      margin: 0;
      padding: 0;
    }
  }

  &_grid {
    @include content-container;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 0;

    @include respond(tablet) {
      flex-direction: column;
    }

    @include respond(phone) {
      flex-direction: column;
      gap: $spacing-sm;
    }

    &_col-1 {
      width: 51%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background-color: $color-dark-blue;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1200'%3E%3Crect width='800' height='1200' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 150 Q250 220, 450 180 T 800 220' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M0 190 Q280 260, 420 220 T 800 260' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 380 Q320 330, 500 410 T 800 460' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M0 420 Q290 370, 530 450 T 800 500' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M800 680 Q600 750, 400 710 T 0 750' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M800 720 Q570 790, 450 750 T 0 790' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M800 900 Q600 960, 380 920 T 0 970' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M800 940 Q620 1000, 350 960 T 0 1010' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3C/svg%3E");
      background-size: cover;
      border-radius: $border-radius-lg;
      position: relative;
      overflow: hidden;
      min-height: 600px;

      @include respond(tablet) {
        width: 100%;
        min-height: 440px;
        margin: 0 0 12px 0;
        order: 1;
        flex-basis: auto;
        border-radius: $border-radius-md;
      }

      @include respond(phone) {
        order: 1;
        flex-basis: auto;
        width: 100%;
        min-height: 340px;
        border-radius: $border-radius-md;
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

      & img {
        height: 560px;
        width: auto;
        background-color: $color-img-platzhalter;
        position: absolute;
        bottom: -10%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 3;
        border-radius: 30px;

        @include respond(tablet) {
          width: 320px;
          height: 440px;
          border-radius: 25px;
          bottom: -15%;
        }

        @include respond(phone) {
          width: 240px;
          height: 300px;
          border-radius: 20px;
          bottom: -5%;
          left: 50%;
          transform: translate(-50%, 0);
        }
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

        @include respond(tablet) {
          padding: 6px 10px;
          gap: 10px;
          border-radius: $border-radius-md;
        }

        @include respond(phone) {
          padding: 5px 8px;
          gap: 8px;
          border-radius: $border-radius-sm;
        }

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

          @include respond(tablet) {
            width: 38px;
            height: 38px;
            font-size: 20px;
          }

          @include respond(phone) {
            width: 32px;
            height: 32px;
            font-size: 18px;
          }
        }

        p {
          margin: 0;
          padding: 0;
          font-weight: 600;
          font-size: calc($font-size-p-desktop - 3px);
          letter-spacing: $letter-spacing-p-desktop;
          color: $color-dark-blue;
          white-space: nowrap;

          @include respond(laptop) {
            font-size: calc($font-size-p-laptop - 3px);
            letter-spacing: $letter-spacing-p-laptop;
          }

          @include respond(tablet) {
            font-size: calc($font-size-p-tablet - 4px);
            letter-spacing: $letter-spacing-p-tablet;
          }

          @include respond(phone) {
            font-size: calc($font-size-p-phone - 4px);
            letter-spacing: $letter-spacing-p-phone;
          }
        }
      }

      .highlight-box-1 {
        top: 40%;
        left: 50%;
        transform: translate(-135%, 0);
        z-index: 5;

        @include respond(laptop) {
          top: 40%;
          left: 52%;
          transform: translate(-110%, 0);
        }

        @include respond(tablet) {
          top: 35%;
          left: 50%;
          transform: translate(-110%, 0);
        }

        @include respond(phone) {
          top: 35%;
          left: 40%;
          transform: translate(-50%, 0);
        }
      }

      .highlight-box-2 {
        top: 55%;
        right: 50%;
        transform: translate(140%, 0);
        z-index: 5;

        @include respond(tablet) {
          top: 50%;
          right: 50%;
          transform: translate(115%, 0);
        }

        @include respond(phone) {
          top: 55%;
          right: 8%;
          left: auto;
          transform: translate(0, 0);
        }
      }

      .highlight-box-3 {
        top: 70%;
        left: 50%;
        transform: translate(-145%, 0);
        z-index: 5;

        @include respond(laptop) {
          top: 70%;
          left: 40%;
          transform: translate(-120%, 0);
        }

        @include respond(tablet) {
          top: 65%;
          left: 50%;
          transform: translate(-120%, 0);
        }

        @include respond(phone) {
          top: 75%;
          left: 30%;
          transform: translate(-50%, 0);
        }
      }
    }

    &_col-2 {
      width: 47%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      @include respond(tablet) {
        order: 2;
        flex: 1;
        width: 100%;
        gap: 12px;
      }

      @include respond(phone) {
        order: 2;
        flex: 1;
        width: 100%;
        gap: 10px;
      }

      & .product_card {
        width: 100%;
        padding: 30px 30px;
        background: white;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        color: $color-dark-blue;
        display: flex;
        align-items: flex-start;
        gap: 25px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        @include respond(laptop) {
          padding: calc($spacing-md + 7.5px) $spacing-md calc($spacing-md)
            $spacing-md;
          gap: $spacing-sm;
        }

        @include respond(tablet) {
          padding: $spacing-md;
          gap: $spacing-sm;
          border-radius: 10px;
        }

        @include respond(phone) {
          padding: $spacing-sm;
          gap: $spacing-xs;
          border-radius: 8px;
        }

        .step-icon {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          background: linear-gradient(
            135deg,
            $color-light-blue 0%,
            #2571d4 100%
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(48, 131, 233, 0.3);

          @include respond(laptop) {
            width: 45px;
            height: 45px;
            border-radius: 11px;
          }

          @include respond(tablet) {
            width: 42px;
            height: 42px;
            border-radius: 10px;
          }

          @include respond(phone) {
            width: 38px;
            height: 38px;
            border-radius: 9px;
          }

          svg {
            width: 26px;
            height: 26px;

            @include respond(laptop) {
              width: 23px;
              height: 23px;
            }

            @include respond(tablet) {
              width: 21px;
              height: 21px;
            }

            @include respond(phone) {
              width: 19px;
              height: 19px;
            }
          }
        }

        .step-content {
          flex: 1;
          color: $color-text-dark;
          line-height: $line-height;
          letter-spacing: $letter-spacing;

          h3 {
            margin: 0 0 10px 0;
            padding: 0;
            font-size: $font-size-h3-lg;
            color: $color-dark-blue;

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
            font-size: $font-size-p-desktop;
            letter-spacing: $letter-spacing-p-desktop;
            line-height: $line-height-p-desktop;
            color: $color-text-dark;

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

          a {
            display: inline-block;
            margin: $spacing-sm 0 0 0;
            text-decoration: none;
            font-size: $font-size-p-desktop;
            letter-spacing: $letter-spacing-p-desktop;
            color: $color-light-blue;
            font-weight: 600;
            transition: color 0.3s ease;

            @include respond(laptop) {
              font-size: $font-size-p-laptop;
              letter-spacing: $letter-spacing-p-laptop;
            }

            @include respond(tablet) {
              font-size: $font-size-p-tablet;
              letter-spacing: $letter-spacing-p-tablet;
              margin: calc($spacing-sm - 2px) 0 0 0;
            }

            @include respond(phone) {
              font-size: $font-size-p-phone;
              letter-spacing: $letter-spacing-p-phone;
              margin: calc($spacing-xs + 2px) 0 0 0;
            }

            &:hover {
              color: #2571d4;
            }

            & i {
              margin: 0 0 0 5px;
              font-size: 15px;

              @include respond(tablet) {
                font-size: 14px;
              }

              @include respond(phone) {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
