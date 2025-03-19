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

        <!-- Hamburger Menu Button für mobile Ansicht -->
        <div
          class="menu-button"
          @click="toggleMenu"
          :class="{ active: menuOpen }"
        >
          <span></span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="header_row_navigation desktop-nav">
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

        <div class="header_row_cta desktop-cta">
          <LinkButtonBlue text="Anmelden" to="/login" />
        </div>
      </div>
    </div>

    <!-- Mobiles Menü - Mit Animation von rechts und voller Bildschirmbreite -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <div class="mobile-menu__container">
        <div class="mobile-menu__top">
          <div class="mobile-menu__branding">
            <img
              :src="logoSrc"
              width="70"
              height="70"
              alt="leichter-lernen Logo"
              v-if="imageLoaded"
            />
            <span>leichter-lernen.ai</span>
          </div>
          <div class="mobile-menu__close" @click="closeMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <nav class="mobile-menu__nav">
          <router-link to="/" class="mobile-menu__link" @click="closeMenu">
            <span class="mobile-menu__icon">🏠</span>
            <span>Home</span>
          </router-link>
          <div class="mobile-menu__link" @click="handleDisabledClick">
            <span class="mobile-menu__icon">✨</span>
            <span>Produkt</span>
            <span class="mobile-menu__badge">Bald</span>
          </div>
          <router-link
            to="/pricing"
            class="mobile-menu__link"
            @click="closeMenu"
          >
            <span class="mobile-menu__icon">💰</span>
            <span>Preise</span>
          </router-link>
          <router-link to="/blog" class="mobile-menu__link" @click="closeMenu">
            <span class="mobile-menu__icon">📝</span>
            <span>Blog</span>
          </router-link>
        </nav>

        <div class="mobile-menu__footer">
          <router-link to="/login" class="mobile-menu__cta" @click="closeMenu">
            Anmelden
          </router-link>

          <div class="mobile-menu__social">
            <a href="https://www.xing.com/" target="_blank" aria-label="Xing">
              <i class="fa-brands fa-xing"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              aria-label="TikTok"
            >
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
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
      menuOpen: false,
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

    // Event-Listener für Fenstergröße, um das Menü zu schließen beim Resize
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Event-Listener entfernen
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleDisabledClick(event) {
      if (event) event.preventDefault(); // Verhindert das Standardverhalten
      alert("Die Seite ist in Kürze verfügbar!"); // Zeigt eine Meldung an
      this.closeMenu();
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;

      // Scroll verhindern, wenn Menü offen ist
      if (this.menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.style.overflow = "";
    },
    handleResize() {
      // Menü schließen, wenn Bildschirm größer als Tablet wird
      if (window.innerWidth > 1024) {
        this.closeMenu();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

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
  position: relative;
  z-index: 100;

  @include respond(laptop) {
    padding: calc($spacing-md - 20px) 0;
  }

  @include respond(tablet) {
    padding: $spacing-sm 0;
  }

  @include respond(phone) {
    padding: $spacing-xs 0;
  }

  &_row {
    @include content-container;
    display: flex;
    align-items: center;
    position: relative;

    @include respond(tablet) {
      justify-content: space-between;
    }

    &_logo {
      width: 20%;

      @include respond(laptop) {
        width: 25%;
      }

      @include respond(tablet) {
        width: auto;
        flex: 1;
      }

      @include respond(phone) {
        width: auto;
      }

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

          @include respond(tablet) {
            height: 70px;
          }

          @include respond(phone) {
            height: 55px;
          }
        }

        h2 {
          margin-left: $spacing-sm;
          font-size: 25px;
          line-height: $line-height;
          letter-spacing: $letter-spacing;
          color: $color-dark-blue;
          white-space: nowrap;

          @include respond(tablet) {
            font-size: 22px;
          }

          @include respond(phone) {
            font-size: 18px;
            margin-left: $spacing-xs;
          }
        }
      }
    }

    &_navigation {
      width: 60%;
      display: flex;
      justify-content: center;

      @include respond(laptop) {
        width: 55%;
      }

      @include respond(tablet) {
        display: none;
      }

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
            font-size: $font-size-p-xl;
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

    &_cta {
      width: 20%;
      display: flex;
      justify-content: flex-end;

      @include respond(laptop) {
        width: 20%;
      }

      @include respond(tablet) {
        display: none;
      }
    }
  }
}

// Menu Button (Hamburger)
.menu-button {
  width: 36px;
  height: 36px;
  position: relative;
  border-radius: $border-radius-md;
  cursor: pointer;
  margin-left: $spacing-sm;
  z-index: 1001;
  display: none;
  justify-content: center;
  align-items: center;
  transition: background-color $transition-speed-medium $transition-timing;

  @include respond(tablet) {
    display: flex;
  }

  &:hover {
    background-color: rgba($color-light-blue, 0.1);
  }

  &.active {
    span {
      background-color: transparent;

      &:before {
        transform: rotate(45deg);
        top: 0;
      }

      &:after {
        transform: rotate(-45deg);
        bottom: 0;
      }
    }
  }

  span {
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    background-color: $color-dark-blue;
    transition: all $transition-speed-medium $transition-timing;

    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $color-dark-blue;
      transition: all $transition-speed-medium $transition-timing;
      left: 0;
    }

    &:before {
      top: -6px;
    }

    &:after {
      bottom: -6px;
    }
  }
}

// Mobiles Menü - Mit Animation von rechts und voller Bildschirmbreite
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%; // Statt 100vh für iOS-Kompatibilität
  background-color: rgba($color-dark-blue, 0.5);
  z-index: 1000;
  transition: right $transition-speed-medium $transition-timing;
  display: none;

  @include respond(tablet) {
    display: block;
  }

  &.open {
    right: 0;
  }

  &__container {
    position: absolute;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%; // Statt 100vh für iOS-Kompatibilität
    background-color: $color-text-white;
    display: flex;
    flex-direction: column;
    transition: right $transition-speed-medium $transition-timing;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // Verbessert das Scrolling auf iOS
    padding: $spacing-sm;
    padding: $spacing-sm $spacing-sm 0 $spacing-sm;

    @include respond(phone) {
      padding: $spacing-xs $spacing-xs 0 $spacing-xs;
    }

    .open & {
      right: 0;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid rgba($color-dark-blue, 0.1);
    margin-bottom: $spacing-xs;
  }

  &__branding {
    display: flex;
    align-items: center;

    img {
      height: 70px;
      width: auto;
      margin-right: $spacing-xs;

      @include respond(phone) {
        height: 55px;
      }
    }

    span {
      font-size: 25px;
      font-weight: 600;
      color: $color-dark-blue;
      white-space: nowrap;

      @include respond(tablet) {
        font-size: 22px;
      }

      @include respond(phone) {
        font-size: 18px;
      }
    }
  }

  &__close {
    width: 36px;
    height: 36px;
    border-radius: $border-radius-round;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $color-dark-blue;
    transition: background-color $transition-speed-medium $transition-timing;

    &:hover {
      background-color: rgba($color-dark-blue, 0.05);
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: $spacing-xs;
    margin-bottom: 2px;
    border-radius: $border-radius-sm;
    text-decoration: none;
    color: $color-dark-blue;
    font-size: $font-size-p-lg;
    font-weight: 500;
    position: relative;
    transition: background-color $transition-speed-medium $transition-timing;
    cursor: pointer;

    @include respond(tablet) {
      font-size: $font-size-p-xl;
    }

    @include respond(phone) {
      font-size: $font-size-p-md;
    }

    &:hover {
      background-color: rgba($color-light-blue, 0.08);
      color: $color-light-blue;
    }
  }

  &__icon {
    margin-right: $spacing-xs;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    text-align: center;
  }

  &__badge {
    position: absolute;
    right: $spacing-sm;
    background-color: $color-light-blue-lighter;
    color: $color-text-white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 600;
  }

  &__footer {
    margin-top: auto;
    margin-bottom: 20px; // Zusätzlicher Abstand nach unten
    padding-top: $spacing-sm;
    border-top: 1px solid rgba($color-dark-blue, 0.1);
  }

  &__cta {
    @include primary-button;
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: $spacing-sm;
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: $spacing-md;

    a {
      color: $color-dark-blue;
      font-size: $font-size-p-xl;
      transition: color $transition-speed-medium $transition-timing;

      &:hover {
        color: $color-light-blue;
      }
    }
  }
}
</style>
