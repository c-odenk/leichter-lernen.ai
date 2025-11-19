<template>
  <header v-cloak>
    <div class="header">
      <div class="header_row">
        <div class="header_row_logo">
          <router-link to="/">
            <div class="logo-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 18V5" />
                <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                <path d="M18 18a4 4 0 0 0 2-7.464" />
                <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                <path d="M6 18a4 4 0 0 1-2-7.464" />
                <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
              </svg>
            </div>
            <h2>leichter-lernen.ai</h2>
          </router-link>
        </div>

        <!-- Hamburger Menu Button -->
        <div
          class="menu-button"
          @click="toggleMenu"
          :class="{ active: menuOpen }"
          :aria-expanded="menuOpen"
          aria-label="Menu"
        >
          <span></span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="header_row_navigation">
          <ul>
            <li><router-link to="/" class="nav-link">Home</router-link></li>
            <li>
              <router-link
                to="#"
                @click="handleDisabledClick"
                class="disabled-link nav-link"
              >
                ✨ Produkt
              </router-link>
            </li>
            <li>
              <router-link to="/pricing" class="nav-link">Preise</router-link>
            </li>
            <li><router-link to="/blog" class="nav-link">Blog</router-link></li>
          </ul>
        </nav>

        <div class="header_row_cta">
          <LinkButtonBlue to="/login">
            Anmelden <i class="fa-solid fa-arrow-right"></i>
          </LinkButtonBlue>
        </div>
      </div>
    </div>

    <!-- Mobiles Menü -->
    <div
      class="mobile-menu"
      :class="{ open: menuOpen }"
      role="dialog"
      :aria-hidden="!menuOpen"
    >
      <div class="mobile-menu__container" @click.self="closeMenu">
        <nav class="mobile-menu__nav" aria-label="Mobile Navigation">
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
      menuOpen: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.overflowX = "";
    document.documentElement.style.overflowX = "";
  },
  methods: {
    handleDisabledClick(event) {
      if (event) event.preventDefault();
      alert("Die Seite ist in Kürze verfügbar!");
      this.closeMenu();
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      const overflowValue = this.menuOpen ? "hidden" : "";
      document.body.style.overflow = overflowValue;
      document.documentElement.style.overflow = overflowValue;
      document.body.style.overflowX = overflowValue;
      document.documentElement.style.overflowX = overflowValue;
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    },
    handleResize() {
      if (window.innerWidth > 850) {
        this.closeMenu();
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

[v-cloak] {
  display: none;
}

.header {
  width: 100%;
  padding: $spacing-md 0;
  background-color: $color-text-white;
  position: relative;
  z-index: 3000;

  @include respond(laptop) {
    padding: calc($spacing-md - 10px) 0;
  }

  @include respond(tablet) {
    padding: $spacing-sm 0;
  }

  @include respond(phone) {
    padding: $spacing-xs 0;
  }

  &_row {
    @include content-container;
    @include flex-between;
    align-items: center;

    &_logo {
      width: 20%;
      flex-shrink: 0;
      z-index: 3002;

      @include respond(tablet) {
        width: auto;
        flex: 1;
        max-width: calc(100% - 60px);
      }

      @include respond(phone) {
        width: auto;
        flex: 1;
        max-width: calc(100% - 60px);
      }

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $color-text-dark;
        gap: 12px;

        @include respond(phone) {
          gap: 10px;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(
            135deg,
            $color-light-blue 0%,
            #2571d4 100%
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(48, 131, 233, 0.3);
          flex-shrink: 0;

          @include respond(laptop) {
            width: 45px;
            height: 45px;
            border-radius: 11px;
          }

          @include respond(tablet) {
            width: 42px;
            height: 42px;
            border-radius: 10px;
          }

          @include respond(phone) {
            width: 38px;
            height: 38px;
            border-radius: 9px;
          }

          svg {
            width: 30px;
            height: 30px;

            @include respond(laptop) {
              width: 23px;
              height: 23px;
            }

            @include respond(tablet) {
              width: 21px;
              height: 21px;
            }

            @include respond(phone) {
              width: 19px;
              height: 19px;
            }
          }
        }

        h2 {
          font-size: 24px;
          color: $color-dark-blue;
          white-space: nowrap;
          margin: 0;

          @include respond(tablet) {
            font-size: 22px;
          }

          @include respond(phone) {
            font-size: 18px;
          }
        }
      }
    }

    &_navigation {
      width: 60%;
      display: flex;
      justify-content: center;

      @include respond(tablet) {
        display: none;
      }

      @include respond(phone) {
        display: none;
      }

      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;

        li {
          margin: 0 $spacing-xs;
          display: flex;
          align-items: center;

          a {
            padding: 0 $spacing-sm;
            font-size: $font-size-p-desktop;
            font-weight: 500;
            text-transform: uppercase;
            text-decoration: none;
            color: $color-text-dark;
            transition: color $transition-speed-medium $transition-timing;
            display: inline-flex;
            align-items: center;

            &.disabled-link {
              cursor: not-allowed;
              opacity: 0.7;
            }

            &:hover {
              color: $color-light-blue;
            }
          }
        }
      }
    }

    &_cta {
      width: 20%;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;

      @include respond(tablet) {
        display: none;
      }

      @include respond(phone) {
        display: none;
      }
    }
  }
}

.menu-button {
  width: 40px;
  height: 40px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: background-color $transition-speed-medium $transition-timing;
  z-index: 3100;

  @include respond(tablet) {
    display: flex;
  }

  @include respond(phone) {
    display: flex;
  }

  &:hover {
    background-color: rgba($color-light-blue, 0.08);
  }

  span {
    position: relative;
    display: block;
    width: 22px;
    height: 2px;
    background-color: $color-dark-blue;
    transition: all $transition-speed-medium $transition-timing;

    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: $color-dark-blue;
      left: 0;
      transition: all $transition-speed-medium $transition-timing;
    }

    &:before {
      top: -6px;
    }
    &:after {
      bottom: -6px;
    }
  }

  &.active span {
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

.mobile-menu {
  position: fixed;
  inset: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  z-index: 2000;
  overflow-x: hidden;
  display: none;
  pointer-events: none;

  @include respond(tablet) {
    display: block;
  }

  @include respond(phone) {
    display: block;
  }

  &.open {
    pointer-events: auto;
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100%;
    background-color: $color-text-white;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform $transition-speed-medium $transition-timing;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: $spacing-md;
    padding-top: calc($spacing-md + 85px);
    box-sizing: border-box;

    @include respond(phone) {
      padding: $spacing-sm;
      padding-top: calc($spacing-md + 60px);
    }
  }

  &.open .mobile-menu__container {
    transform: translateX(0);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: min-content;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: $spacing-sm;
    margin-bottom: 4px;
    border-radius: $border-radius-sm;
    text-decoration: none;
    color: $color-dark-blue;
    font-size: $font-size-p-xl;
    font-weight: 500;
    position: relative;
    transition: background-color $transition-speed-medium $transition-timing;

    @include respond(phone) {
      padding: $spacing-xs;
      font-size: $font-size-p-lg;
    }

    &:hover {
      background-color: rgba($color-light-blue, 0.08);
      color: $color-light-blue;
    }
  }

  &__icon {
    margin-right: $spacing-xs;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;

    @include respond(phone) {
      font-size: 18px;
      width: 24px;
    }
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

    @include respond(phone) {
      font-size: 11px;
      padding: 2px 6px;
      right: $spacing-xs;
    }
  }

  &__footer {
    margin-top: auto;
    padding-top: $spacing-md;
    padding-bottom: 0;
    border-top: 1px solid rgba($color-dark-blue, 0.1);
    flex-shrink: 0;

    @include respond(phone) {
      padding-top: $spacing-sm;
    }
  }

  &__cta {
    @include primary-button;
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: $spacing-md;

    @include respond(phone) {
      margin-bottom: $spacing-sm;
    }
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: $spacing-md;

    @include respond(phone) {
      gap: $spacing-sm;
    }

    a {
      color: $color-dark-blue;
      font-size: $font-size-p-xl;
      transition: color $transition-speed-medium $transition-timing;

      @include respond(phone) {
        font-size: $font-size-p-lg;
      }

      &:hover {
        color: $color-light-blue;
      }
    }
  }
}
</style>
