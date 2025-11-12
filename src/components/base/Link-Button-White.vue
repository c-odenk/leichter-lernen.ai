<template>
  <router-link
    :to="disabled ? '#' : to"
    class="button-white"
    :class="{
      'button-white--disabled': disabled,
      'button-white--block': block,
    }"
    @click="disabled && $event.preventDefault()"
  >
    <slot>{{ disabled && disabledText ? disabledText : text }}</slot>
  </router-link>
</template>

<script>
export default {
  name: "ButtonWhite",
  props: {
    // Anzuzeigender Text
    text: {
      type: String,
      default: "Button",
    },

    // Ziel für router-link
    to: {
      type: String,
      required: true,
    },

    // Ob der Button deaktiviert ist
    disabled: {
      type: Boolean,
      default: false,
    },

    // Alternativer Text für deaktivierten Zustand
    disabledText: {
      type: String,
      default: "",
    },

    // Ob der Button volle Breite haben soll
    block: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.button-white {
  // Basisstil aus dem ursprünglichen primary-button mixin
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 40px;
  font-size: $font-size-p-lg;
  font-weight: 500;
  line-height: $line-height;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  color: $color-text-dark;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all $transition-speed-medium $transition-timing;
  cursor: pointer;
  position: relative;
  z-index: 5;

  &:deep(i) {
    margin: 2px 0 0 5px;
    font-size: 15px;
  }

  // Hover-Effekt
  &:hover:not(.button-white--disabled) {
    border-color: $color-light-blue;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.12),
      0 2px 6px rgba(0, 0, 0, 0.08);
  }

  // Block-Styling (volle Breite)
  &--block {
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }

  // Deaktivierter Zustand
  &--disabled {
    background-color: gray;
    cursor: not-allowed;

    &:hover {
      background-color: gray;
    }
  }

  // Responsive Anpassungen
  @include respond(laptop) {
    padding: 12px 35px;
  }

  @include respond(tablet) {
    padding: 10px 30px;
    font-size: $font-size-p-md;
  }

  @include respond(phone) {
    padding: 8px 25px;
    font-size: $font-size-p-sm;
    display: none;
  }
}
</style>
