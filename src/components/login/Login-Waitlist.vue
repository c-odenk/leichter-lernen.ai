<template>
  <div class="login-waitlist" :class="{ 'tablet-mode': isTablet }">
    <div class="form-container">
      <div class="waitlist-header">
        <h2>Trage dich in unsere Warteliste ein</h2>
      </div>

      <form @submit.prevent="submitWaitlist" class="form">
        <p class="waitlist-description">
          Unsere KI-Modelle befinden sich derzeit im Training. Trage deine
          E-Mail ein, um benachrichtigt zu werden, sobald wir starten.
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
          :class="['status-message', formStatus.type]"
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
  props: {
    isTablet: {
      type: Boolean,
      default: false,
    },
  },
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

// Basis-Styling, angepasst an Login-Komponente
.login-waitlist {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-md;
  box-sizing: border-box;
  background-color: $color-body-background;

  &.tablet-mode {
    background-color: transparent;
    align-items: flex-start;
    padding-top: 17.5vh;

    .form-container {
      background-color: $color-text-white;
      max-width: 450px;
      border-radius: $border-radius-lg;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
  }

  @include respond(tablet) {
    padding: $spacing-sm;
    background-color: transparent;
  }
}

// Formularbehälter - angepasst an den Login-Style
.form-container {
  width: 100%;
  max-width: 500px;
  background-color: $color-text-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  overflow: hidden;
  position: relative;

  @include respond(tablet) {
    max-width: 460px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: $border-radius-md;
  }
}

// Waitlist Header - angepasst an das Styling des Login-Headers
.waitlist-header {
  padding: $spacing-md $spacing-lg $spacing-sm $spacing-lg;
  text-align: center;
  border-bottom: 1px solid #ddd;

  h2 {
    color: $color-dark-blue;
    font-size: $font-size-h2-lg;
    margin: 0;
    font-weight: 700;
    line-height: 1.3;

    @include respond(phone) {
      font-size: $font-size-h2-sm;
    }
  }
}

// Beschreibungstext - angepasst
.waitlist-description {
  margin-bottom: $spacing-md;
  color: $color-text-dark;
  text-align: center;
  font-size: $font-size-p-desktop;
  letter-spacing: $letter-spacing-p-desktop;
  line-height: $line-height-p-desktop;

  @include respond(laptop) {
    font-size: $font-size-p-laptop;
    letter-spacing: $letter-spacing-p-laptop;
    line-height: $line-height-p-laptop;
  }

  @include respond(tablet) {
    font-size: $font-size-p-tablet;
    letter-spacing: $letter-spacing-p-tablet;
    line-height: $line-height-p-tablet;
  }

  @include respond(phone) {
    font-size: $font-size-p-phone;
    letter-spacing: $letter-spacing-p-phone;
    line-height: $line-height-p-phone;
  }
}

// Form - angepasst an den Login-Style
.form {
  padding: calc($spacing-md) calc($spacing-lg) calc($spacing-lg)
    calc($spacing-lg);
  font-size: $font-size-p-desktop;
  letter-spacing: $letter-spacing-p-desktop;
  line-height: $line-height-p-desktop;

  @include respond(laptop) {
    font-size: $font-size-p-laptop;
    letter-spacing: $letter-spacing-p-laptop;
    line-height: $line-height-p-laptop;
  }

  @include respond(tablet) {
    padding: $spacing-md $spacing-lg;
    font-size: $font-size-p-tablet;
    letter-spacing: $letter-spacing-p-tablet;
    line-height: $line-height-p-tablet;
  }

  @include respond(phone) {
    padding: $spacing-md;
    font-size: $font-size-p-phone;
    letter-spacing: $letter-spacing-p-phone;
    line-height: $line-height-p-phone;
  }

  &-group {
    margin-bottom: $spacing-md;

    label {
      display: block;
      margin-bottom: $spacing-xs / 2;
      font-weight: 500;
      color: $color-text-dark;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      line-height: $line-height-p-desktop;
    }

    input[type="email"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: $border-radius-sm;
      font-size: calc($font-size-p-lg - 3px);
      transition: border-color $transition-speed-medium;
      box-sizing: border-box;

      &:focus {
        border-color: $color-light-blue;
        outline: none;
        box-shadow: 0 0 0 2px rgba($color-light-blue, 0.1);
      }
    }
  }
}

// Checkbox - angepasst
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;

  input[type="checkbox"] {
    margin-right: $spacing-xs;
    margin-top: 6px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
    font-size: $font-size-p-tablet;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;
  }
}

.terms {
  margin: $spacing-md 0 $spacing-lg;
}

// Links - angepasst
.link {
  color: $color-light-blue;
  text-decoration: none;
  transition: color $transition-speed-fast;
  @include link-hover-effect;
  font-weight: 500;
}

.back-link-container {
  margin-top: calc($spacing-md - 5px);
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: $color-light-blue;
  text-decoration: none;
  font-size: $font-size-p-laptop;
  letter-spacing: $letter-spacing-p-tablet;
  font-weight: 500;
  transition: color $transition-speed-fast;

  &:hover {
    color: darken($color-light-blue, 15%);
  }
}

.btn {
  width: 100%;
  padding: $spacing-xs;
  border: none;
  border-radius: $border-radius-sm;
  font-weight: 600;
  font-size: $font-size-p-laptop;
  letter-spacing: $letter-spacing-p-tablet;
  cursor: pointer;
  transition: all $transition-speed-medium;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-primary {
    @include primary-button;
    font-size: calc($font-size-p-lg - 2px);

    @include respond(phone) {
      font-size: $font-size-p-sm;
    }
  }
}

// Loading-Spinner - angepasst
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: $border-radius-round;
  border-top-color: #fff;
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

// Status-Nachricht - angepasst an den Login-Style
.status-message {
  margin-top: $spacing-sm;
  padding: $spacing-xs;
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
</style>
