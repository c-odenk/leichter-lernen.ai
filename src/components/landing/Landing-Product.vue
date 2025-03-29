<template>
  <div class="landing-product">
    <div class="landing-product_row">
      <div class="landing-product_row_col-1" aria-hidden="true"></div>
      <div class="landing-product_row_col-2">
        <div class="features-grid">
          <div
            v-for="(feature, index) in workflowSteps"
            :key="index"
            class="feature-card"
          >
            <div class="feature-icon" v-html="feature.icon"></div>
            <div class="feature-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductSection",

  data() {
    return {
      workflowSteps: [
        {
          title: "1. Auf der Lernplattform anmelden",
          description:
            "Erstelle in wenigen Sekunden dein Konto und erhalte Zugang zu unserem KI-basierten Lernangebot für effizienteres Studieren.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a5 5 0 015 5v2a5 5 0 01-10 0V7a5 5 0 015-5z"></path>
                  <path d="M19 9v1a7 7 0 01-14 0V9"></path>
                  <rect x="5" y="14" width="14" height="5" rx="2"></rect>
                  <path d="M12 14v3"></path>
                  <path d="M12 19v2"></path>
                </svg>`,
        },
        {
          title: "2. Dokument hochladen",
          description:
            "Lade deine Skripte, Notizen oder Lernmaterialien in den üblichen Textformaten hoch und lass unsere KI die Analyse für dich übernehmen.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 18a2 2 0 002 2h12a2 2 0 002-2V8h-4a2 2 0 01-2-2V2H6a2 2 0 00-2 2v14z"></path>
                  <path d="M14 2v4a2 2 0 002 2h4"></path>
                  <path d="M12 12v5"></path>
                  <path d="M8 15l4-4 4 4"></path>
                </svg>`,
        },
        {
          title: "3. KI-Paket auswählen",
          description:
            "Wähle aus unseren verschiedenen KI-Paketen – vom günstigen Einstiegspaket bis zur Premium-Variante mit allen Lernfunktionen für deinen Erfolg.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="8.5" y1="19" x2="8.5" y2="21"></line>
                  <line x1="15.5" y1="19" x2="15.5" y2="21"></line>
                  <path d="M20 12h.01"></path>
                  <path d="M3.95 12h.01"></path>
                  <path d="M19 8l-2 2"></path>
                  <path d="M5 8l2 2"></path>
                </svg>`,
        },
        {
          title: "4. Optimierte Lernmaterialien erhalten",
          description:
            "Unsere KI erstellt dir deine optimierten Lernmaterialien. Je nach Paket erhälst du Zusammenfassungen, Multiple-Choice Quizzes, Probeklausuren oder Zugang zum KI-Tutor.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                  <line x1="12" y1="12" x2="12" y2="22"></line>
                </svg>`,
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
    margin: 10px 0 $spacing-md 0;
  }

  @include respond(tablet) {
    margin: $spacing-md 0;
  }

  @include respond(phone) {
    margin: $spacing-sm 0;
  }

  &_row {
    @include content-container;
    @include flex-between;
    padding: 0;

    @include respond(laptop) {
      height: 500px;
    }

    @include respond(tablet) {
      flex-direction: column;
      height: auto;
    }

    @include respond(phone) {
      flex-direction: column;
      height: auto;
    }

    &_col-1 {
      width: 36%;
      height: 45vh;
      // background-color: $color-dark-blue;
      border-radius: $border-radius-lg;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("~@/assets/product-hero.png");

      @include respond(phone) {
        display: none; // Ausblenden auf Smartphone
      }
    }

    &_col-2 {
      width: 62.5%;
      height: 45vh;
      background-color: $color-dark-blue;
      border-radius: $border-radius-lg;
      padding: $spacing-md;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
      box-shadow: $shadow-md;

      @include respond(tablet) {
        width: 100%;
        height: auto;
        min-height: 60vh;
      }

      @include respond(phone) {
        width: 100%;
        height: auto;
        min-height: 80vh;
        // padding: $spacing-sm;
        padding: 0;
        background-color: transparent; // Entfernt Hintergrundfarbe für Smartphones
        box-shadow: none; // Entfernt Schatten für Smartphones
      }
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: $spacing-md;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  @include respond(phone) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: $spacing-sm;
  }
}

.feature-card {
  display: flex;
  flex-direction: column;
  padding: $spacing-md;
  // border-radius: $border-radius-md;
  border-radius: $border-radius-lg;
  transition: all $transition-speed-medium $transition-timing;
  position: relative;
  overflow: hidden;
  background-color: rgba(48, 131, 233, 0.08);
  border: 1px solid rgba(48, 131, 233, 0.15);

  // Subtiler Glanz-Effekt
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.02) 40%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 75%
    );
    transform: rotate(-45deg);
    z-index: 0;
  }

  &:hover {
    background-color: $color-light-blue;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

    .feature-icon {
      background-color: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }
  }

  @include respond(phone) {
    background-color: $color-dark-blue; // Behalte dunkelblauen Hintergrund für Feature-Cards
    margin-bottom: $spacing-xs; // Fügt zusätzlichen Abstand zwischen den Karten hinzu
    padding: $spacing-sm;
  }
}

.feature-icon {
  width: 70px;
  height: 70px;
  margin-bottom: $spacing-sm;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: $border-radius-lg;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
  z-index: 1;
  transition: all $transition-speed-medium $transition-timing;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  @include respond(laptop) {
    width: 60px;
    height: 60px;
  }

  @include respond(tablet) {
    width: 50px;
    height: 50px;
    padding: 12px;
  }

  @include respond(phone) {
    width: 45px;
    height: 45px;
    padding: 10px;
  }

  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
  }
}

.feature-content {
  position: relative;
  z-index: 1;

  h3 {
    color: $color-text-white;
    font-size: $font-size-h3-lg;
    margin: $spacing-xs 0;
    letter-spacing: 0.3px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

    @include respond(laptop) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.92);
    font-size: $font-size-p-md;
    line-height: 1.5;
    margin: 0;

    @include respond(laptop) {
      font-size: $font-size-p-sm;
    }

    @include respond(phone) {
      font-size: $font-size-p-xs;
    }
  }
}
</style>
