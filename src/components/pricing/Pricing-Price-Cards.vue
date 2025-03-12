<template>
  <!-- Hauptcontainer für die Preiskarten-Sektion -->
  <div class="pricing-price-cards">
    <div class="pricing-price-cards_row">
      <!-- Iteration über alle Preispläne mit v-for -->
      <div
        v-for="(plan, index) in productSortiment"
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
        <!-- Call-to-Action Button, abhängig von der Verfügbarkeit -->
        <span v-if="!plan.available" class="disabled-button"
          >Bald verfügbar</span
        >
        <router-link v-else to="/login">Jetzt loslegen</router-link>
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
  name: "PricingPriceCards",
  props: {
    productSortiment: {
      type: Array,
      required: true,
    },
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
        display: none;
      }

      /* Überschrift-Styling */
      & h3 {
        min-height: 40px;
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
        font-size: calc($font-size-p-lg - 1px);
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
          font-size: calc($font-size-p-lg - 1px);
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

      /* Styling für den deaktivierten Button */
      & .disabled-button {
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
        // background-color: $color-grey;
        background-color: gray;
        cursor: not-allowed;
        box-sizing: border-box;

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
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $color-warning;
        color: $color-text-dark;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: calc($font-size-p-lg - 5px);
        font-weight: 600;
      }
    }
  }
}
</style>
