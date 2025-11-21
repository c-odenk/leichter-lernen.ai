<template>
  <router-link
    :to="disabled ? '#' : to"
    class="link-button-blue"
    :class="{
      'link-button-blue--disabled': disabled,
      'link-button-blue--block': block,
    }"
    @click="disabled && $event.preventDefault()"
  >
    <slot>{{ disabled && disabledText ? disabledText : text }}</slot>
  </router-link>
</template>

<script>
export default {
  name: "LinkButtonBlue",
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

.link-button-blue {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 40px;
  font-size: $font-size-p-desktop;
  letter-spacing: $letter-spacing-p-desktop;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  color: $color-text-white;
  background-color: $color-light-blue;
  border-radius: 10px;
  transition: background-color $transition-speed-medium $transition-timing;
  cursor: pointer;
  position: relative;
  z-index: 5;

  @include respond(laptop) {
    padding: 12px 35px;
    font-size: $font-size-p-laptop;
    letter-spacing: $letter-spacing-p-laptop;
  }

  @include respond(tablet) {
    padding: 10px 30px;
    font-size: $font-size-p-tablet;
    letter-spacing: $letter-spacing-p-tablet;
  }

  @include respond(phone) {
    padding: 8px 25px;
    font-size: $font-size-p-phone;
    letter-spacing: $letter-spacing-p-phone;
  }

  &:deep(i) {
    margin: 4px 0 0 16px;
    font-size: 15px;
  }

  // Hover-Effekt
  &:hover:not(.link-button-blue--disabled) {
    background-color: $color-light-blue-darker;
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
}
</style>
