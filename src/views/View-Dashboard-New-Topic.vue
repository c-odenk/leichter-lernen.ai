<template>
  <div class="view-dashboard-new-topic">
    <div class="view-dashboard-new-topic_row">
      <div class="view-dashboard-new-topic_row_col-1">
        <DashboardSidebar />
      </div>
      <div class="view-dashboard-new-topic_row_col-2">
        <div class="view-dashboard-new-topic_row_col-2_container">
          <FileUpload />
          <ChooseProduct />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from "@/components/dashboard/Dashboard-Sidebar.vue";
import FileUpload from "@/components/dashboard/Dashboard-File-Upload.vue";
import ChooseProduct from "@/components/dashboard/Dashboard-Choose-Product.vue";

import { AnalyzedTopic } from "@/assets/AnalyzedTopic.js";

export default {
  name: "ViewDashboard",
  components: {
    DashboardSidebar,
    FileUpload,
    ChooseProduct,
  },
  data() {
    return {
      AnalyzedTopic,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-dashboard-new-topic {
  &_row {
    display: flex;
    flex-direction: row;

    &_col-1 {
      background-color: $color-dark-blue;
    }

    &_col-2 {
      // position: relative;

      &_container {
        // position: absolute;
        top: 50%;
      }
    }
  }
}
</style>
