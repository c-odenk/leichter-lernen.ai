<template>
  <!-- Hauptcontainer für die Preiskarten-Sektion -->
  <div class="pricing-price-cards">
    <div class="pricing-price-cards_row">
      <!-- Iteration über alle Preispläne mit v-for -->
      <div
        v-for="(plan, index) in pricingPlans"
        :key="index"
        class="price-card"
        :class="{ mostWantedBody: plan.mostWanted }"
      >
        <!-- "Coming Soon" Bild wird nur angezeigt, wenn der Plan nicht verfügbar ist -->
        <img
          v-if="!plan.available"
          :src="require(`@/assets/coming-soon.png`)"
          alt="User Image"
        />

        <!-- Überschrift des Preisplans -->
        <h3>{{ plan.title }}</h3>
        <!-- Beschreibung des Preisplans -->
        <p>{{ plan.description }}</p>
        <!-- Preisdarstellung mit hervorgehobenem Preisbetrag -->
        <p>
          <span class="preis">{{ plan.price }}</span> {{ plan.priceModel }}
        </p>
        <!-- Call-to-Action Button -->
        <router-link to="/#"> Jetzt loslegen </router-link>
        <!-- Liste der Features für diesen Preisplan -->
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
      // Array mit den verschiedenen Preisplänen und ihren Eigenschaften
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
          available: true, // Verfügbarkeit: true = sofort verfügbar, false = coming soon
          mostWanted: true, // Markierung als beliebtestes Paket
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
          available: false, // Noch nicht verfügbar, "Coming Soon" wird angezeigt
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
          available: false, // Noch nicht verfügbar, "Coming Soon" wird angezeigt
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
    /* Zentrale Container-Zeile für die Preiskarten */
    width: 62%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 100px auto 50px auto;

    /* Responsives Verhalten für verschiedene Bildschirmgrößen */
    @include respond(laptop) {
      width: 80%; // Breiteren Container auf Laptops verwenden
    }

    @include respond(tablet) {
      width: 90%; // Noch breiteren Container auf Tablets
      flex-direction: column; // Untereinander anordnen statt nebeneinander
      align-items: center;
      gap: 80px; // Abstand zwischen den Karten
    }

    & .price-card {
      /* Grundlegende Stilisierung der Preiskarten */
      width: 31%;
      margin: 0;
      padding: 40px 25px;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.07);
      border-radius: 15px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      /* Responsives Verhalten der Karten */
      @include respond(tablet) {
        width: 75%; // Breitere Karten auf Tablets
      }

      @include respond(phone) {
        width: 100%; // Volle Breite auf Smartphones
      }

      /* Hover-Effekt für bessere Interaktivität */
      &:hover {
        transform: translateY(-3px); // Leichte Anhebung bei Hover
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.15); // Verstärkter Schatten
      }

      /* Coming-Soon Bild Styling */
      & img {
        width: 90px;
        height: 90px;
        position: absolute;
        top: -50px;
        right: -40px;
        transform: rotate(-15deg); // Leicht gedreht für visuellen Effekt
      }

      /* Überschrift-Styling */
      & h3 {
        min-height: 60px;
        margin: 0 0 25px 0;
        padding: 0;
        font-size: $font-size-h3-lg;

        @include respond(phone) {
          font-size: $font-size-h3-sm; // Kleinere Schrift auf Smartphones
        }
      }

      /* Paragraph-Styling für Beschreibungen und Preise */
      & p {
        margin: 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;

        &:first-of-type {
          margin: 0 0 20px 0;
          min-height: 95px; // Feste Höhe für einheitliches Layout

          @include respond(phone) {
            min-height: auto; // Auf Smartphones automatische Höhe
          }
        }

        &:last-of-type {
          font-size: $font-size-p-lg;
        }

        /* Preisbetrags-Styling */
        & .preis {
          margin: 0;
          padding: 0;
          font-size: 2.8125rem; // 45px in rem
          font-weight: 500;
        }
      }

      /* Feature-Liste Styling */
      & ul {
        margin: 0 0 40px 0;
        padding: 0;
        list-style: none;

        & li {
          margin: 0;
          padding: 0 0 20px 25px;
          font-size: $font-size-p-lg;
          line-height: $line-height;
          letter-spacing: $letter-spacing;
          position: relative;

          /* Haken-Icon vor jedem Listenelement */
          &::before {
            content: "\f00c"; // FontAwesome Haken-Icon
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 0;
            top: 2px;
            color: $color-success;
          }

          /* Spezial-Icon für das letzte Feature (Blitz) */
          &:last-child::before {
            content: "\f0e7"; // FontAwesome Blitz-Icon
            color: $color-warning;
          }
        }
      }

      /* Styling für den CTA-Button */
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
        color: $color-text-white;
        border-radius: 5px;
        background-color: $color-light-blue;
        box-sizing: border-box;
        transition: background-color 0.3s ease;

        /* Hover-Effekt für den Button */
        &:hover {
          background-color: $color-light-blue-darker;
        }

        /* Responsives Button-Styling */
        @include respond(tablet) {
          padding: 15px 20px; // Größere Padding auf Tablets für bessere Touch-Nutzung
        }

        @include respond(phone) {
          margin: 20px 0 30px 0; // Kleinerer Abstand auf Smartphones
        }
      }
    }

    /* Spezial-Styling für die "beliebteste" Karte */
    & .mostWantedBody {
      background-color: $color-dark-blue;
      color: $color-text-white;

      /* "Beliebt"-Badge auf der hervorgehobenen Karte */
      &::before {
        content: "Beliebt";
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $color-warning;
        color: $color-text-dark;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
  }
}
</style>
