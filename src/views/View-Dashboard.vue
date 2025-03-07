<template>
  <div class="view-dashboard">
    <div class="view-dashboard_row">
      <div class="view-dashboard_row_col-1">
        <DashboardSidebar />
      </div>
      <div class="view-dashboard_row_col-2">
        <DashboardTopicTitle />
        <DashboardTopicOverview />
        <DashboardTopicSummary />
        <DashboardTopicQuiz />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from "@/components/dashboard/Dashboard-Sidebar.vue";
import DashboardTopicTitle from "@/components/dashboard/Dashboard-Topic-Title.vue";
import DashboardTopicOverview from "@/components/dashboard/Dashboard-Topic-Overview.vue";
import DashboardTopicSummary from "@/components/dashboard/Dashboard-Topic-Summary.vue";
import DashboardTopicQuiz from "@/components/dashboard/Dashboard-Topic-Quiz.vue";

export default {
  name: "ViewDashboard",
  components: {
    DashboardSidebar,
    DashboardTopicTitle,
    DashboardTopicOverview,
    DashboardTopicSummary,
    DashboardTopicQuiz,
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
      // width: 30vw;
      // background-color: red;
    }

    &_col-2 {
      // width: 70vw;
    }
  }
}
</style>
