<template>
  <button
    class="button-blue"
    :class="[
      `button-blue--${variant}`,
      {
        'button-blue--disabled': disabled || isBlocked,
        'button-blue--always-blue': alwaysBlue,
      },
    ]"
    :style="{ minWidth: minWidth }"
    :disabled="disabled || isBlocked"
    @click.capture.prevent.stop="handleClick"
  >
    <!-- Icon links vom Text, falls vorhanden und Position ist 'left' -->
    <i
      v-if="icon && iconPosition === 'left'"
      :class="[
        'button-blue__icon',
        icon,
        { 'button-blue__icon--rotated': iconRotated },
      ]"
    ></i>

    <!-- Button Text -->
    <span class="button-blue__text">{{ text }}</span>

    <!-- Icon rechts vom Text, falls vorhanden und Position ist 'right' -->
    <i
      v-if="icon && iconPosition === 'right'"
      :class="[
        'button-blue__icon',
        icon,
        { 'button-blue__icon--rotated': iconRotated },
      ]"
    ></i>
  </button>
</template>

<script>
// Globaler State, um Datei-Auswahl-Aktionen zu sperren
const fileInputBlocker = {
  isBlocked: false,
  timeout: null,

  block() {
    this.isBlocked = true;

    // Bereinige vorherigen Timeout, falls vorhanden
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Setze Timeout zum Entsperren
    this.timeout = setTimeout(() => {
      this.isBlocked = false;
    }, 1000); // Lange Sperrzeit für sicheren Schutz
  },
};

export default {
  name: "ButtonBlue",

  props: {
    // Text im Button
    text: {
      type: String,
      default: "Button",
    },

    // Button-Variante: primary, upgrade
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "upgrade"].includes(value),
    },

    // Ob der Button deaktiviert sein soll
    disabled: {
      type: Boolean,
      default: false,
    },

    // Ob der Button immer blau bleiben soll, auch wenn er deaktiviert ist
    alwaysBlue: {
      type: Boolean,
      default: false,
    },

    // FontAwesome Icon-Klasse (z.B. 'fa-solid fa-chevron-down')
    icon: {
      type: String,
      default: "",
    },

    // Position des Icons (links oder rechts vom Text)
    iconPosition: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right"].includes(value),
    },

    // Ob das Icon rotiert werden soll (z.B. für Dropdown-Buttons)
    iconRotated: {
      type: Boolean,
      default: false,
    },

    // Minimale Breite für den Button
    minWidth: {
      type: String,
      default: "",
    },

    // Ist dieser Button ein Trigger für einen Datei-Input?
    isFileInputTrigger: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // Lokaler Debounce-Status
      isLocallyBlocked: false,
    };
  },

  computed: {
    // Kombinierter Sperrzustand aus globalem und lokalem Status
    isBlocked() {
      // Bei File-Input-Triggern prüfen wir auch den globalen Blocker
      if (this.isFileInputTrigger && fileInputBlocker.isBlocked) {
        return true;
      }
      return this.isLocallyBlocked;
    },
  },

  methods: {
    // Click-Handler mit verbessertem Schutz
    handleClick(event) {
      // Harte Event-Abbrüche
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Prüfen, ob Button gesperrt oder deaktiviert ist
      if (this.disabled || this.isBlocked) {
        return;
      }

      // Lokale Sperre aktivieren
      this.isLocallyBlocked = true;

      // Bei File-Input-Triggern auch globale Sperre aktivieren
      if (this.isFileInputTrigger) {
        fileInputBlocker.block();
      }

      // Event emittieren
      this.$emit("click", event);

      // Lokale Sperre nach Verzögerung aufheben
      setTimeout(() => {
        this.isLocallyBlocked = false;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.button-blue {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all $transition-speed-medium $transition-timing;
  padding: 12.5px 18px;
  border-radius: $border-radius-sm;
  text-align: center;
  font-size: calc($font-size-p-lg - 2px);

  &__icon {
    font-size: calc($font-size-p-lg - 5px);
    transition: transform $transition-speed-medium $transition-timing;

    &:first-child {
      margin-right: 15px;
    }

    &:last-child {
      margin-left: 15px;
    }

    &--rotated {
      transform: rotate(180deg);
    }
  }

  // Primary Button Variante (Standard)
  &--primary {
    background-color: $color-light-blue;
    color: $color-text-white;
    letter-spacing: 1px;
    padding: 14px 40px;
    border-radius: 10px;
    align-self: flex-start;

    &:hover:not(:disabled) {
      background-color: $color-light-blue-darker;
      box-shadow: $shadow-sm;
    }

    @include respond(laptop) {
      padding: 12px 35px;
      font-size: calc($font-size-p-md - 1px);
    }

    @include respond(tablet) {
      padding: 10px 30px;
    }

    @include respond(phone) {
      padding: 8px 25px;
      font-size: $font-size-p-sm;
    }
  }

  // Upgrade Button Variante
  &--upgrade {
    background-color: $color-light-blue;
    color: $color-text-white;
    letter-spacing: 1px;
    padding: 14px 40px;
    border-radius: 10px;
    align-self: flex-start;

    &:hover:not(:disabled) {
      background-color: $color-light-blue-darker;
      box-shadow: $shadow-sm;
    }

    @include respond(laptop) {
      padding: 12px 35px;
      font-size: calc($font-size-p-md - 1px);
    }

    @include respond(tablet) {
      padding: 10px 30px;
    }

    @include respond(phone) {
      padding: 8px 25px;
      font-size: $font-size-p-sm;
    }
  }

  // Disabled Zustand
  &--disabled {
    opacity: 0.6;
    // cursor: not-allowed;
    background-color: #a0a0a0;
    box-shadow: none;

    &:hover {
      background-color: #a0a0a0;
      transform: none;
      box-shadow: none;
    }

    // Überschreibung für alwaysBlue
    &.button-blue--always-blue {
      &.button-blue--primary,
      &.button-blue--upgrade {
        background-color: $color-light-blue;
      }
    }
  }
}
</style>
