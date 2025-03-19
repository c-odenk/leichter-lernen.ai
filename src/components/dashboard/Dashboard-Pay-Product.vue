<template>
  <div class="payment-container">
    <div class="component-header">
      <h3>Zahlungsinformationen</h3>
      <div class="step-indicator">Schritt 3 von 3</div>
    </div>

    <div class="component-content">
      <div class="product-summary">
        <div class="product-info">
          <div class="product-icon">
            <div class="icon-circle">
              <i class="fa-solid fa-shopping-cart"></i>
            </div>
          </div>
          <div class="product-details">
            <p class="product-name">{{ productName }}</p>
            <p class="product-price">{{ formatCurrency(productPrice) }}</p>
          </div>
        </div>
      </div>

      <div class="payment-methods">
        <p class="section-title">Zahlungsmethode auswählen</p>
        <div class="payment-options">
          <div
            class="payment-option"
            v-for="(method, index) in paymentMethods"
            :key="index"
            :class="{ selected: selectedMethod === method.id }"
            @click="selectPaymentMethod(method.id)"
          >
            <div class="payment-option-icon">
              <i :class="method.icon"></i>
            </div>
            <div class="payment-option-label">{{ method.name }}</div>
          </div>
        </div>
      </div>

      <div class="payment-details-container">
        <div v-if="selectedMethod === 'credit-card'" class="payment-details">
          <div class="form-group">
            <label for="card-holder">Karteninhaber</label>
            <input
              type="text"
              id="card-holder"
              v-model="cardHolder"
              placeholder="Name des Karteninhabers"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="card-number">Kartennummer</label>
            <input
              type="text"
              id="card-number"
              v-model="cardNumber"
              placeholder="1234 5678 9012 3456"
              class="form-input"
              @input="formatCardNumber"
            />
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label for="expiry-date">Ablaufdatum</label>
              <input
                type="text"
                id="expiry-date"
                v-model="expiryDate"
                placeholder="MM/JJ"
                class="form-input"
                @input="formatExpiryDate"
              />
            </div>
            <div class="form-group half">
              <label for="cvv">Sicherheitscode</label>
              <input
                type="text"
                id="cvv"
                v-model="cvv"
                placeholder="123"
                class="form-input"
                maxlength="4"
              />
            </div>
          </div>
        </div>

        <div v-if="selectedMethod === 'paypal'" class="payment-details">
          <div class="paypal-info">
            <p>
              Sie werden zur PayPal-Website weitergeleitet, um die Zahlung
              abzuschließen.
            </p>
          </div>
        </div>
      </div>

      <div class="billing-address">
        <p class="section-title">Rechnungsadresse</p>
        <div class="form-group">
          <label for="fullname">Vollständiger Name</label>
          <input
            type="text"
            id="fullname"
            v-model="billingAddress.name"
            placeholder="Max Mustermann"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="street">Straße und Hausnummer</label>
          <input
            type="text"
            id="street"
            v-model="billingAddress.street"
            placeholder="Musterstraße 123"
            class="form-input"
          />
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label for="postal-code">Postleitzahl</label>
            <input
              type="text"
              id="postal-code"
              v-model="billingAddress.postalCode"
              placeholder="12345"
              class="form-input"
            />
          </div>
          <div class="form-group half">
            <label for="city">Stadt</label>
            <input
              type="text"
              id="city"
              v-model="billingAddress.city"
              placeholder="Berlin"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="country">Land</label>
          <select
            id="country"
            v-model="billingAddress.country"
            class="form-input"
          >
            <option value="DE">Deutschland</option>
            <option value="AT">Österreich</option>
            <option value="CH">Schweiz</option>
            <option value="LU">Luxemburg</option>
          </select>
        </div>
      </div>

      <div class="order-summary">
        <div class="summary-row">
          <span class="summary-label">Produkt:</span>
          <span class="summary-value">{{ formatCurrency(productPrice) }}</span>
        </div>
        <div class="summary-row" v-if="shippingCost > 0">
          <span class="summary-label">Versandkosten:</span>
          <span class="summary-value">{{ formatCurrency(shippingCost) }}</span>
        </div>
        <div class="summary-row" v-if="tax > 0">
          <span class="summary-label">MwSt. (19%):</span>
          <span class="summary-value">{{ formatCurrency(tax) }}</span>
        </div>
        <div class="summary-row total">
          <span class="summary-label">Gesamtsumme:</span>
          <span class="summary-value">{{ formatCurrency(totalAmount) }}</span>
        </div>
      </div>

      <div class="terms-acceptance">
        <label class="checkbox-container">
          <input type="checkbox" v-model="termsAccepted" />
          <span class="checkmark"></span>
          <span class="terms-text"
            >Ich akzeptiere die <a href="#" class="terms-link">AGB</a> und
            <a href="#" class="terms-link">Datenschutzbestimmungen</a></span
          >
        </label>
      </div>

      <div class="navigation-buttons">
        <button class="secondary-button" @click="handleCancel">Zurück</button>
        <button
          class="primary-button"
          :disabled="!isPaymentValid"
          @click="processPayment"
        >
          Jetzt bezahlen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentForm",

  // Props: Daten, die von der übergeordneten Komponente übergeben werden
  props: {
    /**
     * Name des ausgewählten Produkts, das bezahlt werden soll
     */
    productName: {
      type: String,
      default: "Produkt",
    },

    /**
     * Preis des ausgewählten Produkts in Euro (ohne Versand und Steuern)
     */
    productPrice: {
      type: Number,
      default: 0,
    },

    /**
     * Versandkosten für das Produkt in Euro
     */
    shippingCost: {
      type: Number,
      default: 0,
    },
  },

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Verfügbare Zahlungsmethoden mit ID, Name und Icon
       */
      paymentMethods: [
        {
          id: "credit-card",
          name: "Kreditkarte",
          icon: "fa-solid fa-credit-card",
        },
        { id: "paypal", name: "PayPal", icon: "fa-brands fa-paypal" },
      ],

      /**
       * Aktuell ausgewählte Zahlungsmethode (ID)
       */
      selectedMethod: "credit-card",

      /**
       * Kreditkartendaten des Nutzers
       */
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",

      /**
       * Rechnungsadresse des Nutzers
       */
      billingAddress: {
        name: "",
        street: "",
        postalCode: "",
        city: "",
        country: "DE", // Deutschland als Standard
      },

      /**
       * Eindeutige Bestellnummer (hier als zufällige Dummy-Nummer generiert)
       */
      orderId: "ORD-" + Math.floor(Math.random() * 10000),

      /**
       * Flag, ob der Nutzer die AGBs und Datenschutzbestimmungen akzeptiert hat
       */
      termsAccepted: false,

      /**
       * Mehrwertsteuersatz (19%)
       */
      taxRate: 0.19,
    };
  },

  // Berechnete Eigenschaften
  computed: {
    /**
     * Berechnet die Mehrwertsteuer basierend auf dem Produktpreis und dem Steuersatz
     *
     * @returns {number} Berechnete Mehrwertsteuer in Euro
     */
    tax() {
      return this.productPrice * this.taxRate;
    },

    /**
     * Berechnet den Gesamtbetrag inklusive Produkt, Versand und Steuern
     *
     * @returns {number} Gesamtbetrag in Euro
     */
    totalAmount() {
      return this.productPrice + this.shippingCost + this.tax;
    },

    /**
     * Prüft, ob alle erforderlichen Zahlungsinformationen eingegeben wurden
     * Validierung erfolgt basierend auf der ausgewählten Zahlungsmethode
     *
     * @returns {boolean} True wenn alle Pflichtfelder ausgefüllt und gültig sind
     */
    isPaymentValid() {
      if (!this.termsAccepted) return false;

      // Validierung basierend auf der ausgewählten Zahlungsmethode
      if (this.selectedMethod === "credit-card") {
        return (
          this.cardHolder.trim() !== "" &&
          this.cardNumber.replace(/\s/g, "").length === 16 &&
          this.expiryDate.length === 5 &&
          this.cvv.length >= 3 &&
          this.billingAddress.name.trim() !== "" &&
          this.billingAddress.street.trim() !== "" &&
          this.billingAddress.postalCode.trim() !== "" &&
          this.billingAddress.city.trim() !== ""
        );
      } else if (this.selectedMethod === "paypal") {
        // Für PayPal nur Adresse prüfen
        return (
          this.billingAddress.name.trim() !== "" &&
          this.billingAddress.street.trim() !== "" &&
          this.billingAddress.postalCode.trim() !== "" &&
          this.billingAddress.city.trim() !== ""
        );
      }

      return false;
    },
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Setzt die ausgewählte Zahlungsmethode auf die übergebene Methoden-ID
     *
     * @param {string} methodId - ID der auszuwählenden Zahlungsmethode
     */
    selectPaymentMethod(methodId) {
      this.selectedMethod = methodId;
    },

    /**
     * Formatiert die Kreditkartennummer in 4er-Blöcke (z.B. "1234 5678 9012 3456")
     * - Entfernt alle Nicht-Zahlen
     * - Begrenzt auf 16 Zeichen
     * - Fügt nach jeweils 4 Ziffern ein Leerzeichen ein
     */
    formatCardNumber() {
      // Nur Zahlen behalten
      let value = this.cardNumber.replace(/\D/g, "");

      // Auf maximal 16 Zeichen begrenzen
      value = value.substring(0, 16);

      // In 4er Gruppen formatieren
      let formattedValue = "";
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += " ";
        }
        formattedValue += value[i];
      }

      this.cardNumber = formattedValue;
    },

    /**
     * Formatiert das Ablaufdatum der Kreditkarte in das Format MM/JJ
     * - Entfernt alle Nicht-Zahlen
     * - Begrenzt auf 4 Zeichen
     * - Fügt nach den ersten 2 Ziffern einen Schrägstrich ein
     */
    formatExpiryDate() {
      // Nur Zahlen behalten
      let value = this.expiryDate.replace(/\D/g, "");

      // Auf maximal 4 Zeichen begrenzen
      value = value.substring(0, 4);

      // Als MM/JJ formatieren
      if (value.length > 2) {
        this.expiryDate = value.substring(0, 2) + "/" + value.substring(2);
      } else {
        this.expiryDate = value;
      }
    },

    /**
     * Formatiert einen Betrag als Währung im deutschen Format
     *
     * @param {number} amount - Der zu formatierende Betrag
     * @returns {string} Formatierter Betrag (z.B. "42,99 €")
     */
    formatCurrency(amount) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    },

    /**
     * Behandelt den Klick auf den "Abbrechen"-Button
     * Emittiert ein "cancel"-Event an die übergeordnete Komponente
     */
    handleCancel() {
      this.$emit("cancel");
    },

    /**
     * Verarbeitet die Zahlung, wenn alle Daten gültig sind
     * Sammelt alle relevanten Zahlungsdaten und emittiert ein "payment-complete"-Event
     * mit den Zahlungsdaten als Payload
     */
    processPayment() {
      if (this.isPaymentValid) {
        // Hier würde die tatsächliche Zahlungsverarbeitung stattfinden

        // Zahlungsdaten vorbereiten
        const paymentData = {
          method: this.selectedMethod,
          amount: this.totalAmount,
          billingAddress: this.billingAddress,
          orderId: this.orderId,
        };

        // Je nach Zahlungsmethode weitere Daten hinzufügen
        if (this.selectedMethod === "credit-card") {
          paymentData.cardDetails = {
            holder: this.cardHolder,
            number: this.cardNumber.replace(/\s/g, ""),
            expiry: this.expiryDate,
            cvv: this.cvv,
          };
        }

        // Zahlungsereignis auslösen
        this.$emit("payment-complete", paymentData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.payment-container {
  width: $width-modal-desktop;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;
  box-sizing: border-box;

  @include respond(laptop) {
    width: $width-modal-laptop;
  }
}

.component-header {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid #eee;
  background-color: $color-text-white;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    color: $color-text-dark;
    font-size: $font-size-h3-lg;
    font-weight: 600;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }

  .step-indicator {
    font-size: 14px;
    font-weight: 500;
    color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
    padding: 4px 10px;
    border-radius: $border-radius-sm;
  }
}

.component-content {
  padding: $spacing-md;
  background-color: $color-text-white;
  box-sizing: border-box;

  @include respond(phone) {
    padding: $spacing-sm;
  }
}

.product-summary {
  margin-bottom: $spacing-md;
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  background-color: $color-body-background;
  box-shadow: $shadow-sm;
  box-sizing: border-box;
}

.product-info {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.product-icon {
  margin-right: $spacing-sm;
  box-sizing: border-box;

  .icon-circle {
    width: 40px;
    height: 40px;
    border-radius: $border-radius-round;
    background-color: lighten($color-light-blue, 35%);
    @include flex-center;
    box-sizing: border-box;

    i {
      color: $color-light-blue;
      font-size: 16px;
    }
  }
}

.product-details {
  flex: 1;
  box-sizing: border-box;

  .product-name {
    margin: 0 0 5px;
    font-weight: 600;
    color: $color-text-dark;
  }

  .product-price {
    margin: 0;
    color: $color-light-blue;
    font-size: 18px;
    font-weight: 600;
  }
}

.payment-methods {
  margin-bottom: $spacing-md;
  box-sizing: border-box;
}

.section-title {
  margin: 0 0 $spacing-xs;
  font-size: 14px;
  font-weight: 600;
  color: $color-text-dark;
}

.payment-options {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
  box-sizing: border-box;

  @include respond(phone) {
    flex-direction: column;
  }
}

.payment-option {
  flex: 1;
  min-width: 100px;
  padding: $spacing-sm;
  border: 2px solid #eee;
  border-radius: $border-radius-sm;
  @include flex-center;
  flex-direction: column;
  cursor: pointer;
  transition: all $transition-speed-medium $transition-timing;
  box-sizing: border-box;

  &:hover {
    border-color: lighten($color-light-blue, 20%);
    transform: translateY(-2px);
    box-shadow: $shadow-sm;
  }

  &.selected {
    border-color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
    box-shadow: $shadow-sm;
  }

  .payment-option-icon {
    margin-bottom: 5px;
    font-size: 24px;
    color: $color-light-blue;
  }

  .payment-option-label {
    font-size: 14px;
    color: $color-text-dark;
    font-weight: 500;
  }
}

.payment-details-container {
  min-height: 200px;
  margin-bottom: $spacing-md;
  box-sizing: border-box;
}

.payment-details {
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  background-color: $color-body-background;
  border: 1px solid #eee;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: $spacing-sm;
  box-sizing: border-box;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: $color-text-dark;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: $border-radius-sm;
    font-size: 14px;
    transition: border-color $transition-speed-fast $transition-timing;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: $color-light-blue;
      box-shadow: 0 0 0 2px lighten($color-light-blue, 35%);
    }
  }
}

.form-row {
  display: flex;
  gap: $spacing-sm;
  box-sizing: border-box;

  .form-group.half {
    flex: 1;
  }
}

.paypal-info {
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  box-sizing: border-box;
  min-height: 120px;
  @include flex-center;

  p {
    margin: 0;
    font-size: 14px;
    color: $color-text-dark;
  }
}

.order-summary {
  margin: $spacing-md 0;
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  background-color: $color-body-background;
  border: 1px solid #eee;
  box-sizing: border-box;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
  box-sizing: border-box;

  &.total {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    font-weight: 600;
    font-size: 16px;
    color: $color-light-blue;
  }
}

.terms-acceptance {
  margin-bottom: $spacing-md;
  box-sizing: border-box;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  box-sizing: border-box;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 3px;
    transition: all $transition-speed-fast $transition-timing;
    box-sizing: border-box;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: $color-light-blue;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    box-sizing: border-box;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    box-sizing: border-box;
  }
}

.terms-text {
  line-height: 1.4;
}

.terms-link {
  color: $color-light-blue;
  text-decoration: none;
  transition: all $transition-speed-fast $transition-timing;

  &:hover {
    text-decoration: underline;
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing-md;
  padding-top: $spacing-sm;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}

.secondary-button {
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: $border-radius-sm;
  color: #666;
  font-size: calc($font-size-p-lg - 2px);
  cursor: pointer;
  transition: all $transition-speed-fast $transition-timing;
  box-sizing: border-box;

  &:hover {
    background-color: #f5f5f5;
  }
}

.primary-button {
  @include primary-button;
  padding: 10px 30px;
  border: none;
  box-sizing: border-box;
  font-size: calc($font-size-p-lg - 2px);

  &:disabled {
    background-color: lighten($color-light-blue, 25%);
    cursor: not-allowed;
  }
}
</style>
