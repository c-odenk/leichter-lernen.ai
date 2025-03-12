<template>
  <div class="choose-product-container">
    <div class="product-header">
      <h3>Produkt auswählen</h3>
    </div>

    <div class="product-content">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
        :class="{ selected: selectedProductId === product.id }"
        @click="selectProduct(product.id)"
      >
        <div class="product-info">
          <div class="product-icon">
            <div class="icon-circle">
              <i :class="product.icon"></i>
            </div>
          </div>
          <div class="product-details">
            <p class="product-name">{{ product.name }}</p>
            <p class="product-description">{{ product.description }}</p>
          </div>
          <div class="product-price-section">
            <p class="product-price">{{ product.price }} €</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          class="continue-button"
          :disabled="!selectedProductId"
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
  name: "ChooseProductSection",
  data() {
    return {
      selectedProductId: null,
      products: [
        {
          id: 1,
          name: "Basis Paket",
          description:
            "Grundlegende Funktionen für Einsteiger. Ideal für kleine Projekte und persönliche Nutzung.",
          price: "19,99",
          icon: "fa-solid fa-cube",
        },
        {
          id: 2,
          name: "Premium Paket",
          description:
            "Erweiterte Funktionalität mit zusätzlichen Features. Perfekt für mittlere Unternehmen.",
          price: "49,99",
          icon: "fa-solid fa-star",
        },
        {
          id: 3,
          name: "Enterprise Lösung",
          description:
            "Vollständige Funktionalität mit priorisierten Support. Für professionelle Anforderungen.",
          price: "99,99",
          icon: "fa-solid fa-building",
        },
      ],
    };
  },
  methods: {
    selectProduct(productId) {
      this.selectedProductId = productId;
    },
    continueWithProduct() {
      if (this.selectedProductId) {
        // Ausgewähltes Produkt an übergeordnete Komponente senden
        const selectedProduct = this.products.find(
          (p) => p.id === this.selectedProductId
        );
        this.$emit("product-selected", selectedProduct);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

// Component Container Layout
.choose-product-container {
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
.product-header {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid #eee;
  background-color: $color-text-white;

  h3 {
    margin: 0;
    color: $color-text-dark;
    font-size: $font-size-h3-lg;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }
}

// Main Content Styles
.product-content {
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

  &:hover {
    border-color: lighten($color-light-blue, 15%);
  }

  &.selected {
    border-color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
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

  .product-name {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: 500;
    color: $color-text-dark;
  }

  .product-description {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
}

// Product Price Section
.product-price-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: $spacing-md;

  .product-price {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: $color-text-dark;
  }
}

// Action Buttons
.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing-md;

  .continue-button {
    @include primary-button;
    padding: 10px 20px;
    border: none;
  }
}
</style>
