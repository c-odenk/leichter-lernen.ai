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
          @start-quiz="startQuiz(topic)"
        />
      </div>
      <DashboardQuizModal
        v-if="showQuizModal && currentQuizTopic"
        :topic="currentQuizTopic.topicQuiz"
        @close="closeQuizModal"
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
      showQuizModal: false,
      currentQuizTopic: null,
    };
  },
  methods: {
    startQuiz(topic) {
      this.currentQuizTopic = topic;
      this.showQuizModal = true;
    },
    closeQuizModal() {
      this.showQuizModal = false;
    },
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
