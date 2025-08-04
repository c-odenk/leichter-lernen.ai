<template>
  <div class="dashboard-analyzed-topic" v-if="topic">
    <!-- Header mit Breadcrumb und Titel -->
    <div class="dashboard-header">
      <div class="breadcrumb">
        <span class="breadcrumb-icon">📄</span>
        <span class="breadcrumb-text">Dein aktuelles Thema</span>
      </div>
      <h1 class="main-title">
        {{ topic?.topicTitle || "Kein Titel verfügbar" }}
      </h1>

      <!-- Tags/Overview -->
      <div class="topic-tags" v-if="topic?.topicOverview?.length">
        <span
          v-for="(overview, index) in topic.topicOverview"
          :key="index"
          class="topic-tag"
        >
          {{ overview }}
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <!-- Zusammenfassung Card -->
      <div class="summary-card">
        <div class="card-header">
          <div class="card-icon">📄</div>
          <div class="card-title-section">
            <h2>Titel 1</h2>
            <p class="card-subtitle">
              {{
                topic?.topicSummary && topic.topicSummary.length > 0
                  ? topic.topicSummary[0].subtitle
                  : ""
              }}
            </p>
          </div>
        </div>

        <div class="card-content">
          <div v-if="!isExpanded">
            <p class="summary-text">{{ previewText }}...</p>
          </div>

          <div v-else class="expanded-content">
            <div
              class="summary-paragraph"
              v-for="(summary, index) in topic?.topicSummary || []"
              :key="index"
            >
              <h3>{{ summary.subtitle }}</h3>
              <p class="summary-text">{{ summary.content }}</p>
            </div>
          </div>

          <button
            v-if="hasLongText"
            class="expand-button"
            @click="toggleExpand"
          >
            {{ isExpanded ? "Weniger anzeigen" : "Mehr anzeigen" }}
          </button>
        </div>
      </div>

      <!-- Action Cards Grid -->
      <div class="action-cards-grid">
        <!-- Zusammenfassung Card -->
        <div class="action-card blue">
          <div class="card-header">
            <div class="action-card-icon">📄</div>
            <div class="card-title-group">
              <h3 class="action-card-title">Zusammenfassung</h3>
              <p class="action-card-subtitle">Verstehe & erfasse dein Wissen</p>
            </div>
          </div>
          <button-blue
            variant="primary"
            text="Mehr anzeigen"
            class="action-button full-width"
          />
        </div>

        <!-- Quiz Card -->
        <div class="action-card green">
          <div class="card-header">
            <div class="action-card-icon">🏆</div>
            <div class="card-title-group">
              <h3 class="action-card-title">Multiple-Choice-Quiz</h3>
              <p class="action-card-subtitle">
                Sichere dein Verständnis durch Übungsfragen
              </p>
            </div>
          </div>
          <button-blue
            variant="primary"
            text="Quiz starten"
            @click="startQuiz"
            class="action-button full-width"
          />
        </div>

        <!-- Probeklausur Card -->
        <div class="action-card purple">
          <div class="card-header">
            <div class="action-card-icon">✍️</div>
            <div class="card-title-group">
              <h3 class="action-card-title">Probeklausur</h3>
              <p class="action-card-subtitle">Teste dein Wissen umfassend</p>
            </div>
          </div>
          <div class="button-group">
            <button-blue
              variant="secondary"
              text="Probeklausur starten"
              :disabled="true"
              class="action-button"
            />
          </div>
        </div>

        <!-- KI Tutor Card -->
        <div class="action-card orange">
          <div class="card-header">
            <div class="action-card-icon">🎓</div>
            <div class="card-title-group">
              <h3 class="action-card-title">KI Tutor</h3>
              <p class="action-card-subtitle">
                Erhalte präzise Antworten auf deine Fragen
              </p>
            </div>
          </div>
          <div class="button-group">
            <button-blue
              variant="secondary"
              text="KI Tutor starten"
              :disabled="true"
              class="action-button"
            />
          </div>
        </div>
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
      default: () => ({
        topicTitle: "",
        topicOverview: [],
        topicSummary: [],
      }),
    },
  },

  data() {
    return {
      isExpanded: false,
    };
  },

  computed: {
    fullText() {
      if (!this.topic?.topicSummary?.length) return "";
      return this.topic.topicSummary
        .map((summary) => summary.content)
        .join(" ");
    },

    previewText() {
      return this.fullText.length > 550
        ? this.fullText.slice(0, 550)
        : this.fullText;
    },

    hasLongText() {
      return this.fullText.length > 550;
    },
  },

  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    startQuiz() {
      this.$emit("start-quiz", this.topic);
    },

    upgradePaket() {
      this.$emit("upgrade-paket");
    },
  },

  provide() {
    return {
      topic: this.topic,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

.dashboard-analyzed-topic {
  width: 100%;
  padding: $spacing-lg 17.5vw;
  background-color: #f8f9fa;
  min-height: 100vh;

  @include respond(laptop) {
    padding: $spacing-md;
  }

  @include respond(tablet) {
    padding: $spacing-sm;
  }
}

// Header Section
.dashboard-header {
  margin-bottom: $spacing-lg;

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    // margin-bottom: $spacing-sm;
    color: #6b7280;
    font-size: $font-size-p-md;

    .breadcrumb-icon {
      font-size: 16px;
    }
  }

  .main-title {
    font-size: $font-size-h1-lg;
    font-weight: 600;
    color: $color-dark-blue;
    margin: 0 0 $spacing-md 0;

    @include respond(laptop) {
      font-size: $font-size-h1-md;
    }

    @include respond(tablet) {
      font-size: $font-size-h1-sm;
    }
  }

  .topic-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;

    .topic-tag {
      padding: $spacing-xs $spacing-sm;
      font-size: calc($font-size-p-lg - 2px);
      background-color: rgba($color-light-blue, 0.1);
      border-radius: $border-radius-md;
      color: $color-dark-blue;
    }
  }
}

// Content Section
.content-section {
  display: grid;
  gap: $spacing-lg;
}

// Summary Card (großer Bereich oben)
.summary-card {
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-sm;
  border: 1px solid rgba($color-dark-blue, 0.08);

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    margin-bottom: $spacing-md;

    .card-icon {
      font-size: 24px;
      padding: $spacing-sm;
      background-color: rgba($color-light-blue, 0.1);
      border-radius: $border-radius-md;
    }

    .card-title-section {
      h2 {
        font-size: $font-size-h2-md;
        font-weight: 600;
        color: $color-dark-blue;
        margin: 0 0 $spacing-xs 0;
      }

      .card-subtitle {
        font-size: $font-size-p-md;
        color: #6b7280;
        margin: 0;
      }
    }
  }

  .card-content {
    .summary-text {
      font-size: $font-size-p-md;
      line-height: 1.6;
      color: #374151;
      margin-bottom: $spacing-md;
    }

    .expanded-content {
      .summary-paragraph {
        margin-bottom: $spacing-md;

        h3 {
          font-size: $font-size-h3-md;
          font-weight: 600;
          color: $color-dark-blue;
          margin: 0 0 $spacing-xs 0;
        }
      }
    }

    .expand-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 10px 1.5rem;
      border-radius: 5px;
      text-align: center;
      font-size: 15px;
      background-color: transparent;
      color: $color-light-blue;
      border: 1px solid rgba(22, 105, 208, 0.2);
      margin: 1.5rem 0 0 0;
      border-radius: 10px;

      &:hover {
        color: $color-dark-blue;
      }
    }
  }
}

// Action Cards Grid - 2x2 Layout
.action-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: $spacing-md;

  @include respond(tablet) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  @include respond(phone) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

.action-card {
  background: white;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-sm;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: $shadow-md;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  .action-card-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: $border-radius-md;
    flex-shrink: 0;
  }

  &.blue .action-card-icon {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
  }

  &.green .action-card-icon {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
  }

  &.purple .action-card-icon {
    background: linear-gradient(135deg, #a855f7, #9333ea);
    color: white;
  }

  &.orange .action-card-icon {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
  }

  .card-title-group {
    flex: 1;
  }

  .action-card-title {
    font-size: $font-size-h3-md;
    font-weight: 600;
    color: $color-dark-blue;
    margin: 0 0 0 0;
  }

  .action-card-subtitle {
    font-size: $font-size-p-md;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }

  .action-button {
    margin-top: auto;

    &.full-width {
      width: 100%;
    }
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }
}
</style>
