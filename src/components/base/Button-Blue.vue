<!-- ButtonBlue.vue -->
<template>
  <button
    class="button-blue"
    :class="[
      `button-blue--${variant}`,
      {
        'button-blue--disabled': disabled,
        'button-blue--always-blue': alwaysBlue,
      },
    ]"
    :style="{ minWidth: minWidth }"
    :disabled="disabled"
    @click="handleClick"
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
export default {
  name: "ButtonBlue",
  props: {
    // Text im Button
    text: {
      type: String,
      default: "Button",
    },

    // Button-Variante: primary, dropdown, upgrade
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "dropdown", "upgrade"].includes(value),
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
  },

  methods: {
    // Event-Handler für Klicks
    handleClick(event) {
      // Wenn der Button nicht deaktiviert ist, geben wir das Event weiter
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.button-blue {
  // Basis-Styling für alle Button-Varianten
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

  // Icon Styling
  &__icon {
    font-size: calc($font-size-p-lg - 5px);
    transition: transform $transition-speed-medium $transition-timing;

    // Icon links vom Text
    &:first-child {
      margin-right: 15px;
    }

    // Icon rechts vom Text
    &:last-child {
      margin-left: 15px;
    }

    // Rotiertes Icon (für Dropdown)
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

  // Dropdown Button Variante
  &--dropdown {
    background-color: transparent;
    color: $color-light-blue;
    border: 1px solid rgba($color-light-blue, 0.2);
    border-radius: $border-radius-sm;
    padding: 10px $spacing-md;
    margin: $spacing-md 0 0 0;

    &:hover:not(:disabled) {
      background-color: rgba($color-light-blue, 0.05);
    }

    @include respond(laptop) {
      font-size: calc($font-size-p-md - 1px);
    }
  }

  // Upgrade Button Variante (identisch mit primary)
  &--upgrade {
    // Gleiche Stile wie primary
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

  // Disabled Zustand für alle Varianten
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #a0a0a0;
    box-shadow: none;

    &:hover {
      background-color: #a0a0a0;
      transform: none;
      box-shadow: none;
    }

    // Überschreibung für alwaysBlue: Behält die blaue Farbe auch im deaktivierten Zustand
    &.button-blue--always-blue {
      &.button-blue--primary,
      &.button-blue--upgrade {
        background-color: $color-light-blue;
      }
    }
  }
}
</style>
