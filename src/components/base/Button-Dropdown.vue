<template>
  <button
    class="button-dropdown"
    :class="[
      {
        'button-dropdown--disabled': disabled,
      },
    ]"
    :style="{ minWidth: minWidth }"
    :disabled="disabled"
    @click="$emit('toggle')"
  >
    <!-- Icon links vom Text, falls vorhanden und Position ist 'left' -->
    <i
      v-if="icon && iconPosition === 'left'"
      :class="[
        'button-dropdown__icon',
        icon,
        { 'button-dropdown__icon--rotated': isExpanded },
      ]"
    ></i>

    <!-- Button Text -->
    <span class="button-dropdown__text">{{
      isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"
    }}</span>

    <!-- Icon rechts vom Text, falls vorhanden und Position ist 'right' -->
    <i
      v-if="icon && iconPosition === 'right'"
      :class="[
        'button-dropdown__icon',
        icon,
        { 'button-dropdown__icon--rotated': isExpanded },
      ]"
    ></i>
  </button>
</template>

<script>
export default {
  name: "CustomToggleButton",

  props: {
    // Aktueller Zustand (eingeklappt/ausgeklappt)
    isExpanded: {
      type: Boolean,
      default: false,
    },

    // Ob der Button deaktiviert sein soll
    disabled: {
      type: Boolean,
      default: false,
    },

    // FontAwesome Icon-Klasse (z.B. 'fa-solid fa-chevron-down')
    icon: {
      type: String,
      default: "fa-solid fa-chevron-down",
    },

    // Position des Icons (links oder rechts vom Text)
    iconPosition: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right"].includes(value),
    },

    // Minimale Breite für den Button
    minWidth: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.button-dropdown {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-speed-medium $transition-timing;
  padding: 10px calc($spacing-md);
  border-radius: $border-radius-sm;
  text-align: center;
  font-size: calc($font-size-p-lg - 2px);
  background-color: transparent;
  color: $color-light-blue;
  border: 1px solid rgba($color-light-blue, 0.2);
  margin: $spacing-md 0 0 0;
  // letter-spacing: 1px;
  border-radius: 10px;

  &:hover:not(:disabled) {
    background-color: rgba($color-light-blue, 0.05);
  }

  @include respond(laptop) {
    font-size: calc($font-size-p-md - 1px);
  }

  &__icon {
    font-size: calc($font-size-p-lg - 5px);
    transition: transform $transition-speed-medium $transition-timing;

    &:first-child {
      margin-right: 12px;
    }

    &:last-child {
      margin-left: 12px;
    }

    &--rotated {
      transform: rotate(180deg);
    }
  }

  // Disabled Zustand
  &--disabled {
    opacity: 0.6;
    cursor: default;

    &:hover {
      transform: none;
      box-shadow: none;
      background-color: transparent;
    }
  }
}
</style>
