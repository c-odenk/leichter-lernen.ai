<template>
  <header v-cloak>
    <div class="header">
      <div class="header_row">
        <div class="header_row_logo">
          <router-link to="/">
            <div v-if="!imageLoaded" class="logo-placeholder"></div>
            <img
              v-show="imageLoaded"
              :src="logoSrc"
              width="100"
              height="100"
              alt="leichter-lernen Logo"
            />
            <h2>leichter-lernen.ai</h2>
          </router-link>
        </div>
        <nav class="header_row_navigation">
          <ul>
            <li>
              <router-link to="/"> Home</router-link>
            </li>
            <li>
              <router-link
                to=""
                @click="handleDisabledClick"
                class="disabled-link"
              >
                ✨ Produkt</router-link
              >
            </li>
            <li><router-link to="/pricing">Preise</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
          </ul>
        </nav>
        <div class="header_row_cta">
          <router-link to="/login"> Anmelden </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderSection",
  data() {
    return {
      imageLoaded: false,
      logoSrc: null,
    };
  },
  created() {
    // Logo URL vorbereiten
    this.logoSrc = require("@/assets/leichter-lernen-logo.png");
  },
  mounted() {
    // Bild im Hintergrund vorladen
    const img = new Image();
    img.onload = () => {
      this.imageLoaded = true;
    };
    img.src = this.logoSrc;

    // Cache Header in sessionStorage für schnellere Wiederbesuche
    if (sessionStorage.getItem("headerLoaded") === "true") {
      this.imageLoaded = true;
    } else {
      sessionStorage.setItem("headerLoaded", "true");
    }
  },
  methods: {
    handleDisabledClick(event) {
      event.preventDefault(); // Verhindert das Standardverhalten
      alert("Die Seite ist in Kürze verfügbar!"); // Zeigt eine Meldung an
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

// Visibility handling for loading
[v-cloak] {
  display: none;
}

.logo-placeholder {
  width: 100px;
  height: 100px;
  background-color: $color-body-background;
  display: inline-block;
  border-radius: $border-radius-sm;
}

.header {
  width: 100%;
  padding: $spacing-md 0;

  &_row {
    @include content-container;
    display: flex;
    align-items: center;
    position: relative;

    // Logo section
    &_logo {
      width: 33.33%;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $color-text-dark;
        transition: color $transition-speed-medium $transition-timing;

        img {
          height: 100px;
          width: auto;
          display: block;
        }

        h2 {
          margin-left: $spacing-sm;
          font-size: 25px;
          line-height: $line-height;
          letter-spacing: $letter-spacing;
          color: $color-dark-blue;
        }
      }
    }

    // Navigation section
    &_navigation {
      width: 33.33%;
      display: flex;
      justify-content: center;

      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        justify-content: center;

        li {
          margin: 0 $spacing-xs;

          a {
            padding: 0 $spacing-sm;
            font-size: $font-size-p-lg;
            font-weight: 500;
            line-height: $line-height;
            letter-spacing: $letter-spacing;
            text-decoration: none;
            text-transform: uppercase;
            color: $color-text-dark;
            transition: color $transition-speed-medium $transition-timing;

            &.disabled-link {
              cursor: not-allowed;
              opacity: 0.7;
            }
          }
        }
      }
    }

    // CTA button
    &_cta {
      width: 33.33%;
      display: flex;
      justify-content: flex-end;

      & a {
        @include primary-button;
      }
    }
  }
}
</style>
