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
      flex-direction: column;
      gap: calc($spacing-sm - 10px);
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
    color: $color-text-white;
    text-decoration: none;
    font-size: $font-size-p-xl;
    transition: color $transition-speed-medium $transition-timing;
    position: relative;

    &:hover {
      color: $color-light-blue-lighter;

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: $color-light-blue-lighter;
      transition: width $transition-speed-medium $transition-timing;
    }

    @include respond(phone) {
      font-size: $font-size-p-sm;
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
    font-size: calc($font-size-p-xl + 3px);
    transition: color $transition-speed-medium $transition-timing,
      transform $transition-speed-medium $transition-timing;

    &:hover {
      color: $color-light-blue-lighter;
    }

    @include respond(phone) {
      font-size: $font-size-p-lg;
    }
  }

  &__copyright {
    padding-top: $spacing-md;
    text-align: center;

    p {
      margin: 0;
      font-size: $font-size-p-lg;
      color: rgba(255, 255, 255, 0.7);

      @include respond(phone) {
        font-size: calc(#{$font-size-p-sm} - 2px);
      }
    }
  }
}
</style>
