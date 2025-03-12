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
            <div v-if="product.mostWanted" class="product-badge">
              <i class="fa-solid fa-star"></i> Bestseller
            </div>
          </div>
          <div class="product-price-section">
            <p class="product-price">{{ product.price }}</p>
            <p class="price-model">{{ product.priceModel }}</p>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="secondary-button" @click="$emit('cancel')">
          Zurück
        </button>
        <button
          class="primary-button"
          :disabled="!isProductSelected"
          @click="continueWithProduct"
        >
          Weiter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductSelection",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedProductId: null,
    };
  },
  computed: {
    isProductSelected() {
      return (
        this.selectedProductId !== null &&
        this.products[this.selectedProductId]?.available
      );
    },
  },
  methods: {
    selectProduct(productId) {
      // Nur verfügbare Produkte können ausgewählt werden
      if (this.products[productId].available) {
        this.selectedProductId = productId;
      }
    },
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
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

// Component Container Layout
.product-selection-container {
  width: $width-modal-lg;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;

  @include respond(tablet) {
    max-width: 100%;
  }
}

// Header Styles
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

  @include respond(phone) {
    padding: $spacing-sm;
  }
}

// Product Item Styles
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

    .product-price {
      text-decoration: line-through;
    }
  }

  &:last-child {
    margin-bottom: $spacing-md;
  }

  @include respond(phone) {
    padding: $spacing-sm;
  }
}

// Product Info Layout
.product-info {
  display: flex;
  align-items: center;
  width: 100%;
}

// Product Icon Styles
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

// Product Details Styles
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

  .product-badge {
    position: absolute;
    top: -8px;
    right: 0;
    background-color: $color-success;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;

    i {
      margin-right: 3px;
    }
  }
}

// Product Price Section
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

// Navigation Buttons Styles
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing-md;
  padding-top: $spacing-sm;
  border-top: 1px solid #eee;
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

  &:hover {
    background-color: #f5f5f5;
  }
}

.primary-button {
  @include primary-button;
  padding: 10px 30px;
  border: none;

  &:disabled {
    background-color: lighten($color-light-blue, 25%);
    cursor: not-allowed;
  }
}
</style>
