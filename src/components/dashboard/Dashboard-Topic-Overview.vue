<template>
  <div class="dashboard-topic-overview">
    <h1>TOPIC OVERVIEW: {{ topicOverview }}</h1>
  </div>
</template>

<script>
export default {
  name: "DashboardTopicOverviewSection",
  data() {
    return {
      topicOverview: "Hier stehen am Ende die einzelnen Themen",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.dashboard-topic-overview {
  width: 100%;
}
</style>
