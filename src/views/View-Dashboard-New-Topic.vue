<template>
  <div class="view-dashboard-new-topic">
    <div class="view-dashboard-new-topic_row">
      <div class="view-dashboard-new-topic_row_col-1">
        <DashboardSidebar />
      </div>
      <div class="view-dashboard-new-topic_row_col-2">
        <div class="view-dashboard-new-topic_row_col-2_container">
          <div class="component-container">
            <!-- File Upload Component -->
            <FileUpload
              v-if="currentStep === 0"
              @continue="handleFileUploadComplete"
              @cancel="handleCancel"
            />

            <!-- Choose Product Component -->
            <ChooseProduct
              v-if="currentStep === 1"
              :products="ProductSortiment"
              @product-selected="handleProductSelected"
              @cancel="currentStep = 0"
            />

            <!-- Pay Product Component -->
            <PayProduct
              v-if="currentStep === 2"
              :productName="selectedProduct?.name || ''"
              :productPrice="
                selectedProduct?.price
                  ? parseFloat(selectedProduct.price.replace(',', '.'))
                  : 0
              "
              @payment-complete="handlePaymentComplete"
              @cancel="currentStep = 1"
            />

            <!-- Success Screen -->
            <div v-if="currentStep === 3" class="success-screen">
              <div class="success-icon">
                <div class="icon-circle">
                  <i class="fa-solid fa-check"></i>
                </div>
              </div>
              <h2>Vielen Dank für Ihren Einkauf!</h2>
              <p>Ihre Bestellung wurde erfolgreich abgeschlossen.</p>
              <p class="order-number">Bestellnummer: {{ orderNumber }}</p>
              <button class="primary-button" @click="resetProcess">
                Zurück zum Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from "@/components/dashboard/Dashboard-Sidebar.vue";
import FileUpload from "@/components/dashboard/Dashboard-File-Upload.vue";
import ChooseProduct from "@/components/dashboard/Dashboard-Choose-Product.vue";
import PayProduct from "@/components/dashboard/Dashboard-Pay-Product.vue";

import { AnalyzedTopic } from "@/assets/AnalyzedTopic.js";
import { ProductSortiment } from "@/assets/ProductSortiment.js";

export default {
  name: "ViewDashboard",
  components: {
    DashboardSidebar,
    FileUpload,
    ChooseProduct,
    PayProduct,
  },
  data() {
    return {
      AnalyzedTopic,
      ProductSortiment,
      currentStep: 0,
      selectedFile: null,
      selectedProduct: null,
      orderNumber: null,
    };
  },
  methods: {
    handleFileUploadComplete(file) {
      this.selectedFile = file;
      this.currentStep = 1;
    },
    handleProductSelected(product) {
      this.selectedProduct = product;
      this.currentStep = 2;
    },
    handlePaymentComplete(paymentData) {
      this.orderNumber = paymentData.orderId;
      this.currentStep = 3;
    },
    handleCancel() {
      // Handle cancel from first step - could redirect or show confirmation
      // For now just stays on the first step
    },
    resetProcess() {
      this.currentStep = 0;
      this.selectedFile = null;
      this.selectedProduct = null;
      this.orderNumber = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.view-dashboard-new-topic {
  &_row {
    display: flex;
    flex-direction: row;
    min-height: 100vh;

    &_col-1 {
      background-color: $color-dark-blue;
      width: 250px;
      flex-shrink: 0;
    }

    &_col-2 {
      flex-grow: 1;
      padding: $spacing-md;
      background-color: $color-body-background;
      display: flex;
      flex-direction: column;

      &_container {
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
      }
    }
  }
}

.component-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md 0;
  min-height: 500px;
  /* Positioniert die Komponenten etwas näher zur Mitte, aber immer noch leicht darüber */
  margin-top: -5vh;
}

.success-screen {
  text-align: center;
  padding: $spacing-md;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  width: 100%;
  max-width: 600px;

  .success-icon {
    margin-bottom: $spacing-md;

    .icon-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: lighten($color-success, 45%);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      i {
        color: $color-success;
        font-size: 40px;
      }
    }
  }

  h2 {
    color: $color-text-dark;
    margin-bottom: $spacing-sm;
  }

  p {
    color: #666;
    margin-bottom: $spacing-sm;
  }

  .order-number {
    font-weight: 600;
    color: $color-light-blue;
    margin-bottom: $spacing-md;
  }

  .primary-button {
    @include primary-button;
    margin-top: $spacing-sm;
  }
}

// Responsive adjustments
@include respond(tablet) {
  .view-dashboard-new-topic_row {
    flex-direction: column;

    &_col-1 {
      width: 100%;
      height: auto;
    }
  }

  .component-container {
    min-height: 400px;
    margin-top: -4vh; /* Angepasst für Tablets */
  }
}

@include respond(phone) {
  .success-screen {
    padding: $spacing-sm;
  }

  .component-container {
    min-height: 350px;
    padding: $spacing-sm 0;
    margin-top: -2vh; /* Angepasst für Mobilgeräte */
  }
}
</style>
