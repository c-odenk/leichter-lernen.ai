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
@import "@/variables/Variables.scss";

.footer {
  width: $width-desktop;
  margin: 0 auto;
  padding: 40px 35px 30px 35px;
  border-radius: 15px 15px 0 0;
  background-color: rgb(33, 33, 33);

  @include respond(phone) {
  }

  &_row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: #fff;
    }

    & ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;

      @include respond(phone) {
      }
    }

    & a {
      margin: 0 0 0 30px;
      padding: 0;
      text-decoration: none;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: #fff;
    }

    .social-icons {
      display: flex;
      gap: 20px;
      margin: 15px 0 0 0;
      display: none;
    }

    .social-icons a {
      margin: 0;
      color: #999;
      font-size: 24px;
      transition: color 0.3s ease-in-out;
    }

    .social-icons a:hover {
      color: #0077b5;
    }
  }
}
</style>
