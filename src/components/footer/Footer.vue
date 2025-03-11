<template>
  <footer class="footer">
    <div class="footer_row">
      <p>Copyright &copy; 2025 leichter-lernen.ai. Alle Rechte vorbehalten.</p>
      <ul>
        <li><router-link to="/"> AGB </router-link></li>
        <li><router-link to="/impressum"> Impressum </router-link></li>
      </ul>
    </div>
    <div class="footer_row">
      <div class="social-icons">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href="https://www.xing.com/" target="_blank" aria-label="Xing">
          <i class="fa-brands fa-xing"></i>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          aria-label="Instagram"
        >
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/" target="_blank" aria-label="TikTok">
          <i class="fa-brands fa-tiktok"></i>
        </a>
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
@import "@/variables/variables.scss";

.footer {
  @include content-container;
  margin-bottom: 0;
  padding: 40px 35px 30px 35px;
  background-color: rgb(33, 33, 33);
  border-radius: $border-radius-lg $border-radius-lg 0 0;
  // padding: $spacing-md $spacing-md $spacing-sm $spacing-md;
  // background-color: $color-dark-blue-darker;

  @include respond(tablet) {
    padding: $spacing-sm;
  }

  @include respond(phone) {
    padding: $spacing-sm $spacing-xs;
  }

  &_row {
    width: 100%;
    @include flex-between;
    box-sizing: border-box;
    margin-bottom: $spacing-sm;

    @include respond(tablet) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &:last-child {
      margin-bottom: 0;
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;

      @include respond(tablet) {
        margin-bottom: $spacing-xs;
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }

    & ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: $spacing-md;

      @include respond(tablet) {
        margin-top: $spacing-xs;
      }

      @include respond(phone) {
        gap: $spacing-sm;
      }
    }

    & li {
      display: inline-block;
    }

    & a {
      padding: 0;
      text-decoration: none;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-white;
      transition: color $transition-speed-medium $transition-timing;

      @include respond(tablet) {
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }

    .social-icons {
      display: flex;
      gap: $spacing-sm;
      margin: $spacing-xs 0 0 0;

      display: none;

      @include respond(tablet) {
        margin-top: $spacing-sm;
      }
    }

    .social-icons a {
      margin: 0;
      color: $color-dark-blue-lighter;
      font-size: 24px;
      transition: color $transition-speed-medium $transition-timing;

      @include respond(phone) {
        font-size: 20px;
      }
    }
  }
}
</style>
