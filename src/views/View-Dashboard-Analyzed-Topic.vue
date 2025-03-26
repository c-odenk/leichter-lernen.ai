<template>
  <div class="view-dashboard">
    <!-- Mobile-Ansicht -->
    <MobileNotice v-if="isMobile" />

    <!-- Desktop-Ansicht -->
    <div v-else class="view-dashboard_row">
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
import { ref, onMounted, onUnmounted } from "vue";
import DashboardSidebar from "@/components/dashboard/Dashboard-Sidebar.vue";
import DashboardAnalyzedTopic from "@/components/dashboard/Dashboard-Analyzed-Topic.vue";
import DashboardQuizModal from "@/components/dashboard/Dashboard-Quiz-Modal.vue";
import MobileNotice from "@/components/mobilenotice/Mobile-Notice.vue";

import { AnalyzedTopic } from "@/assets/AnalyzedTopic.js";

export default {
  name: "ViewDashboard",
  components: {
    DashboardSidebar,
    DashboardAnalyzedTopic,
    DashboardQuizModal,
    MobileNotice,
  },
  setup() {
    // Reaktive Zustände
    const isMobile = ref(false);
    const showQuizModal = ref(false);
    const currentQuizTopic = ref(null);

    // Hilfsfunktionen
    const checkIfMobile = () => {
      // Entspricht $breakpoint-smartphone
      isMobile.value = window.innerWidth <= 767;
    };

    const startQuiz = (topic) => {
      currentQuizTopic.value = topic;
      showQuizModal.value = true;
    };

    const closeQuizModal = () => {
      showQuizModal.value = false;
    };

    // Lifecycle-Hooks und Event-Handling
    onMounted(() => {
      // Initial prüfen
      checkIfMobile();

      // Event-Listener hinzufügen mit throttling
      const resizeHandler = (function () {
        let timeout;
        return function () {
          clearTimeout(timeout);
          timeout = setTimeout(checkIfMobile, 150);
        };
      })();

      window.addEventListener("resize", resizeHandler);

      // Cleanup-Funktion für Component Unmount
      onUnmounted(() => {
        window.removeEventListener("resize", resizeHandler);
      });
    });

    return {
      isMobile,
      AnalyzedTopic,
      showQuizModal,
      currentQuizTopic,
      startQuiz,
      closeQuizModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-dashboard {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &_row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    &_col-1 {
      background-color: $color-dark-blue;
    }

    &_col-2 {
      flex: 1;
    }
  }
}
</style>
