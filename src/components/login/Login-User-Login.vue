<template>
  <div class="login-container">
    <div class="form-container">
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
          type="button"
        >
          Anmelden
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
          type="button"
        >
          Registrieren
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="activeTab === 'login'" @submit.prevent="login" class="form">
        <h2>Anmelden</h2>

        <div class="form-group">
          <label for="loginEmail">E-Mail</label>
          <input
            type="email"
            id="loginEmail"
            v-model="loginForm.email"
            required
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>

        <div class="form-group">
          <label for="loginPassword">Passwort</label>
          <div class="password-input">
            <input
              :type="showLoginPassword ? 'text' : 'password'"
              id="loginPassword"
              v-model="loginForm.password"
              required
              placeholder="Ihr Passwort"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showLoginPassword = !showLoginPassword"
              aria-label="Passwort anzeigen oder ausblenden"
            >
              <span class="icon">{{ showLoginPassword ? "👁️" : "👁️‍🗨️" }}</span>
            </button>
          </div>
        </div>

        <div class="form-actions">
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="loginForm.rememberMe"
            />
            <label for="rememberMe">Angemeldet bleiben</label>
          </div>
          <a href="#" class="link" @click.prevent="forgotPassword"
            >Passwort vergessen?</a
          >
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span>{{ isLoading ? "Wird angemeldet..." : "Anmelden" }}</span>
        </button>

        <div class="divider">
          <span>oder</span>
        </div>

        <button type="button" class="btn btn-google" @click="loginWithGoogle">
          <span class="google-icon">G</span>
          Mit Google anmelden
        </button>

        <div v-if="loginError" class="error-message" role="alert">
          {{ loginError }}
        </div>
      </form>

      <!-- Register Form -->
      <form
        v-if="activeTab === 'register'"
        @submit.prevent="register"
        class="form"
      >
        <h2>Registrieren</h2>

        <div class="form-group">
          <label for="registerName">Name</label>
          <input
            type="text"
            id="registerName"
            v-model="registerForm.name"
            required
            placeholder="Ihr vollständiger Name"
          />
        </div>

        <div class="form-group">
          <label for="registerEmail">E-Mail</label>
          <input
            type="email"
            id="registerEmail"
            v-model="registerForm.email"
            required
            placeholder="Ihre E-Mail-Adresse"
          />
        </div>

        <div class="form-group">
          <label for="registerPassword">Passwort</label>
          <div class="password-input">
            <input
              :type="showRegisterPassword ? 'text' : 'password'"
              id="registerPassword"
              v-model="registerForm.password"
              required
              placeholder="Mindestens 8 Zeichen"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showRegisterPassword = !showRegisterPassword"
              aria-label="Passwort anzeigen oder ausblenden"
            >
              <span class="icon">{{ showRegisterPassword ? "👁️" : "👁️‍🗨️" }}</span>
            </button>
          </div>
          <div v-if="registerForm.password" class="password-strength">
            <div class="strength-bar">
              <div
                class="strength-indicator"
                :style="{ width: passwordStrength + '%' }"
                :class="passwordStrengthClass"
              ></div>
            </div>
            <span :class="['strength-text', passwordStrengthClass]">{{
              passwordStrengthText
            }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Passwort bestätigen</label>
          <div class="password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              required
              placeholder="Passwort wiederholen"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
              aria-label="Passwort anzeigen oder ausblenden"
            >
              <span class="icon">{{ showConfirmPassword ? "👁️" : "👁️‍🗨️" }}</span>
            </button>
          </div>
          <div v-if="registerForm.confirmPassword" class="password-match">
            <span :class="passwordsMatch ? 'match' : 'mismatch'">
              {{
                passwordsMatch
                  ? "Passwörter stimmen überein"
                  : "Passwörter stimmen nicht überein"
              }}
            </span>
          </div>
        </div>

        <div class="checkbox-wrapper terms">
          <input
            type="checkbox"
            id="agreeTerms"
            v-model="registerForm.agreeTerms"
            required
          />
          <label for="agreeTerms">
            Ich stimme den
            <a href="#" class="link" @click.prevent="showTerms"
              >Nutzungsbedingungen</a
            >
            und
            <a href="#" class="link" @click.prevent="showPrivacy"
              >Datenschutzrichtlinien</a
            >
            zu
          </label>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || !canRegister"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span>{{ isLoading ? "Wird registriert..." : "Registrieren" }}</span>
        </button>

        <div class="divider">
          <span>oder</span>
        </div>

        <button
          type="button"
          class="btn btn-google"
          @click="registerWithGoogle"
        >
          <span class="google-icon">G</span>
          Mit Google anmelden
        </button>

        <div v-if="registerError" class="error-message" role="alert">
          {{ registerError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";

export default {
  name: "LoginSection",
  setup() {
    // Lokaler Auth-Service (als Ersatz für den fehlenden externen Service)
    const authService = {
      // Diese Funktionen werden später mit der tatsächlichen API-Integration ersetzt
      async login(credentials) {
        // Simulation einer API-Anfrage mit einer kleinen Verzögerung
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("Login with:", credentials);

            // Simulierter Erfolgsfall (in der realen Implementierung API-Aufruf)
            if (credentials.email && credentials.password) {
              resolve({
                token: "dummy-jwt-token",
                user: {
                  id: 1,
                  name: "Testnutzer",
                  email: credentials.email,
                },
              });
            } else {
              reject(new Error("E-Mail und Passwort sind erforderlich"));
            }
          }, 1000);
        });
      },

      async register(userData) {
        // Simulation einer API-Anfrage
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("Register with:", userData);

            // Simulierter Erfolgsfall
            if (userData.email && userData.password && userData.name) {
              resolve({
                success: true,
                message: "Registrierung erfolgreich",
              });
            } else {
              reject(new Error("Alle Felder müssen ausgefüllt sein"));
            }
          }, 1000);
        });
      },

      async loginWithGoogle() {
        console.log(
          "Google Login - wird in der tatsächlichen Implementierung integriert"
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            // In der realen Implementierung würde hier die Google-OAuth-Integration stattfinden
            console.log("Google login initiated");
            resolve(true);
          }, 500);
        });
      },

      async registerWithGoogle() {
        return this.loginWithGoogle();
      },
    };

    // State
    const activeTab = ref("login");
    const isLoading = ref(false);
    const loginError = ref("");
    const registerError = ref("");
    const showLoginPassword = ref(false);
    const showRegisterPassword = ref(false);
    const showConfirmPassword = ref(false);

    // Login form
    const loginForm = reactive({
      email: "",
      password: "",
      rememberMe: false,
    });

    // Register form
    const registerForm = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });

    // Computed properties
    const passwordStrength = computed(() => {
      if (!registerForm.password) return 0;

      let strength = 0;

      // Length
      if (registerForm.password.length >= 8) strength += 25;

      // Contains lowercase
      if (/[a-z]/.test(registerForm.password)) strength += 25;

      // Contains uppercase
      if (/[A-Z]/.test(registerForm.password)) strength += 25;

      // Contains number or special char
      if (/[0-9!@#$%^&*]/.test(registerForm.password)) strength += 25;

      return strength;
    });

    const passwordStrengthClass = computed(() => {
      if (passwordStrength.value < 50) return "weak";
      if (passwordStrength.value < 75) return "medium";
      return "strong";
    });

    const passwordStrengthText = computed(() => {
      if (passwordStrength.value < 50) return "Schwach";
      if (passwordStrength.value < 75) return "Mittel";
      return "Stark";
    });

    const passwordsMatch = computed(() => {
      return (
        registerForm.password === registerForm.confirmPassword &&
        registerForm.confirmPassword !== ""
      );
    });

    const canRegister = computed(() => {
      return (
        registerForm.agreeTerms &&
        passwordsMatch.value &&
        passwordStrength.value >= 50
      );
    });

    // Methods
    const login = async () => {
      try {
        loginError.value = "";
        isLoading.value = true;

        const response = await authService.login({
          email: loginForm.email,
          password: loginForm.password,
          rememberMe: loginForm.rememberMe,
        });

        console.log("Login successful", response);
        // Hier würde normalerweise die Weiterleitung nach erfolgreicher Anmeldung erfolgen
      } catch (error) {
        loginError.value =
          error.message || "Bei der Anmeldung ist ein Fehler aufgetreten";
        console.error("Login error", error);
      } finally {
        isLoading.value = false;
      }
    };

    const register = async () => {
      try {
        registerError.value = "";
        isLoading.value = true;

        const response = await authService.register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        });

        console.log("Registration successful", response);
        // Nach erfolgreicher Registrierung zur Login-Seite wechseln
        activeTab.value = "login";
        // Optional: Erfolgsbenachrichtigung anzeigen
      } catch (error) {
        registerError.value =
          error.message || "Bei der Registrierung ist ein Fehler aufgetreten";
        console.error("Registration error", error);
      } finally {
        isLoading.value = false;
      }
    };

    const loginWithGoogle = async () => {
      try {
        loginError.value = "";
        isLoading.value = true;

        await authService.loginWithGoogle();
        // Hier würde normalerweise die Weiterleitung nach erfolgreicher Anmeldung erfolgen
      } catch (error) {
        loginError.value =
          error.message ||
          "Bei der Anmeldung mit Google ist ein Fehler aufgetreten";
        console.error("Google login error", error);
      } finally {
        isLoading.value = false;
      }
    };

    const registerWithGoogle = async () => {
      try {
        registerError.value = "";
        isLoading.value = true;

        await authService.registerWithGoogle();
        // Nach erfolgreicher Registrierung zur Login-Seite wechseln oder direkt einloggen
      } catch (error) {
        registerError.value =
          error.message ||
          "Bei der Registrierung mit Google ist ein Fehler aufgetreten";
        console.error("Google registration error", error);
      } finally {
        isLoading.value = false;
      }
    };

    const forgotPassword = () => {
      console.log("Forgot password");
      // Hier würde normalerweise die Passwort-Zurücksetzen-Funktion implementiert werden
    };

    const showTerms = () => {
      console.log("Show terms");
      // Hier würden die Nutzungsbedingungen angezeigt werden
    };

    const showPrivacy = () => {
      console.log("Show privacy policy");
      // Hier würde die Datenschutzrichtlinie angezeigt werden
    };

    return {
      activeTab,
      isLoading,
      loginForm,
      registerForm,
      loginError,
      registerError,
      showLoginPassword,
      showRegisterPassword,
      showConfirmPassword,
      passwordStrength,
      passwordStrengthClass,
      passwordStrengthText,
      passwordsMatch,
      canRegister,
      login,
      register,
      loginWithGoogle,
      registerWithGoogle,
      forgotPassword,
      showTerms,
      showPrivacy,
    };
  },
};
</script>

<style lang="scss" scoped>
// Variablen
$primary-color: #4a86e8;
$secondary-color: darken($primary-color, 10%);
$error-color: #ff4d4f;
$success-color: #52c41a;
$warning-color: #faad14;
$text-color: #333;
$text-light: #777;
$background-color: #fff;
$border-color: #ddd;
$box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
$border-radius: 12px;
$input-border-radius: 8px;
$transition-speed: 0.3s;
$google-blue: #4285f4;
$google-red: #ea4335;
$google-yellow: #fbbc05;
$google-green: #34a853;

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin input-style {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid $border-color;
  border-radius: $input-border-radius;
  font-size: 16px;
  transition: border-color $transition-speed;
  box-sizing: border-box;

  &:focus {
    border-color: $primary-color;
    outline: none;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
  }
}

// Basis-Styling
.login-container {
  width: 100%;
  min-height: 100%;
  @include flex-center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f9fafb;
}

.form-container {
  width: 100%;
  max-width: 500px;
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
}

// Tabs
.tabs {
  display: flex;
  border-bottom: 1px solid $border-color;

  .tab {
    flex: 1;
    text-align: center;
    padding: 16px;
    font-weight: 600;
    color: $text-light;
    background: none;
    border: none;
    cursor: pointer;
    transition: all $transition-speed;

    &.active {
      color: $primary-color;
      border-bottom: 2px solid $primary-color;
    }

    &:hover:not(.active) {
      background-color: #f9f9f9;
    }
  }
}

// Form
.form {
  padding: 30px;

  h2 {
    margin: 0 0 24px;
    font-size: 24px;
    font-weight: 700;
    color: $text-color;
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: $text-color;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    @include input-style;
  }
}

// Password Input
.password-input {
  position: relative;

  input {
    padding-right: 50px;
  }

  .toggle-password {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: $text-light;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color $transition-speed;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .icon {
      font-size: 20px;
      line-height: 1;
    }
  }
}

// Password Strength
.password-strength {
  margin-top: 8px;

  .strength-bar {
    height: 4px;
    background-color: #eee;
    border-radius: 2px;
    margin-bottom: 5px;
    overflow: hidden;

    .strength-indicator {
      height: 100%;
      border-radius: 2px;
      transition: width 0.3s ease;

      &.weak {
        background-color: $error-color;
      }

      &.medium {
        background-color: $warning-color;
      }

      &.strong {
        background-color: $success-color;
      }
    }
  }

  .strength-text {
    font-size: 12px;

    &.weak {
      color: $error-color;
    }

    &.medium {
      color: $warning-color;
    }

    &.strong {
      color: $success-color;
    }
  }
}

// Password Match
.password-match {
  margin-top: 8px;
  font-size: 12px;

  .match {
    color: $success-color;
  }

  .mismatch {
    color: $error-color;
  }
}

// Form actions
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

// Checkbox
.checkbox-wrapper {
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    margin-right: 8px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
}

.terms {
  margin: 20px 0;
}

// Links
.link {
  color: $primary-color;
  text-decoration: none;
  transition: color $transition-speed;

  &:hover {
    color: $secondary-color;
    text-decoration: underline;
  }
}

// Buttons
.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: $input-border-radius;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-speed;
  position: relative;
  @include flex-center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.btn-primary {
    background-color: $primary-color;
    color: white;

    &:hover:not(:disabled) {
      background-color: $secondary-color;
    }
  }

  &.btn-google {
    background-color: white;
    color: $text-color;
    border: 1px solid $border-color;

    .google-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      // background-color: $google-blue;
      background-color: $google-red;
      color: white;
      border-radius: 50%;
      margin-right: 10px;
      font-weight: bold;
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

// Loading spinner
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s infinite linear;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Divider
.divider {
  position: relative;
  margin: 24px 0;
  text-align: center;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: $border-color;
  }

  span {
    position: relative;
    background-color: white;
    padding: 0 10px;
    color: $text-light;
    font-size: 14px;
  }
}

// Error message
.error-message {
  margin-top: 16px;
  padding: 10px;
  background-color: rgba($error-color, 0.1);
  border-radius: $input-border-radius;
  color: $error-color;
  font-size: 14px;
  text-align: center;
}

// Responsive Design
@media (max-width: 480px) {
  .form {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
    align-items: flex-start;

    a {
      margin-top: 10px;
    }
  }
}
</style>
