<template>
  <div class="view-dashboard">
    <div class="view-dashboard_row">
      <div class="view-dashboard_row_col-1">
        <DashboardSidebar />
      </div>
      <div class="view-dashboard_row_col-2">
        <DashboardAnalyzedTopic
          v-for="(topic, index) in AnalyzedTopic"
          :key="index"
          :topic="topic"
        />
      </div>
      <DashboardQuizModal
        v-if="AnalyzedTopic.length > 0"
        :topic="AnalyzedTopic.map((topic) => topic.topicQuiz)"
      />
    </div>
  </div>
</template>

<script>
import DashboardSidebar from "@/components/dashboard/Dashboard-Sidebar.vue";
import DashboardAnalyzedTopic from "@/components/dashboard/Dashboard-Analyzed-Topic.vue";
import DashboardQuizModal from "@/components/dashboard/Dashboard-Quiz-Modal.vue";

import { AnalyzedTopic } from "@/assets/AnalyzedTopic.js";

export default {
  name: "ViewDashboard",
  components: {
    DashboardSidebar,
    DashboardAnalyzedTopic,
    DashboardQuizModal,
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

.view-dashboard {
  &_row {
    display: flex;
    flex-direction: row;

    &_col-1 {
      background-color: $color-dark-blue;
    }

    &_col-2 {
    }
  }
}
</style>
