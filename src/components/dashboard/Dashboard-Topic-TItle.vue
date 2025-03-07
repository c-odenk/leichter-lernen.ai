<template>
  <div class="dashboard-topic-title">
    <h1>TOPIC TITLE: {{ topicTitle }}</h1>
  </div>
</template>

<script>
export default {
  name: "DashboardTopicTitleSection",
  data() {
    return {
      topicTitle: "Personalbeschaffung & -planung",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.dashboard-topic-title {
  width: 100%;
}
</style>
