<template>
  <section class="landing-hero">
    <!-- Gradient Background Animation -->
    <div class="gradient-background">
      <div class="gradient-animation"></div>
    </div>

    <div class="landing-hero_container">
      <div class="welcome-badge">✨ Willkommen bei deinem KI-Tutor</div>

      <h1>
        Effizienter <span class="highlight">lernen mit KI</span> – schneller
        verstehen, besser merken!
      </h1>

      <p>
        Automatische Zusammenfassungen, smarte Lernkarten und ein intelligenter
        KI-Tutor für all deine Fragen.
        <b>Lerne schneller, effektiver und ohne Umwege!</b>
      </p>

      <div class="button-group">
        <LinkButtonBlue text="Jetzt ausprobieren" to="/login" />
        <LinkButtonWhite text="Mehr erfahren" to="/produkt" />
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

*,
*::before,
*::after {
  box-sizing: border-box;
}

.landing-hero {
  width: 100%;
  height: 85vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: calc($spacing-xl + 75px) 0;
  overflow: hidden;

  @include respond(laptop) {
    padding: calc($spacing-xl - 30px) 0 $spacing-lg 0;
    min-height: 70vh;
  }

  @include respond(tablet) {
    padding: calc($spacing-xl + 20px) 0;
    min-height: 60vh;
  }

  .gradient-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;

    @include respond(tablet) {
      width: 100%;
      height: 100%;
    }
  }

  .gradient-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;

    /* FARBVERLAUF: Opazität deutlich erhöht für stärkere Leuchtkraft */
    background: linear-gradient(
      45deg,
      rgba(30, 58, 138, 0.5) 0%,
      rgba(37, 99, 235, 0.7) 8%,
      rgba(59, 130, 246, 0.75) 16%,
      rgba(96, 165, 250, 0.65) 24%,
      rgba(147, 197, 253, 0.58) 32%,
      rgba(37, 99, 235, 0.7) 40%,
      rgba(59, 130, 246, 0.67) 48%,
      rgba(96, 165, 250, 0.6) 56%,
      rgba(147, 197, 253, 0.55) 64%,
      rgba(37, 99, 235, 0.65) 72%,
      rgba(59, 130, 246, 0.6) 80%,
      rgba(30, 58, 138, 0.55) 88%,
      rgba(96, 165, 250, 0.55) 94%,
      rgba(30, 58, 138, 0.45) 100%
    );
    background-size: 400% 400%;
    animation: gradientShift 8s ease-in-out infinite; /* Auf 8s verkürzt für bessere Sichtbarkeit */
    filter: blur(120px); /* Leicht erhöhter Blur */
    opacity: 1;

    mask-image: radial-gradient(
      ellipse 48% 35% at 50% 50%,
      black 0%,
      rgba(0, 0, 0, 0.92) 8%,
      rgba(0, 0, 0, 0.8) 16%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.4) 35%,
      rgba(0, 0, 0, 0.22) 45%,
      rgba(0, 0, 0, 0.1) 55%,
      rgba(0, 0, 0, 0.04) 65%,
      rgba(0, 0, 0, 0.012) 75%,
      rgba(0, 0, 0, 0.003) 85%,
      transparent 95%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 48% 35% at 50% 50%,
      black 0%,
      rgba(0, 0, 0, 0.92) 8%,
      rgba(0, 0, 0, 0.8) 16%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.4) 35%,
      rgba(0, 0, 0, 0.22) 45%,
      rgba(0, 0, 0, 0.1) 55%,
      rgba(0, 0, 0, 0.04) 65%,
      rgba(0, 0, 0, 0.012) 75%,
      rgba(0, 0, 0, 0.003) 85%,
      transparent 95%
    );

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        -45deg,
        rgba(37, 99, 235, 0.7) 0%,
        rgba(59, 130, 246, 0.75) 20%,
        rgba(96, 165, 250, 0.63) 40%,
        rgba(147, 197, 253, 0.57) 60%,
        rgba(59, 130, 246, 0.63) 80%,
        rgba(37, 99, 235, 0.6) 100%
      );
      background-size: 400% 400%;
      animation: gradientShift2 7s ease-in-out infinite reverse; /* Auf 7s verkürzt */
      mask-image: radial-gradient(
        ellipse 53% 37% at 50% 50%,
        black 0%,
        rgba(0, 0, 0, 0.8) 12%,
        rgba(0, 0, 0, 0.55) 28%,
        rgba(0, 0, 0, 0.3) 45%,
        rgba(0, 0, 0, 0.13) 60%,
        rgba(0, 0, 0, 0.04) 75%,
        rgba(0, 0, 0, 0.008) 85%,
        transparent 95%
      );
      -webkit-mask-image: radial-gradient(
        ellipse 53% 37% at 50% 50%,
        black 0%,
        rgba(0, 0, 0, 0.8) 12%,
        rgba(0, 0, 0, 0.55) 28%,
        rgba(0, 0, 0, 0.3) 45%,
        rgba(0, 0, 0, 0.13) 60%,
        rgba(0, 0, 0, 0.04) 75%,
        rgba(0, 0, 0, 0.008) 85%,
        transparent 95%
      );
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
          circle at 30% 50%,
          rgba(37, 99, 235, 0.75) 0%,
          rgba(37, 99, 235, 0.45) 22%,
          rgba(37, 99, 235, 0.2) 40%,
          transparent 60%
        ),
        radial-gradient(
          circle at 70% 50%,
          rgba(96, 165, 250, 0.78) 0%,
          rgba(96, 165, 250, 0.45) 22%,
          rgba(96, 165, 250, 0.2) 40%,
          transparent 60%
        ),
        radial-gradient(
          circle at 50% 80%,
          rgba(147, 197, 253, 0.72) 0%,
          rgba(147, 197, 253, 0.4) 18%,
          rgba(147, 197, 253, 0.17) 35%,
          transparent 55%
        );
      animation: radialMove 9s ease-in-out infinite; /* Auf 9s verkürzt */
      mask-image: radial-gradient(
        ellipse 56% 39% at 50% 50%,
        black 0%,
        rgba(0, 0, 0, 0.6) 18%,
        rgba(0, 0, 0, 0.35) 35%,
        rgba(0, 0, 0, 0.15) 52%,
        rgba(0, 0, 0, 0.05) 68%,
        rgba(0, 0, 0, 0.012) 82%,
        transparent 95%
      );
      -webkit-mask-image: radial-gradient(
        ellipse 56% 39% at 50% 50%,
        black 0%,
        rgba(0, 0, 0, 0.6) 18%,
        rgba(0, 0, 0, 0.35) 35%,
        rgba(0, 0, 0, 0.15) 52%,
        rgba(0, 0, 0, 0.05) 68%,
        rgba(0, 0, 0, 0.012) 82%,
        transparent 95%
      );
    }
  }

  /* KEYFRAMES: Bleiben unverändert, da die Bewegung an sich funktioniert hat, nur die Geschwindigkeit wurde oben angepasst. */
  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes gradientShift2 {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes radialMove {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    20% {
      transform: translate(25%, -18%) scale(1.15);
    }
    40% {
      transform: translate(-15%, 22%) scale(0.88);
    }
    60% {
      transform: translate(18%, 15%) scale(1.1);
    }
    80% {
      transform: translate(-22%, -12%) scale(0.92);
    }
  }

  &_container {
    //  @include content-container;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
    flex-direction: column;

    @include respond(tablet) {
      gap: $spacing-md;
    }

    @include respond(tablet) {
      width: 90%;
      margin: 0 auto;
    }

    @include respond(phone) {
      width: 100%;
    }

    & .welcome-badge {
      display: inline-block;
      background: #ffffff;
      padding: 8px 20px;
      // border: 1.5px solid #000000;
      border-radius: 100px;
      font-size: $font-size-p-md;
      font-weight: 500;
      color: $color-text-dark;
      margin-bottom: $spacing-md;
      letter-spacing: $letter-spacing;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    h1 {
      margin: 0 0 $spacing-md 0;
      padding: 0;
      font-size: 60px;
      line-height: 1.1;
      letter-spacing: $letter-spacing;
      color: $color-text-dark;
      font-weight: 700;

      .highlight {
        color: $color-light-blue;
      }

      @include respond(laptop) {
        font-size: 40px;
      }

      @include respond(phone) {
        font-size: 32px;
      }
    }

    p {
      max-width: 700px;
      margin: 0 auto $spacing-lg auto;
      font-size: $font-size-p-xl;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
      color: $color-text-dark;

      b {
        font-weight: 600;
      }

      @include respond(laptop) {
        margin-bottom: $spacing-md;
        font-size: $font-size-p-lg;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }

    .button-group {
      display: flex;
      gap: $spacing-sm;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;

      @include respond(phone) {
        flex-direction: column;
        width: 100%;
      }
    }
  }
}
</style>
