<template>
  <div class="login-waitlist">
    <div class="form-container">
      <div class="waitlist-header">
        <h2>Trage dich in unsere Warteliste ein</h2>
      </div>

      <form @submit.prevent="submitWaitlist" class="form">
        <p class="waitlist-description">
          Unsere KI-Modelle befinden sich derzeit in der Entwicklung. Trage
          deine E-Mail ein, um benachrichtigt zu werden, sobald wir starten.
        </p>

        <div class="form-group">
          <label for="waitlistEmail">E-Mail</label>
          <input
            type="email"
            id="waitlistEmail"
            v-model="waitlistForm.email"
            required
            placeholder="Deine E-Mail-Adresse"
          />
        </div>

        <div class="checkbox-wrapper terms">
          <input
            type="checkbox"
            id="agreeTerms"
            v-model="waitlistForm.agreeTerms"
            required
          />
          <label for="agreeTerms">
            Ich stimme den
            <router-link
              to="/terms"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
              >Nutzungsbedingungen</router-link
            >
            und
            <router-link
              to="/privacy"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
              >Datenschutzrichtlinien</router-link
            >
            zu
          </label>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || !canSubmit"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span>{{
            isLoading ? "Wird eingetragen..." : "In Warteliste eintragen"
          }}</span>
        </button>

        <div class="back-link-container">
          <a href="/" class="back-link">Zurück zur Startseite</a>
        </div>

        <div
          v-if="formStatus.message"
          class="status-message"
          :class="formStatus.type"
          role="alert"
        >
          {{ formStatus.message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";

export default {
  name: "LoginWaitlistSection",
  setup() {
    // Lokaler Waitlist-Service
    const waitlistService = {
      async addToWaitlist(userData) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("Waitlist submission with:", userData);

            if (userData.email) {
              resolve({
                success: true,
                message:
                  "Du wurdest erfolgreich in die Warteliste eingetragen!",
              });
            } else {
              reject(new Error("E-Mail-Adresse muss ausgefüllt sein"));
            }
          }, 1000);
        });
      },
    };

    // State
    const isLoading = ref(false);
    const formStatus = reactive({
      message: "",
      type: "",
    });

    // Waitlist Form
    const waitlistForm = reactive({
      email: "",
      agreeTerms: false,
    });

    const canSubmit = computed(
      () => waitlistForm.agreeTerms && waitlistForm.email
    );

    const submitWaitlist = async () => {
      try {
        formStatus.message = "";
        formStatus.type = "";
        isLoading.value = true;

        const response = await waitlistService.addToWaitlist({
          email: waitlistForm.email,
        });

        formStatus.message = response.message;
        formStatus.type = "success";

        // Form zurücksetzen
        waitlistForm.email = "";
        waitlistForm.agreeTerms = false;
      } catch (error) {
        formStatus.message =
          error.message || "Bei der Eintragung ist ein Fehler aufgetreten";
        formStatus.type = "error";
        console.error("Waitlist submission error", error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      waitlistForm,
      formStatus,
      canSubmit,
      submitWaitlist,
    };
  },
};
</script>

<style lang="scss">
@use "../../variables/variables.scss" as *;

// Basis-Styling
.login-waitlist {
  width: 100%;
  height: 100%;
  @include flex-center;
  padding: $spacing-md;
  box-sizing: border-box;
  background-color: $color-body-background;
}

// Formularbehälter
.form-container {
  width: 100%;
  max-width: 500px;
  background-color: $color-text-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  overflow: hidden;
  position: relative;
}

// Waitlist Header
.waitlist-header {
  padding: $spacing-lg $spacing-lg $spacing-sm $spacing-lg;
  text-align: center;

  h2 {
    color: $color-dark-blue;
    font-size: $font-size-h2-lg;
    margin: 0;
    font-weight: 600;
    line-height: 1.3;
  }
}

// Beschreibungstext
.waitlist-description {
  margin-bottom: $spacing-md;
  color: $color-text-dark;
  text-align: center;
  line-height: 1.5;
  font-size: calc($font-size-p-lg - 2px);
}

// Form
.form {
  padding: $spacing-lg calc($spacing-lg - 10px);

  &-group {
    margin-bottom: $spacing-md;

    label {
      display: block;
      margin-bottom: $spacing-xs;
      font-weight: 500;
      color: $color-text-dark;
      font-size: 16px;
    }

    input[type="email"] {
      width: 100%;
      padding: 12px;
      border: 1px solid rgba($color-dark-blue, 0.2);
      border-radius: $border-radius-sm;
      font-size: 16px;
      transition: all $transition-speed-medium;
      box-sizing: border-box;

      &:focus {
        border-color: $color-light-blue;
        outline: none;
        box-shadow: 0 0 0 2px rgba($color-light-blue, 0.1);
      }
    }
  }
}

// Checkbox
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;

  input[type="checkbox"] {
    margin-right: $spacing-xs;
    margin-top: 3px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    line-height: 1.4;
  }
}

.terms {
  margin: $spacing-md 0 $spacing-lg;
}

// Links
.link {
  color: $color-light-blue;
  text-decoration: none;
  @include link-hover-effect;
  font-weight: 500;
}

// Zurück-Link
.back-link-container {
  margin-top: $spacing-md;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: $color-light-blue;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color $transition-speed-fast;

  &:hover {
    color: $color-light-blue-darker;
  }
}

// Buttons
.btn {
  width: 100%;
  padding: $spacing-xs $spacing-md;
  border: none;
  border-radius: $border-radius-md;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-speed-medium;
  position: relative;
  @include flex-center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-primary {
    @include primary-button;
  }
}

// Loading-Spinner
.loading-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: $border-radius-round;
  border-top-color: $color-text-white;
  animation: spin 1s infinite linear;
  margin-right: $spacing-xs;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Status-Nachricht
.status-message {
  margin-top: $spacing-md;
  padding: $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: 14px;
  text-align: center;

  &.success {
    background-color: rgba($color-success, 0.1);
    color: $color-success;
  }

  &.error {
    background-color: rgba($color-danger, 0.1);
    color: $color-danger;
  }
}

// Responsive Design
@include respond(phone) {
  .form {
    padding: $spacing-md;
  }

  .waitlist-header {
    padding: $spacing-md $spacing-md $spacing-sm $spacing-md;

    h2 {
      font-size: $font-size-h2-sm;
    }
  }

  .waitlist-description {
    font-size: $font-size-p-sm;
  }

  .btn {
    font-size: $font-size-p-sm;
  }
}
</style>
