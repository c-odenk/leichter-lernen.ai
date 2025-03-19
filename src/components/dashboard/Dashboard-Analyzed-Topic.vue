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
        <h3>📝 Zusammenfassung</h3>
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
        <p>Sichere dein Verständnis durch Übungsfragen</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <button class="quiz primary-button" @click="startQuiz">
          Quiz starten
        </button>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>✍️ Probeklausur</h3>
        <p>Teste dein Wissen umfassend</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <div class="button-container">
          <button class="quiz primary-button disabled" disabled>
            Probeklausur starten
          </button>
          <button class="quiz upgrade-button" @click="upgradePaket">
            Paket upgraden
          </button>
        </div>
      </div>
    </div>

    <div class="dashboard-analyzed-topic_row">
      <div class="dashboard-analyzed-topic_row_col-1">
        <h3>🎓 KI Tutor</h3>
        <p>Erhalte präzise Antworten auf deine Fragen</p>
      </div>
      <div class="dashboard-analyzed-topic_row_col-2">
        <div class="button-container">
          <button class="quiz primary-button disabled" disabled>
            KI Tutor starten
          </button>
          <button class="quiz upgrade-button" @click="upgradePaket">
            Paket upgraden
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAnalyzedTopicSection",

  // Props: Eigenschaften, die von der übergeordneten Komponente übergeben werden
  props: {
    // Das topic Objekt enthält alle Informationen zum ausgewählten Thema
    // inklusive Titel, Übersicht, Zusammenfassung usw.
    topic: {
      type: Object,
      required: true,
    },
  },

  // Reaktive Daten der Komponente
  data() {
    return {
      // Steuert, ob die Zusammenfassung vollständig angezeigt wird oder nicht
      isExpanded: false,
    };
  },

  // Berechnete Eigenschaften für die dynamische Darstellung der Zusammenfassung
  computed: {
    /**
     * Generiert den vollständigen Text der Zusammenfassung, indem alle
     * Inhalte der einzelnen Abschnitte zu einem String zusammengefügt werden
     * @returns {string} Der vollständige Text der Zusammenfassung
     */
    fullText() {
      return this.topic.topicSummary
        .map((summary) => summary.content)
        .join(" ");
    },

    /**
     * Erstellt einen gekürzten Vorschautext für die zusammengeklappte Ansicht
     * @returns {string} Gekürzte Version des Textes (max. 350 Zeichen)
     */
    previewText() {
      return this.fullText.length > 350
        ? this.fullText.slice(0, 350)
        : this.fullText;
    },

    /**
     * Prüft, ob der Text lang genug ist, um die "Mehr anzeigen" Funktion anzuzeigen
     * @returns {boolean} True wenn Text länger als 350 Zeichen ist
     */
    hasLongText() {
      return this.fullText.length > 350;
    },
  },

  // Methoden für Benutzerinteraktionen
  methods: {
    /**
     * Schaltet zwischen erweiterter und kompakter Ansicht der Zusammenfassung um
     */
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    /**
     * Startet das Quiz für das ausgewählte Thema
     * Sendet ein Event an die Elternkomponente mit dem aktuellen Thema als Payload
     */
    startQuiz() {
      this.$emit("start-quiz", this.topic);
    },

    /**
     * Leitet den Benutzer zum Paket-Upgrade weiter
     * Sendet ein Event an die Elternkomponente, die dann den Upgrade-Prozess handhabt
     */
    upgradePaket() {
      this.$emit("upgrade-paket");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.dashboard-analyzed-topic {
  margin: 0;
  padding: $spacing-lg $spacing-lg $spacing-lg $spacing-lg;

  @include respond(laptop) {
    padding: calc($spacing-md + 5px) calc($spacing-md + 0px) $spacing-md
      calc($spacing-md - 5px);
  }

  &_row {
    display: flex;
    align-items: flex-start;
    margin: 0 0 calc($spacing-lg - 20px) 0;

    &_col-1 {
      width: 18vw;
      max-width: 500px;
      margin-right: $spacing-md;

      @include respond(laptop) {
        width: 16vw;
        margin-right: calc($spacing-md - 5px);
        // display: none;
      }

      @include respond(tablet) {
        display: none;
      }

      h3 {
        margin: 0 0 0px 0;
        padding: 0;
        font-size: $font-size-h3-lg;
        color: $color-dark-blue;
        font-weight: 600;

        @include respond(laptop) {
          font-size: $font-size-h3-md;
          margin: 0 0 1.5px 0;
        }
      }

      p {
        margin: 0;
        padding: 0;
        font-size: calc($font-size-p-lg - 3px);
        font-weight: 500;
        color: #707070;

        @include respond(laptop) {
          font-size: calc($font-size-p-md - 1px);
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

      h2 {
        margin: 0 0 $spacing-xs 0;
        padding: 0;
        font-size: $font-size-p-lg;
        font-weight: 500;

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }
      }

      p {
        width: 95%;
        margin: 0 auto 0 0;
        padding: 0;
        font-size: calc($font-size-p-lg - 1px);
        line-height: 1.5;
        word-wrap: break-word;

        @include respond(laptop) {
          width: 100%;
          margin: 0;
          font-size: $font-size-p-md;
        }
      }

      b {
        font-size: calc($font-size-p-lg - 2px);
        font-weight: 500;
      }

      ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: $spacing-xs;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          margin: 0;
          padding: $spacing-xs $spacing-sm;
          font-size: calc($font-size-p-lg - 2px);
          background-color: rgba($color-light-blue, 0.1);
          border-radius: $border-radius-md;
          color: $color-dark-blue;

          @include respond(laptop) {
            font-size: $font-size-p-md;
          }
        }
      }

      .expanded-content {
        width: 100%;
      }

      .paragraph {
        width: 100%;
        margin-bottom: $spacing-md;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .button-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      button {
        &.dropdown {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: $spacing-md 0 0 0;
          padding: 10px $spacing-md;
          font-size: calc($font-size-p-lg - 2px);
          background-color: transparent;
          color: $color-light-blue;
          border: 1px solid rgba($color-light-blue, 0.2);
          border-radius: $border-radius-sm;
          cursor: pointer;
          transition: all $transition-speed-medium $transition-timing;
          font-weight: 500;

          @include respond(laptop) {
            font-size: calc($font-size-p-md - 1px);
          }

          i {
            margin: 0 0 0 15px;
            transition: transform $transition-speed-medium $transition-timing;
            font-size: calc($font-size-p-lg - 5px);

            &.rotated {
              transform: rotate(180deg);
            }
          }
        }

        &.quiz {
          @include primary-button;
          align-self: flex-start;
          border: none;
          font-size: calc($font-size-p-lg - 2px);

          @include respond(laptop) {
            font-size: calc($font-size-p-md - 1px);
          }

          &.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background-color: #a0a0a0;
            box-shadow: none;

            &:hover {
              background-color: #a0a0a0;
              transform: none;
              box-shadow: none;
            }
          }

          &.upgrade-button {
            background-color: $color-light-blue;
            color: white;
            font-weight: 500;
            transition: all $transition-speed-medium $transition-timing;

            &:hover {
              background-color: darken($color-light-blue, 10%);
              box-shadow: $shadow-md;
            }
          }
        }
      }
    }
  }
}
</style>
