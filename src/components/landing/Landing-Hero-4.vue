<template>
  <section class="landing-hero">
    <div class="landing-hero_container">
      <div class="landing-hero_container_col-1">
        <h1>
          Effizienter <span class="highlight">lernen mit KI ✨</span> –
          schneller verstehen, besser merken!
        </h1>
        <p>
          Automatische Zusammenfassungen, smarte Lernkarten und ein
          intelligenter KI-Tutor für all deine Fragen.
          <b>Lerne schneller, effektiver und ohne Umwege!</b>
        </p>

        <div class="link-group">
          <LinkButtonBlue to="/login">
            Jetzt ausprobieren <i class="fa-solid fa-arrow-right"></i>
          </LinkButtonBlue>
          <router-link to="/produkt" class="text-link">
            Mehr erfahren <i class="fa-regular fa-paper-plane"></i>
          </router-link>
        </div>
      </div>

      <div class="landing-hero_container_col-2">
        <!-- Geometrische Akzente -->
        <div class="geo-accent arc-top-left"></div>
        <div class="geo-accent quarter-circle-top-right"></div>
        <div class="geo-accent wave-line"></div>
        <div class="geo-accent small-circle"></div>
        <div class="geo-accent small-rect"></div>
        <div class="geo-accent arc-bottom-left"></div>

        <div class="info-badge">
          <div class="badge-icon">
            <i class="fa-solid fa-users"></i>
          </div>
          <div class="badge-content">
            <p class="badge-number">X</p>
            <p class="badge-text">Aktive Nutzer</p>
          </div>
        </div>

        <img
          src="@/assets/hero-wallpaper.png"
          alt="Lernplattform Vorschau"
          class="hero-image"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.landing-hero {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0 calc($spacing-lg + 100px) 0;

  @include respond(laptop) {
    margin: calc($spacing-lg + 45px) auto;
  }

  @include respond(tablet) {
    margin: calc($spacing-lg + 80px) auto calc($spacing-lg + 80px) auto;
  }

  @include respond(phone) {
    margin: calc($spacing-lg + 100px) auto calc($spacing-lg + 60px) auto;
  }

  &_container {
    @include content-container;
    @include flex-between;

    @include respond(tablet) {
      flex-direction: column;
      gap: $spacing-md;
    }

    @include respond(phone) {
      flex-direction: column;
      gap: 0;
    }

    &_col-1 {
      width: 45%;

      @include respond(tablet) {
        width: 90%;
        margin: 0 auto;
        text-align: center;
      }

      @include respond(phone) {
        width: 100%;
        margin: 0;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0;
        font-size: 35px;
        line-height: 1.1;
        color: $color-dark-blue;

        @include respond(laptop) {
          font-size: 28px;
        }

        @include respond(tablet) {
          font-size: 32px;
        }

        @include respond(phone) {
          font-size: 26px;
          line-height: 1.35;
        }

        .highlight {
          color: $color-light-blue;
        }
      }

      p {
        margin: $spacing-md 0 calc($spacing-md + 10px) 0;
        font-size: $font-size-p-desktop;
        letter-spacing: $letter-spacing-p-desktop;
        line-height: $line-height-p-desktop;
        color: $color-text-dark;

        @include respond(laptop) {
          margin: calc($spacing-xs + 5px) 0 calc($spacing-xs + 10px) 0;
          font-size: $font-size-p-laptop;
          letter-spacing: $letter-spacing-p-laptop;
          line-height: $line-height-p-laptop;
        }

        @include respond(tablet) {
          font-size: $font-size-p-tablet;
          letter-spacing: $letter-spacing-p-tablet;
          line-height: $line-height-p-tablet;
          margin: $spacing-sm 0 $spacing-md 0;
        }

        @include respond(phone) {
          font-size: $font-size-p-phone;
          letter-spacing: $letter-spacing-p-phone;
          line-height: $line-height-p-phone;
          margin: $spacing-sm 0 $spacing-md 0;
        }
      }

      .link-group {
        display: flex;
        gap: $spacing-sm;
        flex-wrap: wrap;
        align-items: center;

        @include respond(tablet) {
          justify-content: center;
        }

        @include respond(phone) {
          flex-direction: column;
          width: 100%;
          gap: $spacing-xs;
        }

        .text-link {
          margin: 0 0 0 10px;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          font-size: $font-size-p-desktop;
          letter-spacing: $letter-spacing-p-desktop;
          font-weight: 600;
          color: $color-dark-blue;

          @include respond(laptop) {
            font-size: $font-size-p-laptop;
            letter-spacing: $letter-spacing-p-laptop;
          }

          @include respond(tablet) {
            font-size: $font-size-p-tablet;
            letter-spacing: $letter-spacing-p-tablet;
          }

          @include respond(phone) {
            font-size: $font-size-p-phone;
            letter-spacing: $letter-spacing-p-phone;
            margin: 0;
          }

          i {
            font-size: 16px;
            margin: 0 0 0 10px;

            @include respond(laptop) {
              font-size: 15px;
            }

            @include respond(tablet) {
              font-size: 14px;
            }

            @include respond(phone) {
              font-size: 13px;
              margin: 0 0 0 8px;
            }
          }
        }
      }
    }

    &_col-2 {
      width: 51%;
      height: 650px;
      background-color: $color-dark-blue;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1200'%3E%3Crect width='800' height='1200' fill='%23172b4d' /%3E%3Cg opacity='0.25'%3E%3Cpath d='M0 200 Q250 270, 450 230 T 800 270' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M0 240 Q280 310, 420 270 T 800 310' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M0 450 Q320 400, 500 480 T 800 530' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M0 490 Q290 440, 530 520 T 800 570' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3Cg opacity='0.25'%3E%3Cpath d='M800 750 Q600 820, 400 780 T 0 820' fill='none' stroke='%233083e9' stroke-width='1.2' /%3E%3Cpath d='M800 790 Q570 860, 450 820 T 0 860' fill='none' stroke='%233083e9' stroke-width='1.1' /%3E%3C/g%3E%3Cg opacity='0.18'%3E%3Cpath d='M800 980 Q600 1040, 380 1000 T 0 1050' fill='none' stroke='%23ffffff' stroke-width='0.8' /%3E%3Cpath d='M800 1020 Q620 1080, 350 1040 T 0 1090' fill='none' stroke='%23ffffff' stroke-width='0.7' /%3E%3C/g%3E%3C/svg%3E");
      background-size: cover;
      border-radius: $border-radius-lg;
      position: relative;
      overflow: hidden;

      @include respond(laptop) {
        height: 520px;
      }

      @include respond(tablet) {
        display: none;
      }

      @include respond(phone) {
        display: none;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle at center,
          rgba(48, 131, 233, 0.015) 0%,
          rgba(23, 43, 77, 0.12) 100%
        );
        z-index: 1;
      }

      // Geometrische Akzente
      .geo-accent {
        position: absolute;
        z-index: 1;

        &.arc-top-left {
          top: 40px;
          left: 40px;
          width: 100px;
          height: 100px;
          border: 2.5px solid rgba(255, 255, 255, 0.4);
          border-bottom: none;
          border-right: none;
          border-radius: 100%;
          transform: rotate(-5deg);

          @include respond(laptop) {
            width: 85px;
            height: 85px;
            top: 30px;
            left: 30px;
          }
        }

        &.quarter-circle-top-right {
          top: 0;
          right: 0;
          width: 160px;
          height: 160px;
          background: linear-gradient(
            135deg,
            $color-light-blue 0%,
            rgba(48, 131, 233, 0.25)
          );
          border-radius: 0 0 0 100%;

          @include respond(laptop) {
            width: 130px;
            height: 130px;
          }
        }

        &.wave-line {
          top: 50%;
          right: 30px;
          width: 120px;
          height: 60px;
          border: 2.5px solid rgba(255, 255, 255, 0.35);
          border-top: none;
          border-left: none;
          border-right: none;
          border-radius: 50%;
          transform: translateY(-50%) rotate(10deg);

          @include respond(laptop) {
            width: 100px;
            height: 50px;
            right: 25px;
          }
        }

        &.small-circle {
          top: 160px;
          right: 50px;
          width: 35px;
          height: 35px;
          background-color: rgba(255, 255, 255, 0.25);
          border-radius: 50%;

          @include respond(laptop) {
            width: 28px;
            height: 28px;
            top: 130px;
            right: 40px;
          }
        }

        &.small-rect {
          top: 280px;
          left: 30px;
          width: 50px;
          height: 50px;
          background-color: rgba(48, 131, 233, 0.25);
          border-radius: 10px;
          transform: rotate(20deg);

          @include respond(laptop) {
            width: 40px;
            height: 40px;
            top: 220px;
            left: 25px;
          }
        }

        &.arc-bottom-left {
          bottom: 280px;
          left: 35px;
          width: 80px;
          height: 80px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top: none;
          border-right: none;
          border-radius: 100%;
          transform: rotate(5deg);

          @include respond(laptop) {
            width: 70px;
            height: 70px;
            bottom: 230px;
            left: 28px;
          }
        }
      }

      // Info-Badge unten links
      .info-badge {
        position: absolute;
        bottom: 40px;
        left: 30px;
        background-color: white;
        border-radius: 16px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 3;

        @include respond(laptop) {
          bottom: 30px;
          left: 20px;
          padding: 12px 16px;
          gap: 10px;
        }

        .badge-icon {
          width: 45px;
          height: 45px;
          background-color: $color-light-blue;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          @include respond(laptop) {
            width: 38px;
            height: 38px;
          }

          i {
            color: white;
            font-size: 20px;

            @include respond(laptop) {
              font-size: 18px;
            }
          }
        }

        .badge-content {
          .badge-number {
            margin: 0;
            padding: 0;
            font-size: 22px;
            font-weight: 700;
            color: $color-dark-blue;
            line-height: 1;

            @include respond(laptop) {
              font-size: 18px;
            }
          }

          .badge-text {
            margin: 4px 0 0 0;
            padding: 0;
            font-size: 13px;
            color: #6b7280;
            line-height: 1;

            @include respond(laptop) {
              font-size: 11px;
            }
          }
        }
      }

      .hero-image {
        position: absolute;
        bottom: 0;
        left: 55%;
        transform: translateX(-50%);
        width: 640px;
        height: auto;
        object-fit: cover;
        z-index: 2;

        @include respond(laptop) {
          width: 520px;
        }
      }
    }
  }
}
</style>
