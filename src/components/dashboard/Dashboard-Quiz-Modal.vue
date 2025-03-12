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
        <button
          v-if="!answerChecked"
          type="submit"
          class="submit-btn"
          :disabled="answerChecked"
          @click="checkAnswer"
        >
          Antwort bestätigen
        </button>
        <button v-else type="button" class="next-btn" @click="nextQuestion">
          {{ isLastQuestion ? "Quiz beenden" : "Nächste Frage" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardQuizModal",
  props: {
    topic: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
      selectedAnswer: null,
      answerChecked: false,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      totalAnswered: 0,
      answerHistory: [],
    };
  },
  computed: {
    quizQuestions() {
      // Flacht das Array ab, falls es verschachtelt ist
      return this.topic.flat();
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.quizQuestions.length - 1;
    },
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      this.$emit("close");
    },
    checkAnswer() {
      if (this.selectedAnswer !== null) {
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
        });

        // Erhöhe den Zähler für korrekte Antworten, wenn die Antwort richtig war
        if (isCorrect) {
          this.correctAnswers++;
        }
      }
    },
    selectAnswer(index) {
      if (!this.answerChecked) {
        this.selectedAnswer = index;
      }
    },
    nextQuestion() {
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
    getAnswerClass(answer, index) {
      if (!this.answerChecked) return "";
      if (answer.isCorrect) return "correct-answer";
      if (this.selectedAnswer === index && !answer.isCorrect)
        return "wrong-answer";
      return "";
    },
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
  background-color: rgba(0, 0, 0, 0.5);
  @include flex-center;
  z-index: 1000;
}

.dashboard-quiz-modal {
  width: $width-modal-lg;
  background-color: $color-text-white;
  margin: -100px 0 0 0;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  position: relative;
  box-sizing: border-box;

  @include respond(laptop) {
    width: 50vw;
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
        display: none;

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
        font-size: calc($font-size-p-lg - 3px);

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

    .submit-btn,
    .next-btn {
      @include primary-button;
      min-width: 220px;
      border: none;
      font-size: calc($font-size-p-lg - 4px);

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }
}

/* Animation für die Antwortoptionen */
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

/* Transition für answer-fade */
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
