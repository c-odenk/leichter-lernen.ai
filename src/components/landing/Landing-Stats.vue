<template>
  <section class="landing-stats">
    <div class="landing-stats_container">
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
          class="lucide lucide-shield-alert-icon lucide-shield-alert"
        >
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <p>Das Problem</p>
      </div>

      <SectionHeading :heading="heading" :subheading="subheading" />

      <div class="stats-grid">
        <div v-for="(stat, index) in stats" :key="index" class="stat-card">
          <div class="stat-header">
            <div class="stat-icon">
              <Repeat v-if="stat.icon === 'Repeat'" :size="24" />
              <Frown v-if="stat.icon === 'Frown'" :size="24" />
              <BellRing v-if="stat.icon === 'BellRing'" :size="24" />
              <TriangleAlert v-if="stat.icon === 'TriangleAlert'" :size="24" />
            </div>
            <h3 class="stat-title">{{ stat.title }}</h3>
          </div>
          <div class="stat-footer">
            <p class="stat-description">{{ stat.description }}</p>
            <router-link :to="stat.link" class="stat-link">
              Mehr erfahren <i class="fa-solid fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeading from "@/components/headings/Section-Heading.vue";
import { Repeat, Frown, BellRing, TriangleAlert } from "lucide-vue-next";

export default {
  name: "StatsSection",
  components: {
    SectionHeading,
    // eslint-disable-next-line vue/no-unused-components
    Repeat,
    // eslint-disable-next-line vue/no-unused-components
    Frown,
    // eslint-disable-next-line vue/no-unused-components
    BellRing,
    // eslint-disable-next-line vue/no-unused-components
    TriangleAlert,
  },

  data() {
    return {
      heading: "Traditionelles Lernen kostet Zeit & Nerven",
      subheading:
        "Stundenlanges Suchen, manuelles Zusammenfassen und ineffizientes Wiederholen – klassische Lernmethoden sind überholt.",

      stats: [
        {
          title: "Ineffektive Lernmethoden",
          description:
            "Passives Wiederholen schafft nur die Illusion von Wissen ohne echtes Verständnis.",
          icon: "Repeat",
          link: "/blog",
        },
        {
          title: "Erhöhter Prüfungsstress",
          description:
            "Last-Minute-Vorbereitung durch fehlende Struktur im Lernprozess.",
          icon: "Frown",
          link: "/blog",
        },
        {
          title: "Viele fühlen sich überfordert",
          description:
            "Zu viel Material, keine klare Priorisierung – Überforderung ist vorprogrammiert.",
          icon: "BellRing",
          link: "/blog",
        },
        {
          title: "1 von 3 fällt durch Prüfungen",
          description:
            "Ohne effektive Lernstrategien und strukturierte Vorbereitung scheitern viele Studierende.",
          icon: "TriangleAlert",
          link: "/blog",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.landing-stats {
  width: 100%;
  // margin: calc($spacing-lg + 100px) 0;
  margin: $spacing-lg 0 calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: $spacing-lg 0 calc($spacing-lg + 50px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-md 0 calc($spacing-lg + 20px) 0;
  }

  @include respond(phone) {
    margin: $spacing-lg 0;
  }

  &_container {
    @include content-container;

    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: fit-content;
      background-color: #fce7e7;
      color: #dc2626;
      padding: 12px 50px;
      border-radius: 50px;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      line-height: 1;
      margin: 0 auto $spacing-md auto;

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

      // NEU HINZUGEFÜGT: Entfernt das Standard-Margin des p-Elements
      p {
        margin: 0;
        padding: 0;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;

      @include respond(laptop) {
        gap: 15px;
      }

      @include respond(tablet) {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      @include respond(phone) {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .stat-card {
        background: white;
        border-radius: 12px;
        padding: $spacing-md;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;

        @include respond(laptop) {
          padding: $spacing-md;
        }

        @include respond(tablet) {
          padding: $spacing-md;
        }

        @include respond(phone) {
          padding: $spacing-md;
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: $spacing-sm;
          margin: 0 0 $spacing-md 0;

          @include respond(laptop) {
            gap: calc($spacing-sm - 2px);
            margin: 0 0 $spacing-sm 0;
          }

          @include respond(tablet) {
            gap: calc($spacing-sm - 2px);
            margin: 0 0 $spacing-sm 0;
          }

          @include respond(phone) {
            gap: calc($spacing-sm - 4px);
            margin: 0 0 $spacing-sm 0;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            background-color: #fce7e7;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #dc2626;

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

            :deep(svg) {
              width: 24px;
              height: 24px;

              @include respond(laptop) {
                width: 22px;
                height: 22px;
              }

              @include respond(tablet) {
                width: 20px;
                height: 20px;
              }

              @include respond(phone) {
                width: 18px;
                height: 18px;
              }
            }
          }

          .stat-title {
            margin: 0;
            padding: 0;
            font-size: $font-size-h3-lg;
            font-weight: 600;
            color: $color-dark-blue;
            line-height: 1.3;

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
        }

        .stat-footer {
          margin-top: auto;
          padding-top: $spacing-sm;
          border-top: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          gap: $spacing-sm;

          @include respond(phone) {
            padding-top: calc($spacing-sm - 2px);
            gap: calc($spacing-xs + 2px);
          }

          .stat-description {
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

          .stat-link {
            display: inline-block;
            text-decoration: none;
            font-size: $font-size-p-desktop;
            letter-spacing: $letter-spacing-p-desktop;
            color: #dc2626;
            font-weight: 600;
            transition: color 0.3s ease;

            @include respond(laptop) {
              font-size: $font-size-p-laptop;
              letter-spacing: $letter-spacing-p-laptop;
            }

            @include respond(tablet) {
              font-size: $font-size-p-tablet;
              letter-spacing: $letter-spacing-p-tablet;
            }

            @include respond(phone) {
              font-size: $font-size-p-phone;
              letter-spacing: $letter-spacing-p-phone;
            }

            &:hover {
              color: darken(#dc2626, 10%);
            }

            i {
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
