<template>
  <div class="dashboard-analyzed-topic">
    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>📚 Thema</h3>
        <p>Dein analysiertes Thema</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <b>{{ topic.topicTitle }}</b>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>📖 Themenübersicht</h3>
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
        <h3>✍️ Zusammenfassung</h3>
        <p>Verstehe & vertiefe dein Wissen</p>
      </div>

      <div class="dashboard-analyzed-topic_row_col-2">
        <div v-if="!isExpanded">
          <h2 v-if="topic.topicSummary && topic.topicSummary.length > 0">
            {{ topic.topicSummary[0].subtitle }}
          </h2>
          <p>{{ previewText }}...</p>
        </div>

        <div v-else class="expanded-content">
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
        <h3>🏆 Multiple-Choice-Quiz</h3>
        <p>Teste dein Wissen umfassend</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <button class="quiz primary-button">Quiz starten</button>
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
  padding: $spacing-lg $spacing-xl $spacing-lg $spacing-lg;

  @include respond(tablet) {
    padding: $spacing-md $spacing-lg $spacing-md $spacing-md;
  }

  @include respond(phone) {
    padding: $spacing-sm;
  }

  &_row {
    display: flex;
    align-items: flex-start;
    margin: 0 0 calc($spacing-lg - 20px) 0;

    @include respond(phone) {
      flex-direction: column;
      margin-bottom: $spacing-md;
    }

    &_col-1 {
      width: 18vw;
      max-width: 500px;
      margin-right: $spacing-md;

      @include respond(phone) {
        width: 100%;
        max-width: 100%;
        margin-bottom: $spacing-sm;
      }

      & h3 {
        margin: 0 0 calc($spacing-xs - 8px) 0;
        padding: 0;
        font-size: $font-size-h3-lg;
        color: #000;
        font-weight: 600;

        @include respond(tablet) {
          font-size: $font-size-h3-md;
        }

        @include respond(phone) {
          font-size: $font-size-h3-sm;
        }
      }

      & p {
        margin: 0;
        padding: 0;
        font-size: calc($font-size-p-lg - 5px);
        font-weight: 500;
        // color: $color-dark-blue-lighter;
        color: #707070;

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
        }
      }
    }

    &_col-2 {
      flex: 1;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      border: 1px solid rgba($color-dark-blue, 0.08);
      border-radius: $border-radius-md;
      padding: $spacing-md;
      background-color: $color-text-white;
      box-shadow: $shadow-sm;
      transition: box-shadow $transition-speed-medium $transition-timing;

      &:hover {
        box-shadow: $shadow-md;
      }

      & h2 {
        margin: 0 0 $spacing-xs 0;
        padding: 0;
        font-size: $font-size-h3-lg;
        color: $color-dark-blue;
        font-weight: 500;

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }
      }

      & p {
        width: 95%;
        margin: 0 auto 0 0;
        padding: 0;
        font-size: calc($font-size-p-lg - 2px);
        line-height: $line-height;
        word-wrap: break-word;

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
        }
      }

      & ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: $spacing-xs;
        margin: 0;
        padding: 0;
        list-style: none;

        & li {
          margin: 0;
          padding: $spacing-xs $spacing-sm;
          font-size: calc($font-size-p-lg - 3px);
          background-color: rgba($color-light-blue, 0.1);
          border-radius: $border-radius-md;
          color: $color-dark-blue;

          @include respond(tablet) {
            font-size: $font-size-p-md;
          }

          @include respond(phone) {
            font-size: $font-size-p-sm;
          }

          /* Hover-Effekt entfernt */
        }
      }

      .expanded-content {
        width: 100%;
      }

      & .paragraph {
        width: 100%;
        margin-bottom: $spacing-md;

        &:last-child {
          margin-bottom: 0;
        }
      }

      & button.dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30px 0 0 0;
        padding: 10px $spacing-md;
        font-size: calc($font-size-p-lg - 3px);
        background-color: transparent;
        color: $color-light-blue;
        border: 1px solid rgba($color-light-blue, 0.2);
        border-radius: $border-radius-sm;
        cursor: pointer;
        transition: all $transition-speed-medium $transition-timing;
        font-weight: 500;

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
        }

        &:hover {
          background-color: rgba($color-light-blue, 0.05);
          border-color: $color-light-blue;
        }

        & i {
          margin: 0 0 0 15px;
          transition: transform $transition-speed-medium $transition-timing;
          font-size: calc($font-size-p-lg - 5px);
        }

        & i.rotated {
          transform: rotate(180deg);
        }
      }

      & button.quiz {
        @include primary-button;
        align-self: flex-start;
        // margin-top: $spacing-xs;
        border: none; /* Border entfernt */
        font-size: calc($font-size-p-lg - 4px);
      }
    }
  }
}
</style>
