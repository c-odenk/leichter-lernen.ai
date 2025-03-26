<template>
  <div class="product-selection-container">
    <div class="component-header">
      <h3>Produkt auswählen</h3>
      <div class="step-indicator">Schritt 2 von 3</div>
    </div>

    <div class="component-content">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-item"
        :class="{
          selected: selectedProductId === index,
          'not-available': !product.available,
        }"
        @click="product.available && selectProduct(index)"
      >
        <div class="product-info">
          <div class="product-icon">
            <div class="icon-circle">
              <i class="fa-solid fa-cube"></i>
            </div>
          </div>
          <div class="product-details">
            <p class="product-name">{{ product.title }}</p>
            <p class="product-description">{{ product.description }}</p>
            <div v-if="!product.available" class="product-availability">
              <i class="fa-solid fa-clock"></i> Bald verfügbar
            </div>
          </div>
          <div class="product-price-section">
            <p class="product-price">{{ product.price }}</p>
            <p class="price-model">{{ product.priceModel }}</p>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <!-- Wiederverwendbarer ButtonGray für "Zurück" -->
        <div class="button-container">
          <ButtonGray
            variant="primary"
            text="Zurück"
            @click="$emit('cancel')"
          />
        </div>

        <!-- Wiederverwendbarer ButtonBlue für "Weiter" -->
        <div class="button-container">
          <ButtonBlue
            variant="primary"
            text="Weiter"
            :disabled="!isProductSelected"
            @click="continueWithProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductSelection",

  // Props: Daten, die von der übergeordneten Komponente übergeben werden
  props: {
    /**
     * Array mit Produktdaten, die dem Benutzer zur Auswahl angezeigt werden
     * Jedes Produkt sollte folgende Eigenschaften haben:
     * - title: Name des Produkts
     * - description: Beschreibung des Produkts
     * - price: Preis des Produkts als formatierter String
     * - priceModel: Beschreibung des Preismodells (z.B. "pro Monat")
     * - available: Boolean, ob das Produkt verfügbar ist
     */
    products: {
      type: Array,
      required: true,
    },
  },

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Speichert den Index des ausgewählten Produkts aus dem products-Array
       * null bedeutet, dass kein Produkt ausgewählt ist
       */
      selectedProductId: null,
    };
  },

  // Berechnete Eigenschaften
  computed: {
    /**
     * Prüft, ob ein verfügbares Produkt ausgewählt wurde
     * Wird verwendet, um den "Weiter"-Button zu aktivieren/deaktivieren
     *
     * @returns {boolean} True, wenn ein verfügbares Produkt ausgewählt ist
     */
    isProductSelected() {
      return (
        this.selectedProductId !== null &&
        this.products[this.selectedProductId]?.available
      );
    },
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Wählt ein Produkt anhand seiner ID (Index im products-Array) aus
     * Produkte, die nicht verfügbar sind, können nicht ausgewählt werden
     *
     * @param {number} productId - Index des Produkts im products-Array
     */
    selectProduct(productId) {
      // Nur verfügbare Produkte können ausgewählt werden
      if (this.products[productId].available) {
        this.selectedProductId = productId;
      }
    },

    /**
     * Sendet das ausgewählte Produkt an die übergeordnete Komponente,
     * wenn ein Produkt ausgewählt wurde und der Benutzer auf "Weiter" klickt
     *
     * Emittiert das 'product-selected'-Event mit einem Objekt, das die
     * Produktdetails enthält (Name, Beschreibung, Preis, ID)
     */
    continueWithProduct() {
      if (this.isProductSelected) {
        // Ausgewähltes Produkt an übergeordnete Komponente senden
        const selectedProduct = this.products[this.selectedProductId];
        this.$emit("product-selected", {
          name: selectedProduct.title,
          description: selectedProduct.description,
          price: selectedProduct.price.replace("€", ""),
          id: this.selectedProductId,
        });
      }
    },
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

.product-selection-container {
  width: $width-modal-desktop;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;

  @include respond(laptop) {
    width: $width-modal-laptop;
  }
}

.component-header {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid #eee;
  background-color: $color-text-white;
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
}

.product-item {
  padding: $spacing-md;
  border: 2px solid #eee;
  border-radius: $border-radius-md;
  background-color: $color-body-background;
  transition: all $transition-speed-medium $transition-timing;
  margin-bottom: $spacing-sm;
  cursor: pointer;

  &:hover:not(.not-available) {
    border-color: lighten($color-light-blue, 15%);
    transform: translateY(-2px);
    box-shadow: $shadow-sm;
  }

  &.selected {
    border-color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
    box-shadow: $shadow-sm;
  }

  &.not-available {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:last-child {
    margin-bottom: $spacing-md;
  }
}

.product-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.product-icon {
  margin-right: $spacing-sm;
  flex-shrink: 0;

  .icon-circle {
    width: 50px;
    height: 50px;
    border-radius: $border-radius-round;
    background-color: lighten($color-light-blue, 35%);
    @include flex-center;

    i {
      color: $color-light-blue;
      font-size: 20px;
    }
  }
}

.product-details {
  flex: 1;
  position: relative;

  .product-name {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: 600;
    color: $color-text-dark;
  }

  .product-description {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  .product-availability {
    margin-top: 8px;
    font-size: 12px;
    color: #888;

    i {
      margin-right: 4px;
    }
  }
}

.product-price-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: $spacing-md;
  flex-shrink: 0;

  .product-price {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: $color-light-blue;
  }

  .price-model {
    margin: 4px 0 0;
    font-size: 12px;
    color: #888;
  }
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing-md;
  padding-top: $spacing-sm;
  border-top: 1px solid #eee;
}

/* Container für einzelne Buttons in der Navigation */
.button-container {
  width: 120px;

  :deep(.button-blue),
  :deep(.button-gray) {
    width: 100% !important;
  }
}
</style>
