<template>
  <button
    class="button-gray"
    :class="[
      `button-gray--${variant}`,
      {
        'button-gray--disabled': disabled || isBlocked,
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
        'button-gray__icon',
        icon,
        { 'button-gray__icon--rotated': iconRotated },
      ]"
    ></i>

    <!-- Button Text -->
    <span class="button-gray__text">{{ text }}</span>

    <!-- Icon rechts vom Text, falls vorhanden und Position ist 'right' -->
    <i
      v-if="icon && iconPosition === 'right'"
      :class="[
        'button-gray__icon',
        icon,
        { 'button-gray__icon--rotated': iconRotated },
      ]"
    ></i>
  </button>
</template>

<script>
// Globaler State, um Aktionen zu sperren (geteilt mit ButtonBlue)
const actionBlocker = {
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
    }, 1000);
  },
};

export default {
  name: "ButtonGray",

  props: {
    // Text im Button
    text: {
      type: String,
      default: "Button",
    },

    // Button-Variante: primary, secondary
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary"].includes(value),
    },

    // Ob der Button deaktiviert sein soll
    disabled: {
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

    // Ob das Icon rotiert werden soll
    iconRotated: {
      type: Boolean,
      default: false,
    },

    // Minimale Breite für den Button
    minWidth: {
      type: String,
      default: "",
    },

    // Ist dieser Button ein spezieller Trigger? (z.B. für ActionBlocker)
    isSpecialTrigger: {
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
      // Bei speziellen Triggern prüfen wir auch den globalen Blocker
      if (this.isSpecialTrigger && actionBlocker.isBlocked) {
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

      // Bei speziellen Triggern auch globale Sperre aktivieren
      if (this.isSpecialTrigger) {
        actionBlocker.block();
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

.button-gray {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
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

    // Rotiertes Icon
    &--rotated {
      transform: rotate(180deg);
    }
  }

  // Primary Button Variante (Standard)
  &--primary {
    padding: 14px 40px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 10px;
    color: #666;
    font-size: 14px;
    transition: all $transition-speed-fast $transition-timing;
    font-size: calc($font-size-p-lg - 2px);

    @include respond(laptop) {
      font-size: calc($font-size-p-md - 2px);
    }

    &:hover:not(:disabled) {
      background-color: #f5f5f5;
    }
  }

  &--disabled {
    opacity: 0.6;
    // cursor: not-allowed;;

    &:hover {
      transform: none;
      box-shadow: none;
      background-color: transparent;
    }
  }
}
</style>
