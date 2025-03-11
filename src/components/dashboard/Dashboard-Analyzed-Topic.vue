<template>
  <div class="dashboard-analyzed-topic">
    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>Thema</h3>
        <p>Dein analysiertes Thema</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2 first-col">
        <b>{{ topic.topicTitle }}</b>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>Themenübersicht</h3>
        <p>Alle Unterthemen auf einen Blick</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <ul>
          <li v-for="(overview, index) in topic.topicOverview" :key="index">
            {{ overview }}
          </li>
        </ul>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>Zusammenfassung</h3>
        <p>Verstehe & vertiefe dein Wissen</p>
      </div>

      <div class="dashboard-analyzed-topic_row_col-2">
        <div v-if="!isExpanded">
          <p>{{ previewText }}...</p>
        </div>

        <div v-else>
          <div
            class="paragraph"
            v-for="(summary, index) in topic.topicSummary"
            :key="index"
          >
            <h2>{{ summary.subtitle }}</h2>
            <p>{{ summary.content }}</p>
          </div>
        </div>

        <button class="dropdown" v-if="hasLongText" @click="toggleExpand">
          {{ isExpanded ? "Weniger anzeigen" : "Mehr anzeigen" }}
          <i
            class="fa-solid fa-chevron-down"
            :class="{ rotated: isExpanded }"
          ></i>
        </button>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>Multiple-Choice-Quiz</h3>
        <p>Teste dein Wissen umfassend</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <button class="quiz">Quiz starten</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAnalyzedTopicSection",
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    fullText() {
      return this.topic.topicSummary
        .map((summary) => summary.content)
        .join(" ");
    },
    previewText() {
      return this.fullText.length > 350
        ? this.fullText.slice(0, 350)
        : this.fullText;
    },
    hasLongText() {
      return this.fullText.length > 350;
    },
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.dashboard-analyzed-topic {
  margin: 0;
  padding: 40px 100px 40px 50px;

  &_row {
    display: flex;
    align-items: flex-start;
    margin: 0 0 40px 0;

    &_col-1 {
      width: 20vw;
      max-width: 500px;

      & h3 {
        margin: 0;
        padding: 0;
      }

      & p {
        margin: 0;
        padding: 0;
      }
    }

    &_col-2 {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border: 1px solid #000;
      border-radius: 10px;
      padding: 15px 20px;

      & h2 {
        margin: 0 0 10px 0;
        padding: 0;
        font-size: $font-size-p-lg;
      }

      & p {
        width: 97.5%;
        margin: 0 auto 0 0;
        padding: 0;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        word-wrap: break-word;
      }

      & ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 7.5px;
        margin: 0;
        padding: 0;
        list-style: none;

        & li {
          margin: 0;
          padding: 7.5px 20px;
          font-size: $font-size-p-lg;
          background-color: #f0f0f0;
          border: 1px solid #000;
          border-radius: 15px;
        }
      }

      & .paragraph {
        width: 100%;
        margin-bottom: 15px;
      }

      & button.dropdown {
        margin: 12px 0 5px 0;

        & i {
          margin: 0 0 0 10px;
          transition: transform 0.3s ease-in-out;
        }

        & i.rotated {
          transform: rotate(180deg);
        }
      }

      & button.quiz,
      & button.dropdown {
        min-width: 200px;
        padding: 10px 30px;
        font-size: $font-size-p-lg;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        background-color: $color-dark-blue;
        color: #fff;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: lighten($color-dark-blue, 10%);
        }
      }
    }
  }
}
</style>
