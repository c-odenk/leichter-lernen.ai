<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__nav">
          <router-link to="/" class="footer__link">Home</router-link>
          <router-link to="/terms" class="footer__link">AGBs</router-link>
          <router-link to="/imprint" class="footer__link"
            >Impressum</router-link
          >
        </div>
        <div class="footer__social">
          <a
            href="https://www.xing.com/"
            target="_blank"
            aria-label="Xing"
            class="footer__social-icon"
          >
            <i class="fa-brands fa-xing"></i>
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            aria-label="LinkedIn"
            class="footer__social-icon"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            aria-label="Instagram"
            class="footer__social-icon"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            aria-label="TikTok"
            class="footer__social-icon"
          >
            <i class="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>
      <div class="footer__copyright">
        <p>
          Copyright &copy; 2025 leichter-lernen.ai. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.footer {
  width: 100%;
  margin: 0;
  padding: calc($spacing-lg + 10px) 0;
  background-color: $color-dark-blue;
  color: $color-text-white;

  @include respond(laptop) {
    margin: 0;
  }

  @include respond(tablet) {
    margin: 0;
  }

  @include respond(phone) {
    margin: 0;
    padding: calc($spacing-md + 10px) 0;
  }

  &__container {
    @include content-container;
  }

  &__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @include respond(tablet) {
      gap: calc($spacing-sm - 10px);
    }

    @include respond(phone) {
      gap: calc($spacing-sm) 0;
      flex-direction: column;
    }
  }

  &__nav {
    display: flex;
    gap: $spacing-md;

    @include respond(phone) {
      gap: $spacing-sm;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__link {
    text-decoration: none;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;
    color: $color-text-white;
    transition: color $transition-speed-medium $transition-timing;
    position: relative;

    @include respond(laptop) {
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
      line-height: $line-height-p-laptop;
    }

    @include respond(tablet) {
      font-size: $font-size-p-tablet;
      letter-spacing: $letter-spacing-p-tablet;
      line-height: $line-height-p-tablet;
    }

    @include respond(phone) {
      font-size: $font-size-p-phone;
      letter-spacing: $letter-spacing-p-phone;
      line-height: $line-height-p-phone;
    }

    &:hover {
      color: $color-light-blue-lighter;
    }
  }

  &__social {
    display: flex;
    gap: $spacing-sm;

    @include respond(tablet) {
      margin-top: $spacing-xs;
    }
  }

  &__social-icon {
    color: $color-text-white;
    font-size: calc($font-size-p-desktop + 5px);

    &:hover {
      color: $color-light-blue-lighter;
    }

    @include respond(laptop) {
      font-size: calc($font-size-p-laptop + 5px);
    }

    @include respond(tablet) {
      font-size: calc($font-size-p-tablet + 5px);
    }

    @include respond(phone) {
      font-size: calc($font-size-p-phone + 5px);
    }
  }

  &__copyright {
    padding-top: $spacing-md;
    text-align: center;

    p {
      margin: 0;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      line-height: $line-height-p-desktop;
      color: rgba(255, 255, 255, 0.7);

      @include respond(laptop) {
        font-size: $font-size-p-laptop;
        letter-spacing: $letter-spacing-p-laptop;
        line-height: $line-height-p-laptop;
      }

      @include respond(tablet) {
        font-size: $font-size-p-tablet;
        letter-spacing: $letter-spacing-p-tablet;
        line-height: $line-height-p-tablet;
      }

      @include respond(phone) {
        font-size: $font-size-p-phone;
        letter-spacing: $letter-spacing-p-phone;
        line-height: $line-height-p-phone;
      }
    }
  }
}
</style>
