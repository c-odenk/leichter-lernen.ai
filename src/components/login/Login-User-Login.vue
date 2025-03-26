<template>
  <div class="login-container" :class="{ 'tablet-mode': isTablet }">
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

        <div class="back-link-container">
          <a href="/" class="back-link">Zurück zur Startseite</a>
        </div>

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

        <div class="form-row">
          <div class="form-group form-group-half">
            <label for="registerFirstName">Vorname</label>
            <input
              type="text"
              id="registerFirstName"
              v-model="registerForm.firstName"
              required
              placeholder="Ihr Vorname"
            />
          </div>

          <div class="form-group form-group-half">
            <label for="registerLastName">Nachname</label>
            <input
              type="text"
              id="registerLastName"
              v-model="registerForm.lastName"
              required
              placeholder="Ihr Nachname"
            />
          </div>
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
          :disabled="isLoading || !canRegister"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span>{{ isLoading ? "Wird registriert..." : "Registrieren" }}</span>
        </button>

        <div class="back-link-container">
          <a href="/" class="back-link">Zurück zur Startseite</a>
        </div>

        <div v-if="registerError" class="error-message" role="alert">
          {{ registerError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "LoginUserSection",
  setup() {
    // Prüfen, ob Tablet-Ansicht (für angepasste Darstellung)
    const isTablet = ref(false);

    // Beim Mounten der Komponente prüfen, ob Tablet-Ansicht
    const checkDevice = () => {
      const width = window.innerWidth;
      isTablet.value = width > 767 && width <= 1024; // Zwischen smartphone und laptop
    };

    // Initial und bei Resize prüfen
    onMounted(() => {
      checkDevice();
      window.addEventListener("resize", checkDevice);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkDevice);
    });

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
                  firstName: "Test",
                  lastName: "Nutzer",
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
            if (
              userData.email &&
              userData.password &&
              userData.firstName &&
              userData.lastName
            ) {
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
      firstName: "",
      lastName: "",
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
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
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

    const forgotPassword = () => {
      console.log("Forgot password");
      // Hier würde normalerweise die Passwort-Zurücksetzen-Funktion implementiert werden
    };

    return {
      isTablet,
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
      forgotPassword,
      // showTerms,
      // showPrivacy,
    };
  },
};
</script>

<style lang="scss">
@import "@/variables/variables.scss";

.login-container {
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

  @include respond(tablet-only) {
    padding: $spacing-sm;
    background-color: transparent;
  }
}

.form-container {
  width: 100%;
  max-width: 500px;
  background-color: $color-text-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  overflow: hidden;
  position: relative;

  @include respond(tablet-only) {
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: $border-radius-md;
  }
}

.back-link-container {
  margin-top: calc($spacing-md - 5px);
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
    color: darken($color-light-blue, 15%);
  }
}

.back-icon {
  margin-right: $spacing-xs;
  font-size: 16px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab {
  flex: 1;
  text-align: center;
  padding: $spacing-sm;
  font-weight: 600;
  color: #777;
  background: none;
  border: none;
  cursor: pointer;
  transition: all $transition-speed-medium $transition-timing;
  font-size: calc($font-size-p-lg - 3px);
}

.tab.active {
  color: $color-light-blue;
  border-bottom: 2px solid $color-light-blue;
}

.tab:hover:not(.active) {
  background-color: #f9f9f9;
}

.form {
  padding: $spacing-lg calc($spacing-lg - 10px);

  @include respond(tablet-only) {
    padding: $spacing-md $spacing-lg;
  }
}

.form h2 {
  margin: 0 0 $spacing-md;
  font-size: $font-size-h2-lg;
  font-weight: 700;
  color: $color-dark-blue;
}

.form-row {
  display: flex;
  margin: 0 -8px;
  margin-bottom: $spacing-md;
}

.form-group {
  margin-bottom: $spacing-md;
}

.form-group-half {
  flex: 0 0 50%;
  padding: 0 8px;
  margin-bottom: 0;
  box-sizing: border-box;
}

.form-group label {
  display: block;
  margin-bottom: $spacing-xs / 2;
  font-weight: 500;
  color: $color-text-dark;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: $border-radius-sm;
  font-size: calc($font-size-p-lg - 3px);
  transition: border-color $transition-speed-medium;
  box-sizing: border-box;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="password"]:focus {
  border-color: $color-light-blue;
  outline: none;
  box-shadow: 0 0 0 2px rgba($color-light-blue, 0.1);
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  padding: 8px;
  border-radius: $border-radius-round;
  transition: background-color $transition-speed-medium;
}

.toggle-password:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.toggle-password .icon {
  font-size: 20px;
  line-height: 1;
}

.password-strength {
  margin-top: $spacing-xs;
}

.strength-bar {
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  margin-bottom: 5px;
  overflow: hidden;
}

.strength-indicator {
  height: 100%;
  border-radius: 2px;
  transition: width $transition-speed-medium ease;
}

.strength-indicator.weak {
  background-color: $color-danger;
}

.strength-indicator.medium {
  background-color: $color-warning;
}

.strength-indicator.strong {
  background-color: $color-success;
}

.strength-text {
  font-size: 12px;
}

.strength-text.weak {
  color: $color-danger;
}

.strength-text.medium {
  color: $color-warning;
}

.strength-text.strong {
  color: $color-success;
}

.password-match {
  margin-top: $spacing-xs;
  font-size: 12px;
}

.password-match .match {
  color: $color-success;
}

.password-match .mismatch {
  color: $color-danger;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-right: $spacing-xs;
  cursor: pointer;
}

.checkbox-wrapper label {
  cursor: pointer;
  user-select: none;
}

.terms {
  margin: $spacing-md 0;
}

.link {
  color: $color-light-blue;
  text-decoration: none;
  transition: color $transition-speed-fast;
  @include link-hover-effect;
}

.btn {
  width: 100%;
  padding: $spacing-xs;
  border: none;
  border-radius: $border-radius-sm;
  font-weight: 600;
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
}

.btn-primary {
  @include primary-button;
  font-size: calc($font-size-p-lg - 2px);
}

.btn-google {
  background-color: white;
  color: $color-text-dark;
  font-size: calc($font-size-p-lg - 3px);
  border: 1px solid #ddd;

  &:hover {
    background-color: #f5f5f5;
  }
}

.google-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #ea4335;
  color: white;
  border-radius: $border-radius-round;
  margin-right: $spacing-xs;
  font-weight: bold;
}

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

.divider {
  position: relative;
  margin: $spacing-md 0;
  text-align: center;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #ddd;
  }

  span {
    position: relative;
    // Background-color an den Hintergrund des Form-Containers anpassen
    // Damit wird verhindert, dass es anders aussieht als der Rest
    background-color: $color-text-white;
    padding: 0 $spacing-xs;
    color: #777;
    font-size: 14px;
  }
}

.error-message {
  margin-top: $spacing-sm;
  padding: $spacing-xs;
  background-color: rgba($color-danger, 0.1);
  border-radius: $border-radius-sm;
  color: $color-danger;
  font-size: 14px;
  text-align: center;
}

@include respond(phone) {
  .form {
    padding: $spacing-md;
  }

  .form-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-actions a {
    margin-top: $spacing-xs;
  }

  .form h2 {
    font-size: $font-size-h2-sm;
  }
}
</style>
