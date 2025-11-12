<template>
  <section class="benefits">
    <!-- Wiederverwendbare Überschrift-Komponente -->
    <SectionHeading :heading="heading" :subheading="subheading" />

    <div class="benefits_grid">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefit_card"
      >
        <div class="benefit_content">
          <h3>{{ benefit.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeading from "@/components/headings/Section-Heading.vue";

export default {
  name: "BenefitsSection",
  components: {
    SectionHeading,
  },

  data() {
    return {
      heading: "🚀 Lorem Ipsum!",
      subheading:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",

      benefits: [
        {
          title: "XX: Statistik 1",
        },
        {
          title: "XX: Statistik 2",
        },
        {
          title: "XX: Statistik 3",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

*,
*::before,
*::after {
  box-sizing: border-box;
}

.benefits {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  display: none;

  @include respond(laptop) {
    margin: calc($spacing-lg + 25px) 0;
  }

  @include respond(tablet) {
    margin: $spacing-lg 0;
  }

  @include respond(phone) {
    margin: $spacing-md 0;
  }

  &_grid {
    @include content-container;
    display: flex;
    // gap: 7%;
    align-items: flex-start;

    @include respond(laptop) {
      flex-direction: column;
      gap: $spacing-md;
    }
  }

  .benefit_card {
    flex: 1;
    margin: 0;
    padding: 0;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    text-align: center;

    &:not(:last-child) {
      border-right: 2px solid $color-dark-blue;
    }

    .benefit_content {
      flex: 1;

      h3 {
        margin: 0;
        padding: 90px 0;
        font-size: $font-size-h3-lg;
        color: $color-dark-blue;
        font-weight: 700;

        @include respond(laptop) {
          font-size: calc($font-size-h3-lg - 0.05rem);
        }

        @include respond(tablet) {
          font-size: $font-size-h3-md;
        }

        @include respond(phone) {
          font-size: $font-size-h3-sm;
        }
      }
    }
  }
}
</style>
