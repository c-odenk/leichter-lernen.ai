<template>
  <div class="payment-container">
    <div class="component-header">
      <h3>Zahlungsinformationen</h3>
      <div class="step-indicator">Schritt 3 von 3</div>
    </div>

    <div class="component-content">
      <!-- Produktübersicht -->
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

      <!-- Zahlungsmethoden -->
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

      <!-- Zahlungsmethoden Details Container mit fester Höhe -->
      <div class="payment-details-container">
        <!-- Kreditkarteninformationen (wird nur angezeigt, wenn Kreditkarte ausgewählt ist) -->
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

        <!-- PayPal Informationen -->
        <div v-if="selectedMethod === 'paypal'" class="payment-details">
          <div class="paypal-info">
            <p>
              Sie werden zur PayPal-Website weitergeleitet, um die Zahlung
              abzuschließen.
            </p>
          </div>
        </div>
      </div>

      <!-- Rechnungsadresse -->
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

      <!-- Gesamtsumme -->
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

      <!-- Bedingungen akzeptieren -->
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

      <!-- Navigation Buttons -->
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
  props: {
    // Produktdetails als Props übergeben
    productName: {
      type: String,
      default: "Produkt",
    },
    productPrice: {
      type: Number,
      default: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // Zahlungsmethoden
      paymentMethods: [
        {
          id: "credit-card",
          name: "Kreditkarte",
          icon: "fa-solid fa-credit-card",
        },
        { id: "paypal", name: "PayPal", icon: "fa-brands fa-paypal" },
      ],
      selectedMethod: "credit-card",

      // Kreditkartendaten
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",

      // Rechnungsadresse
      billingAddress: {
        name: "",
        street: "",
        postalCode: "",
        city: "",
        country: "DE",
      },

      // Bestellnummer (hier einfach als Dummy)
      orderId: "ORD-" + Math.floor(Math.random() * 10000),

      // Checkbox für AGBs
      termsAccepted: false,

      // Steuer
      taxRate: 0.19,
    };
  },
  computed: {
    // Berechnung der Mehrwertsteuer
    tax() {
      return this.productPrice * this.taxRate;
    },

    // Berechnung des Gesamtbetrags
    totalAmount() {
      return this.productPrice + this.shippingCost + this.tax;
    },

    // Überprüfung, ob die Zahlungsinformationen gültig sind
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
  methods: {
    // Auswahl der Zahlungsmethode
    selectPaymentMethod(methodId) {
      this.selectedMethod = methodId;
    },

    // Formatierung der Kreditkartennummer (4er Gruppen)
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

    // Formatierung des Ablaufdatums (MM/JJ)
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

    // Formatierung des Betrags als Währung
    formatCurrency(amount) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    },

    // Abbrechen der Zahlung
    handleCancel() {
      this.$emit("cancel");
    },

    // Verarbeitung der Zahlung
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

// Container Layout
.payment-container {
  width: $width-modal-lg;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;
  box-sizing: border-box;

  @include respond(tablet) {
    max-width: 100%;
  }
}

// Header Styles
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

// Main Content Styles
.component-content {
  padding: $spacing-md;
  background-color: $color-text-white;
  box-sizing: border-box;

  @include respond(phone) {
    padding: $spacing-sm;
  }
}

// Produktübersicht
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

// Zahlungsmethoden
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

// Container für Zahlungsdetails mit fester Höhe
.payment-details-container {
  min-height: 200px; // Feste Mindesthöhe für beide Zahlungsmethoden
  margin-bottom: $spacing-md;
  box-sizing: border-box;
}

// Zahlungsdetails Formular
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

// Paypal Infos
.paypal-info {
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  box-sizing: border-box;
  min-height: 120px; // Zusätzliche Mindesthöhe für PayPal-Info
  @include flex-center; // Zentriert den Inhalt vertikal und horizontal

  p {
    margin: 0;
    font-size: 14px;
    color: $color-text-dark;
  }
}

// Bestellübersicht
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

// AGB Checkbox
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

// Navigation Buttons
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
  font-size: 14px;
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

  &:disabled {
    background-color: lighten($color-light-blue, 25%);
    cursor: not-allowed;
  }
}
</style>
