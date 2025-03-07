<template>
  <header>
    <div class="header">
      <div class="header_row">
        <div class="header_row_logo">
          <router-link to="/">
            <img src="@/assets/leichter-lernen-logo.png" />
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
                to="/"
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
    return {};
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
@import "@/variables/Variables.scss";

.header {
  width: 100%;
  padding: 30px 0px;

  @include respond(laptop) {
  }

  @include respond(phone) {
  }

  &_row {
    width: $width-desktop;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    &_logo {
      & a {
        display: flex;
        flex-direction: row;
        text-decoration: none;
        align-items: center;
        color: #000;

        & img {
          height: 100px;
          width: auto;
        }

        & h2 {
        }
      }
    }

    &_navigation {
      @include respond(phone) {
        width: 100%;
      }

      & ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0;
        padding: 0;

        @include respond(phone) {
          flex-direction: column;
          padding: 50px 0 25px 0;
        }

        & li {
          @include respond(phone) {
            padding: 5px 5px;
          }

          & a {
            padding: 0px 25px;
            font-size: $font-size-p-lg;
            font-weight: 500;
            line-height: $line-height;
            letter-spacing: $letter-spacing;
            text-decoration: none;
            text-transform: uppercase;
            color: #000;

            @include respond(tablet) {
              padding: 0px 10px;
            }

            @include respond(phone) {
              padding: 100px 10px;
            }

            &.disabled-link {
              // pointer-events: none;
              cursor: not-allowed;
            }

            &:hover {
            }
          }
        }
      }
    }

    &_cta {
      & a {
        padding: 12px 30px;
        font-size: calc(#{$font-size-p-lg} - 3px);
        font-weight: 500;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
        text-decoration: none;
        text-transform: uppercase;
        border-radius: 7.5px;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

        @include respond(tablet) {
        }

        @include respond(phone) {
        }

        &:hover {
        }
      }
      & .img-platzhalter {
        width: 200px;
        height: 40px;
        background-color: red;
      }
    }
  }
}
</style>
