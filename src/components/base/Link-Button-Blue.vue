<!-- Link-Button-Blue.vue -->
<template>
  <router-link
    :to="disabled ? '#' : to"
    class="link-button-blue"
    :class="{
      'link-button-blue--disabled': disabled,
      'link-button-blue--block': block,
    }"
    @click="disabled ? $event.preventDefault() : null"
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
@import "@/variables/variables.scss";

.link-button-blue {
  // Basisstil aus dem ursprünglichen primary-button mixin
  display: inline-block;
  padding: 14px 40px;
  font-size: $font-size-p-lg;
  font-weight: 500;
  line-height: $line-height;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  // text-transform: uppercase;
  color: $color-text-white;
  background-color: $color-light-blue;
  border-radius: 10px;
  transition: background-color $transition-speed-medium $transition-timing;
  cursor: pointer;
  position: relative;
  z-index: 5;

  // Hover-Effekt
  &:hover:not(.link-button-blue--disabled) {
    background-color: $color-light-blue-darker;
  }

  // Block-Styling (volle Breite)
  &--block {
    display: block;
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
  }
}
</style>
