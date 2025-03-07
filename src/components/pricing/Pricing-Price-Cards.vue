<template>
  <div class="pricing-price-cards">
    <div class="pricing-price-cards_row">
      <div
        v-for="(plan, index) in pricingPlans"
        :key="index"
        class="price-card"
        :class="{ mostWantedBody: plan.mostWanted }"
      >
        <img
          v-if="!plan.available"
          :src="require(`@/assets/coming-soon.png`)"
          alt="User Image"
        />

        <h3>{{ plan.title }}</h3>
        <p>{{ plan.description }}</p>
        <p>
          <span class="preis">{{ plan.price }}</span> {{ plan.priceModel }}
        </p>
        <router-link to="/#"> Jetzt loslegen </router-link>
        <ul>
          <li v-for="(feature, idx) in plan.features" :key="idx">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingInfoSection",
  data() {
    return {
      pricingPlans: [
        {
          title: "Lern-Paket: Verstehe & vertiefe dein Wissen!",
          description:
            "Dein Dokument - klar strukturiert und verständlich. Inklusive automatisch generiertem Fragenkatalog.",
          price: "€6.99",
          priceModel: "einmaliger Kauf",
          features: [
            "Identifikation & klare Strukturierung der Kernthemen deines Dokuments.",
            "Detaillierte, KI-gestützte Zusammenfassung deines Dokuments.",
            "Automatisch generiertes Multiple-Choice-Quiz zur Wissensüberprüfung.",
            "Ideal für schnelles, effektives Lernen mit aktiver Wiederholung.",
          ],
          available: true,
          mostWanted: true,
        },
        {
          title: "Prüfungs-Paket: Teste dein Wissen umfassend!",
          description:
            "Lernen, üben, testen – noch mehr Tests für dich mit automatischer Auswertung für eine gezielte Vorbereitung.",
          price: "€9.99",
          priceModel: "einmaliger Kauf",
          features: [
            "Identifikation & klare Strukturierung der Kernthemen.",
            "Detaillierte, KI-gestützte Zusammenfassung deines Dokuments.",
            "Automatisch generiertes Multiple-Choice-Quiz zur Wissensüberprüfung.",
            "Automatisch generierte Probeklausur inkl. Auswertung.",
            "Perfekt für eine intensive Prüfungsvorbereitung mit realistischem Testlauf!",
          ],
          available: false,
          mostWanted: false,
        },
        {
          title: "Tutor-Paket: Dein persönlicher KI-Lernassistent!",
          description:
            "Lernen mit KI-gestützter Echtzeit-Interaktion! Kommuniziere mit deinen Dokumenten und erhalte präzise Antworten auf deine Fragen.",
          price: "€24.99",
          priceModel: "einmaliger Kauf",
          features: [
            "Identifikation & klare Strukturierung der Kernthemen.",
            "Detaillierte, KI-gestützte Zusammenfassung deines Dokuments.",
            "Automatisch generiertes Multiple-Choice-Quiz zur Wissensüberprüfung.",
            "Automatisch generierte Probeklausur inkl. Auswertung.",
            "Kommuniziere mit deinen Unterlagen durch modernste RAG-Technologie.",
            "Erhalte gezielte Antworten und tiefergehende Erklärungen zu deinem Lernstoff.",
            "Ideal für personalisiertes Lernen mit direktem Wissensaustausch.",
          ],
          available: false,
          mostWanted: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.pricing-price-cards {
  width: 100%;

  &_row {
    width: 62%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 100px auto 50px auto;

    & .price-card {
      width: 31%;
      margin: 0;
      padding: 40px 25px 40px 25px;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.07);
      border-radius: 15px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
      position: relative;

      & img {
        width: 110px;
        height: 110px;
        position: absolute;
        top: -60px;
        right: -40px;

        transform: rotate(-15deg);
        // transform: translate(0, 0);
      }

      & h3 {
        margin: 0 0 25px 0;
        padding: 0;
      }

      & p {
        margin: 0;
        padding: 0;
        font-size: $font-size-p-lg - 1px;
        line-height: $line-height;
        letter-spacing: $letter-spacing;

        &:first-of-type {
          margin: 0 0 20px 0;
          min-height: 95px;
        }

        &:last-of-type {
          font-size: $font-size-p-lg - 4px;
        }

        & .preis {
          margin: 0 0 0 0;
          padding: 0;
          font-size: 45px;
          font-weight: 500;
        }
      }

      & ul {
        margin: 0 0 40px 0;
        padding: 0;
        list-style: none;

        & li {
          margin: 0;
          padding: 0 0 20px 25px;
          font-size: $font-size-p-lg - 2px;
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
          }

          &:last-child::before {
            content: "\f0e7";
          }
        }
      }

      & a {
        display: block;
        width: 100%;
        margin: 20px 0 50px 0;
        padding: 12.5px 18px;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
        text-decoration: none;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        background-color: $color-light-blue;
        box-sizing: border-box;

        @include respond(tablet) {
        }

        @include respond(phone) {
        }
      }
    }

    & .mostWantedBody {
      background-color: $color-dark-blue;
      color: #fff;
    }
  }
}
</style>
