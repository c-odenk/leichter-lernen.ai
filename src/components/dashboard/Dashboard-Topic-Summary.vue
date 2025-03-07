<template>
  <div class="dashboard-topic-summary">
    <h1>TOPIC SUMMARY: {{ topicSummary }}</h1>
  </div>
</template>

<script>
export default {
  name: "DashboardTopicSummarySection",
  data() {
    return {
      topicSummary: "Lorem ipsum",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.dashboard-topic-summary {
  width: 100%;
}
</style>
