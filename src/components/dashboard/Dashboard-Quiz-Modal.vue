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
          <div
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            class="answer-option"
            :class="getAnswerClass(answer, index)"
            @click="selectAnswer(index)"
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-quiz-modal {
  width: 40vw;
  height: auto;
  background-color: white;
  margin: -100px 0 0 0;
  //padding: 30px 30px 30px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  box-sizing: border-box;

  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 30px 30px 0 30px;

    & p {
      margin: 0;
      padding: 0;

      & .question-icon {
        margin: 0 7.5px 0 0px;
      }

      .score-display {
        display: none;
      }
    }

    .close-icon {
      font-size: 1.1rem;
      cursor: pointer;
      color: #333;
    }
  }

  .quiz-content {
    margin: 0;
    padding: 0 30px 0 30px;
    text-align: center;

    & h3 {
      margin: 20px 0 30px 0;
      padding: 0;
      text-align: left;
    }

    .answer-option {
      display: flex;
      align-items: center;
      margin: 10px 0;
      padding: 15px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      border: 1px solid #000;

      & label {
        cursor: pointer;
      }

      &:hover {
        background-color: #f5f5f5;
      }

      &.correct-answer {
        border-color: green;
        background-color: rgba(0, 128, 0, 0.1);
      }

      &.wrong-answer {
        border-color: red;
        background-color: rgba(255, 0, 0, 0.1);
      }

      i {
        font-size: 1.5rem;
        margin: 0 12.5px 0 0;
      }

      .hidden-radio {
        display: none;
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin: 50px 0 0 0;
    padding: 20px 30px;
    background-color: $color-dark-blue;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .submit-btn,
    .next-btn {
      padding: 15px 40px;
      min-width: 220px;
      background-color: $color-light-blue;
      color: white;
      font-size: $font-size-p-lg;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }
}

@media (max-width: 768px) {
  .dashboard-quiz-modal {
    width: 90vw;
  }
}
</style>
