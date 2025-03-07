<template>
  <div class="dashboard-topic-quiz">
    <h1>TOPIC QUIZ: {{ topicQuiz }}</h1>
  </div>
</template>

<script>
export default {
  name: "DashboardTopicQuizSection",
  data() {
    return {
      topicQuiz: "Hier stehen am Ende sämtliche Quiz-Fragen samt Antworten",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.dashboard-topic-quiz {
  width: 100%;
}
</style>
