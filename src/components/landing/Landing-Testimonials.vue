<template>
  <div class="landing-testimonials">
    <div class="landing-testimonials_row">
      <h2>💬 {{ heading }}</h2>
      <p>{{ paragraph }}</p>

      <div class="landing-testimonials_row_testimonials">
        <div
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
        /*
        {
          name: "Sophie Keller",
          headline: "Effizient lernen, weniger Stress",
          testimonial:
            "Die Zusammenfassungen und Quizfragen helfen mir enorm. Ich spare Zeit und kann mich viel gezielter auf meine Prüfungen vorbereiten – ohne stundenlang meine Unterlagen durchzugehen.",
          image: "anonymous-user.png",
        },
        {
          name: "Daniel Hoffmann",
          headline: "Perfekt für last-minute Lernen",
          testimonial:
            "Wenn eine Prüfung bevorsteht und die Zeit knapp ist, verlasse ich mich auf die KI. Sie filtert die wichtigsten Inhalte heraus, sodass ich mich schnell und effizient vorbereiten kann. Kein unnötiges Blättern mehr!",
          image: "anonymous-user.png",
        },
        */
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-testimonials {
  width: 100%;
  margin: 200px 0 200px 0;

  &_row {
    width: $width-desktop;
    margin: 0 auto;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & h2 {
      margin: 0 0 10px 0;
      padding: 0;
      text-align: center;
    }

    & p {
      width: 60%;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      text-align: center;
    }

    &_testimonials {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      grid-auto-rows: auto;
      margin: 50px auto 0 auto;

      & .testimonial {
        width: calc(100% / 3 - 10px);
        height: auto;
        margin: 0;
        padding: 35px 25px 40px 25px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.07);
        border-radius: 15px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
        background-image: url("https://cdn.prod.website-files.com/642c9095b374127dfdae1169/67b4805b2e4275aa6ac3fa36_points-stats.svg");

        &_header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 30px 0;

          & img {
            width: 65px;
            height: 65px;
            border-radius: 50%;
          }

          & h3 {
            display: inline-block;
            margin: 0 15px 0 0;
            padding: 0;
          }
        }

        &_body {
          & h3 {
            // color: orange;
          }

          & p {
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
