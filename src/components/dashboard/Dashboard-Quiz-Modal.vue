<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="dashboard-quiz-modal">
      <div class="modal-header">
        <p>
          <span class="question-icon">💬</span> Frage
          {{ currentQuestionIndex + 1 }} / {{ quizQuestions.length }}
          <span class="score-display">
            Punkte: {{ correctAnswers }} / {{ totalAnswered }}
          </span>
        </p>
        <i class="fa-solid fa-x close-icon" @click="closeModal"></i>
      </div>
      <div class="quiz-content">
        <h3>
          {{ currentQuestion.question }}
        </h3>
        <form @submit.prevent="checkAnswer">
          <transition-group name="answer-fade" tag="div">
            <div
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              class="answer-option"
              :class="getAnswerClass(answer, index)"
              @click="selectAnswer(index)"
              :style="{ animationDelay: index * 0.1 + 's' }"
            >
              <i :class="getIconClass(index)"></i>
              <input
                type="radio"
                :id="'answer' + index"
                :value="index"
                v-model="selectedAnswer"
                :disabled="answerChecked"
                class="hidden-radio"
              />
              <label :for="'answer' + index">{{ answer.text }}</label>
            </div>
          </transition-group>
        </form>
      </div>
      <div class="modal-footer">
        <!-- Wichtig: alwaysBlue muss auf true gesetzt sein! -->
        <ButtonBlue
          v-if="!answerChecked"
          variant="upgrade"
          text="Antwort bestätigen"
          :disabled="selectedAnswer === null"
          :alwaysBlue="true"
          minWidth="220px"
          @click.stop="checkAnswer"
        />
        <ButtonBlue
          v-else
          variant="upgrade"
          :text="isLastQuestion ? 'Quiz beenden' : 'Nächste Frage'"
          :alwaysBlue="true"
          minWidth="220px"
          @click.stop="nextQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardQuizModal",

  // Props: Daten, die von der übergeordneten Komponente übergeben werden
  props: {
    /**
     * Das Thema mit zugehörigen Quizfragen
     * Kann entweder ein Array von Fragen oder ein Objekt mit einem questions-Property sein
     */
    topic: {
      type: [Array, Object],
      required: true,
    },
  },

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Steuert die Sichtbarkeit des Modals
       */
      isVisible: true,

      /**
       * Speichert den Index der aktuell ausgewählten Antwort
       * null bedeutet, dass keine Antwort ausgewählt ist
       */
      selectedAnswer: null,

      /**
       * Flag, das anzeigt, ob die aktuelle Antwort bereits überprüft wurde
       */
      answerChecked: false,

      /**
       * Index der aktuell angezeigten Frage im quizQuestions Array
       */
      currentQuestionIndex: 0,

      /**
       * Zähler für korrekte Antworten
       */
      correctAnswers: 0,

      /**
       * Gesamtzahl der beantworteten Fragen
       */
      totalAnswered: 0,

      /**
       * Verlauf der gegebenen Antworten mit Details zu jeder Antwort
       */
      answerHistory: [],

      /**
       * Flag gegen doppelte Button-Klicks
       */
      isProcessing: false,
      lastClickTime: 0,
    };
  },

  // Berechnete Eigenschaften
  computed: {
    /**
     * Extrahiert die Quizfragen aus dem topic-Prop, unabhängig vom Format
     *
     * @returns {Array} Flaches Array mit allen Quizfragen
     */
    quizQuestions() {
      let questions = [];

      if (Array.isArray(this.topic)) {
        // Fall 1: topic ist direkt ein Array
        questions = this.topic;
      } else if (this.topic && typeof this.topic === "object") {
        // Fall 2: topic ist ein Objekt
        // Versuche, ein questions-Property zu finden
        if (Array.isArray(this.topic.questions)) {
          questions = this.topic.questions;
        } else if (Array.isArray(this.topic.topicQuestions)) {
          questions = this.topic.topicQuestions;
        } else if (Array.isArray(this.topic.quizQuestions)) {
          questions = this.topic.quizQuestions;
        } else {
          // Fallback: Suche nach dem ersten Array-Property
          for (const key in this.topic) {
            if (Array.isArray(this.topic[key])) {
              questions = this.topic[key];
              break;
            }
          }
        }
      }

      // Versuche, das Array zu flatten, falls es verschachtelt ist
      try {
        questions = questions.flat();
      } catch (e) {
        console.error("Fehler beim Flatten der Fragen:", e);
      }

      return questions;
    },

    /**
     * Gibt die aktuell angezeigte Frage zurück
     *
     * @returns {Object} Die aktuelle Quizfrage mit ihren Antwortoptionen
     */
    currentQuestion() {
      if (!this.quizQuestions || this.quizQuestions.length === 0) {
        console.error("Keine Quizfragen verfügbar!");
        return { question: "Keine Fragen verfügbar", answers: [] };
      }

      if (this.currentQuestionIndex >= this.quizQuestions.length) {
        console.error(
          "Fragen-Index außerhalb des gültigen Bereichs:",
          this.currentQuestionIndex
        );
        return this.quizQuestions[0]; // Fallback zur ersten Frage
      }

      return this.quizQuestions[this.currentQuestionIndex];
    },

    /**
     * Prüft, ob die aktuelle Frage die letzte im Quiz ist
     *
     * @returns {boolean} True, wenn die aktuelle Frage die letzte ist
     */
    isLastQuestion() {
      return this.currentQuestionIndex === this.quizQuestions.length - 1;
    },
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Schließt das Quiz-Modal und informiert die übergeordnete Komponente
     * Wird aufgerufen, wenn der Benutzer auf das X oder außerhalb des Modals klickt
     */
    closeModal() {
      this.isVisible = false;
      this.$emit("close");
    },

    /**
     * Überprüft, ob eine Aktion verarbeitet werden kann oder ob es ein doppelter Klick ist
     *
     * @returns {boolean} True, wenn die Aktion verarbeitet werden kann
     */
    canProcessAction() {
      const now = Date.now();
      if (this.isProcessing || now - this.lastClickTime < 300) {
        return false;
      }

      this.isProcessing = true;
      this.lastClickTime = now;

      setTimeout(() => {
        this.isProcessing = false;
      }, 50);

      return true;
    },

    /**
     * Überprüft die ausgewählte Antwort und aktualisiert den Punktestand
     * Wird aufgerufen, wenn der Benutzer eine Antwort bestätigt
     */
    checkAnswer() {
      if (!this.canProcessAction()) return;

      if (this.selectedAnswer !== null && !this.answerChecked) {
        this.answerChecked = true;
        this.totalAnswered++;

        // Prüfe, ob die Antwort korrekt ist
        const isCorrect =
          this.currentQuestion.answers[this.selectedAnswer].isCorrect;

        // Speichere das Ergebnis in der Antworthistorie
        this.answerHistory.push({
          questionIndex: this.currentQuestionIndex,
          selectedAnswer: this.selectedAnswer,
          isCorrect: isCorrect,
          question: this.currentQuestion.question,
        });

        // Erhöhe den Zähler für korrekte Antworten, wenn die Antwort richtig war
        if (isCorrect) {
          this.correctAnswers++;
        }
      }
    },

    /**
     * Wählt eine Antwortoption aus
     * Wird aufgerufen, wenn der Benutzer auf eine Antwortoption klickt
     *
     * @param {number} index - Index der ausgewählten Antwort
     */
    selectAnswer(index) {
      if (!this.answerChecked) {
        this.selectedAnswer = index;
      }
    },

    /**
     * Wechselt zur nächsten Frage oder beendet das Quiz, wenn es die letzte Frage war
     * Wird aufgerufen, wenn der Benutzer auf "Nächste Frage" oder "Quiz beenden" klickt
     */
    nextQuestion() {
      if (!this.canProcessAction()) return;

      if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.answerChecked = false;
      } else {
        // Quiz beendet
        this.$emit("quiz-completed", {
          correctAnswers: this.correctAnswers,
          totalQuestions: this.quizQuestions.length,
          answerHistory: this.answerHistory,
        });
        this.closeModal();
      }
    },

    /**
     * Bestimmt die CSS-Klasse für eine Antwortoption basierend auf ihrer Korrektheit
     * und ob sie ausgewählt wurde
     *
     * @param {Object} answer - Das Antwortobjekt
     * @param {number} index - Index der Antwort
     * @returns {string} CSS-Klassenname für die Antwort
     */
    getAnswerClass(answer, index) {
      if (!this.answerChecked) return "";
      if (answer.isCorrect) return "correct-answer";
      if (this.selectedAnswer === index && !answer.isCorrect)
        return "wrong-answer";
      return "";
    },

    /**
     * Bestimmt die Icon-Klasse für eine Antwortoption basierend auf ihrer Auswahl
     *
     * @param {number} index - Index der Antwort
     * @returns {string} CSS-Klassenname für das Icon
     */
    getIconClass(index) {
      return this.selectedAnswer === index
        ? "fa-regular fa-square-check"
        : "fa-regular fa-square";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  @include flex-center;
  z-index: 1000;
}

.dashboard-quiz-modal {
  width: $width-modal-desktop;
  background-color: $color-text-white;
  margin: -100px 0 0 0;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  position: relative;
  box-sizing: border-box;

  @include respond(laptop) {
    width: $width-modal-laptop;
    margin: -50px 0 0 120px;
  }

  @include respond(tablet) {
    width: 70vw;
  }

  @include respond(phone) {
    width: 90vw;
  }

  .modal-header {
    @include flex-between;
    margin: 0;
    padding: $spacing-md $spacing-md 0 $spacing-md;

    & p {
      margin: 0;
      padding: 0;
      font-size: calc($font-size-p-lg - 3px);

      @include respond(laptop) {
        font-size: $font-size-p-md;
      }

      @include respond(tablet) {
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }

      & .question-icon {
        margin: 0 $spacing-xs 0 0;
      }

      .score-display {
        // display: none;
        margin-left: $spacing-sm;

        @include respond(tablet) {
          display: inline-block;
          margin-left: $spacing-sm;
        }
      }
    }

    .close-icon {
      font-size: 1.1rem;
      cursor: pointer;
      color: $color-text-dark;
      transition: color $transition-speed-fast $transition-timing;

      @include respond(laptop) {
        font-size: 0.95rem;
        margin: 0 2.5px 0 0;
      }

      &:hover {
        color: $color-danger;
      }
    }
  }

  .quiz-content {
    margin: 0;
    padding: 0 $spacing-md;
    text-align: center;

    & h3 {
      margin: $spacing-md 0 $spacing-md 0;
      padding: 0;
      text-align: left;
      font-size: $font-size-h3-lg;
      color: $color-dark-blue;

      @include respond(laptop) {
        font-size: $font-size-h3-md;
      }

      @include respond(tablet) {
        font-size: $font-size-h3-md;
      }

      @include respond(phone) {
        font-size: $font-size-h3-sm;
      }
    }

    .answer-option {
      display: flex;
      align-items: center;
      margin: $spacing-xs 0;
      padding: $spacing-sm;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: all $transition-speed-medium $transition-timing;
      border: 1px solid $color-text-dark;
      text-align: left;
      animation: answerSlideIn 0.5s ease-out forwards;
      opacity: 0;
      transform: translateY(10px);

      & label {
        cursor: pointer;
        font-size: calc($font-size-p-lg - 0px);

        @include respond(laptop) {
          font-size: $font-size-p-md;
        }

        @include respond(tablet) {
          font-size: $font-size-p-md;
        }

        @include respond(phone) {
          font-size: $font-size-p-sm;
        }
      }

      &:hover {
        background-color: $color-body-background;
      }

      &.correct-answer {
        border-color: $color-success;
        background-color: rgba($color-success, 0.1);
      }

      &.wrong-answer {
        border-color: $color-danger;
        background-color: rgba($color-danger, 0.1);
      }

      i {
        font-size: 1.1rem;
        margin: 0 10px 0 0;
      }

      .hidden-radio {
        display: none;
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin: calc($spacing-lg + 10px) 0 0 0;
    padding: calc($spacing-md - 5px) $spacing-md;
    background-color: $color-dark-blue;
    border-bottom-left-radius: $border-radius-md;
    border-bottom-right-radius: $border-radius-md;
  }
}

@keyframes answerSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.answer-fade-enter-active,
.answer-fade-leave-active {
  transition: all 0.3s;
}
.answer-fade-enter-from,
.answer-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
