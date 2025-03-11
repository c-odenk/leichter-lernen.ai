<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <ul class="landing-testimonials_row_testimonials">
        <li
          class="testimonial"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div class="testimonial_header">
            <img
              :src="require(`@/assets/${testimonial.image}`)"
              alt="User Image"
            />

            <h3>{{ testimonial.name }}</h3>
          </div>
          <div class="testimonial_body">
            <h3>{{ testimonial.headline }}</h3>
            <p>{{ testimonial.testimonial }}</p>
          </div>
        </li>
      </ul>
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
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-testimonials {
  width: 100%;
  margin: $spacing-xl 0;

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
      font-size: $font-size-p-lg;
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

    &_testimonials {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: $spacing-xs;
      margin: $spacing-lg auto 0 auto;
      padding: 0;
      list-style: none;

      & .testimonial {
        width: calc(100% / 3 - #{$spacing-xs});
        height: auto;
        margin: 0;
        padding: $spacing-md $spacing-sm $spacing-lg $spacing-sm;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.07);
        border-radius: $border-radius-lg;
        box-shadow: $shadow-md;
        background-image: url("https://cdn.prod.website-files.com/642c9095b374127dfdae1169/67b4805b2e4275aa6ac3fa36_points-stats.svg");
        transition: transform $transition-speed-medium $transition-timing;

        @include respond(tablet) {
          width: calc(50% - #{$spacing-xs});
        }

        @include respond(phone) {
          width: 100%;
        }

        &_header {
          @include flex-between;
          margin: 0 0 $spacing-md 0;

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

          & p {
            width: 100%;
            text-align: left;
            font-size: $font-size-p-lg;

            @include respond(tablet) {
              font-size: $font-size-p-md;
            }

            @include respond(phone) {
              font-size: $font-size-p-sm;
            }
          }
        }
      }
    }
  }
}
</style>
