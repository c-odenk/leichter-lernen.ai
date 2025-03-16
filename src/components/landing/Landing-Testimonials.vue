<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <div class="masonry-container">
        <div
          class="masonry-item"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div class="testimonial">
            <div class="testimonial_header">
              <img
                :src="require(`@/assets/${testimonial.image}`)"
                alt="User Image"
              />
              <h3>{{ testimonial.name }}</h3>
            </div>
            <div class="testimonial_body">
              <h3>{{ testimonial.headline }}</h3>
              <p class="testimonial-text">{{ testimonial.testimonial }}</p>
            </div>
          </div>
        </div>
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
          headline: "Skripte schneller verstehen",
          testimonial:
            "Die KI-gestützte Zusammenfassung hilft mir, Skripte schnell zu erfassen. Besonders die Lernkarten sind ideal für langfristiges Lernen!",
          image: "anonymous-user.png",
        },
        {
          name: "Thomas Schmidt",
          headline: "Gezielte Prüfungsvorbereitung",
          testimonial:
            "Die KI extrahiert die Kernthemen aus meinen Unterlagen. So finde ich schnell die wichtigen Punkte und kann mich gezielt vorbereiten. Die automatischen Prüfungsfragen mit direktem Feedback sind ein echter Gamechanger!",
          image: "anonymous-user.png",
        },
        {
          name: "Laura Meier",
          headline: "Schnelle Antworten auf alle Fragen",
          testimonial:
            "Der KI-Tutor ist eine riesige Hilfe! Ich kann jederzeit Fragen stellen und bekomme sofort präzise Antworten. So erkenne ich schnell meine Wissenslücken.",
          image: "anonymous-user.png",
        },
        {
          name: "Felix Weber",
          headline: "Sofortige Testergebnisse",
          testimonial:
            "Ich liebe es, dass ich meine Tests direkt ausgewertet bekomme. Das Feedback zeigt mir sofort, wo ich noch nachbessern muss – perfekt für die Prüfungsvorbereitung!",
          image: "anonymous-user.png",
        },
        {
          name: "Julia Braun",
          headline: "Alles in einem Paket",
          testimonial:
            "Das Semester-Paket ist eine echte Erleichterung! Alle Tools, die ich brauche, sind vereint – besonders die automatischen Prüfungsfragen helfen mir enorm beim Lernen.",
          image: "anonymous-user.png",
        },
        {
          name: "Lukas Fischer",
          headline: "Struktur und Zeitersparnis",
          testimonial:
            "Ich lade meine Skripte hoch und erhalte sofort eine klare Struktur und Zusammenfassung. Das spart mir viel Zeit und lässt mich effizienter lernen. Top!",
          image: "anonymous-user.png",
        },
      ],
    };
  },
  mounted() {
    // Masonry Layout initialisieren, wenn die Komponente in den DOM eingehängt wird
    this.$nextTick(() => {
      this.initMasonry();
      // Event-Listener für Fenstergrößenänderungen
      window.addEventListener("resize", this.debounce(this.initMasonry, 200));
    });
  },
  beforeUnmount() {
    // Event-Listener entfernen, wenn die Komponente aus dem DOM entfernt wird
    window.removeEventListener("resize", this.debounce(this.initMasonry, 200));
  },
  methods: {
    initMasonry() {
      const container = document.querySelector(".masonry-container");
      const items = Array.from(document.querySelectorAll(".masonry-item"));

      if (!container || items.length === 0) return;

      // Zurücksetzen
      items.forEach((item) => {
        item.style.position = "";
        item.style.left = "";
        item.style.top = "";
      });
      container.style.height = "";

      // Anzahl der Spalten basierend auf Viewport-Breite bestimmen
      let columnCount = 3;
      const containerWidth = container.offsetWidth - 32; // Abzüglich Padding

      if (containerWidth < 768) {
        columnCount = 1;
      } else if (containerWidth < 992) {
        columnCount = 2;
      }

      // Spaltenbreite berechnen (unter Berücksichtigung des Abstands)
      const gap = 16; // $spacing-xs in Pixeln, passe es an deine Variablen an
      const columnWidth =
        (containerWidth - gap * (columnCount - 1)) / columnCount;

      // Arrays für die Spalten und ihre Höhen initialisieren
      const columns = Array(columnCount).fill(0);

      // Elemente in die Spalten einfügen
      items.forEach((item) => {
        // Finde die kürzeste Spalte
        const shortestColumnIndex = columns.indexOf(Math.min(...columns));

        // Setze Position des Elements
        item.style.position = "absolute";
        item.style.width = columnWidth + "px";
        item.style.left = shortestColumnIndex * (columnWidth + gap) + "px";
        item.style.top = columns[shortestColumnIndex] + "px";

        // Aktualisiere die Höhe der Spalte
        columns[shortestColumnIndex] += item.offsetHeight + gap;
      });

      // Höhe des Containers anpassen
      container.style.height = Math.max(...columns) + "px";
    },
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-testimonials {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

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
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      text-align: center;

      @include respond(tablet) {
        width: 80%;
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        width: 95%;
        font-size: $font-size-p-sm;
      }
    }
  }
}

.masonry-container {
  width: 100%;
  margin: $spacing-lg auto 0 auto;
  position: relative;
  /*
  background-color: rgba(
    248,
    241,
    241,
    0.3
  ); */ /* Zarter Rosa-Hintergrund wie im Screenshot */
  padding: $spacing-md;
  border-radius: $border-radius-lg;
}

.masonry-item {
  position: absolute;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    z-index: 1;
  }
}

.testimonial {
  padding: $spacing-md $spacing-sm $spacing-lg $spacing-sm;
  box-sizing: border-box;
  border: none;
  border-radius: $border-radius-lg;
  background-color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle,
      rgba(48, 131, 233, 0.25) 2px,
      transparent 2px
    );
    background-size: 18px 18px;
    z-index: 0;
    mask-image: linear-gradient(
      315deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%
    );
    -webkit-mask-image: linear-gradient(
      315deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%
    );
  }
  box-shadow: $shadow-md;
  transition: box-shadow $transition-speed-medium $transition-timing;

  &:hover {
    box-shadow: $shadow-lg;
  }

  @include respond(tablet) {
    border-radius: $border-radius-md;
  }

  @include respond(phone) {
    border-radius: $border-radius-sm;
  }

  &_header {
    @include flex-between;
    margin: 0 0 $spacing-md 0;
    position: relative;
    z-index: 1;

    & img {
      width: 65px;
      height: 65px;
      border-radius: $border-radius-round;
    }

    & h3 {
      display: inline-block;
      margin: 0 $spacing-xs 0 0;
      padding: 0;
      font-size: $font-size-h3-lg;

      @include respond(tablet) {
        font-size: $font-size-h3-md;
      }

      @include respond(phone) {
        font-size: $font-size-h3-sm;
      }
    }
  }

  &_body {
    position: relative;
    z-index: 1;

    & h3 {
      color: $color-dark-blue;
      font-size: $font-size-h3-lg;

      @include respond(tablet) {
        font-size: $font-size-h3-md;
      }

      @include respond(phone) {
        font-size: $font-size-h3-sm;
      }
    }

    & p.testimonial-text {
      width: 100%;
      margin: 0;
      text-align: left;
      font-size: $font-size-p-lg;

      @include respond(tablet) {
        font-size: calc(#{$font-size-p-md} - 2px);
      }

      @include respond(phone) {
        font-size: calc(#{$font-size-p-sm} - 2px);
      }
    }
  }
}
</style>
