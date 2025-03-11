<template>
  <section class="benefits">
    <div class="benefits__header">
      <h2 class="benefits__title">⚡ {{ heading }}</h2>
      <p class="benefits__subtitle">{{ subheading }}</p>
    </div>

    <div class="benefits__grid">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefits__card"
        :style="{ backgroundImage: `url(${benefit.image})` }"
      >
        <div class="benefits__content">
          <h3 class="benefits__card-title">{{ benefit.title }}</h3>
          <p class="benefits__card-text">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",
  data() {
    return {
      heading: "Lerne effizienter mit KI-Unterstützung",
      subheading:
        "Wir helfen dir, schneller zu verstehen, gezielt zu wiederholen und dein Wissen aktiv zu festigen. So lernst du nicht nur effektiver, sondern auch zeitsparender.",
      benefits: [
        {
          title: "🚀 Schnelle Zusammenfassungen in wenigen Sekunden",
          description:
            "Lade deine Vorlesungsskripte hoch und erhalte prägnante Zusammenfassungen. Erfasse die wichtigsten Inhalte schneller und spare wertvolle Lernzeit.",
          image: require("@/assets/studying.jpg"),
        },
        {
          title: "🎯 Interaktive Lernkarten mit smarter Wiederholung",
          description:
            "Unsere KI generiert automatisch Lernkarten und nutzt die Spaced Repetition Methode. So prägst du dir Wissen effizient ein und erinnerst dich langfristig.",
          image: require("@/assets/examination.jpeg"),
        },
        {
          title: "💡 Dein KI-Tutor beantwortet Fragen in Echtzeit",
          description:
            "Stelle Fragen zu deinem Lernstoff und erhalte direkt fundierte Antworten. So erkennst du Wissenslücken und vertiefst dein Verständnis spielend leicht.",
          image: require("@/assets/tutoring.jpg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.benefits {
  width: 100%;
  margin: $spacing-xl 0;

  &__header {
    @include content-container;
    margin-bottom: $spacing-lg;
  }

  &__title {
    margin: 0 0 $spacing-xs;
    padding: 0;
    font-size: $font-size-h2-lg;

    @include respond(tablet) {
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      font-size: $font-size-h2-sm;
    }
  }

  &__subtitle {
    width: 45%;
    margin: 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;

    @include respond(tablet) {
      width: 70%;
      @include text-content-responsive;
    }

    @include respond(phone) {
      width: 100%;
    }
  }

  &__grid {
    @include content-container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__card {
    width: 32%;
    height: 500px;
    padding: $spacing-md;
    border-radius: $border-radius-lg;
    box-sizing: border-box;
    position: relative;
    color: $color-text-white;
    display: flex;
    align-items: flex-end;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: $shadow-md;
    transition: box-shadow $transition-speed-medium $transition-timing;

    @include respond(tablet) {
      width: 48%;
      margin-bottom: $spacing-md;
      height: 450px;
    }

    @include respond(phone) {
      width: 100%;
      height: 400px;
    }
  }

  &__content {
    background: rgba(0, 0, 0, 0.7);
    padding: $spacing-md $spacing-sm;
    border-radius: $border-radius-md;
    width: 100%;
    text-align: left;
  }

  &__card-title {
    margin: 0;
    padding: 0;
    font-size: $font-size-h3-lg;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }

  &__card-text {
    margin: $spacing-sm 0 $spacing-xs;
    padding: 0;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-size: calc($font-size-p-lg - 2px);

    @include text-content-responsive;
  }
}
</style>
