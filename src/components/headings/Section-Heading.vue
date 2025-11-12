<template>
  <div class="section-heading">
    <h2>{{ heading }}</h2>
    <p>{{ subheading }}</p>
  </div>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      default: "",
    },
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

.section-heading {
  @include content-container;
  margin-bottom: $spacing-lg;

  @include respond(laptop) {
    margin-bottom: $spacing-md;
  }

  @include respond(tablet) {
    margin-bottom: $spacing-sm;
  }

  @include respond(phone) {
    margin-bottom: $spacing-sm;
  }

  & h2 {
    margin: 0 0 calc($spacing-xs) 0;
    padding: 0;
    text-align: center;
    font-size: $font-size-h2-lg;

    @include respond(laptop) {
      font-size: calc($font-size-h2-lg - 0.1rem);
    }

    @include respond(tablet) {
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      font-size: $font-size-h2-sm;
    }
  }

  & p {
    width: 60%;
    margin: 0 auto;
    padding: 0;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;
    text-align: center;

    @include respond(laptop) {
      width: 70%;
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
      line-height: $line-height-p-laptop;
    }

    @include respond(tablet) {
      width: 85%;
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
      line-height: $line-height-p-laptop;
    }

    @include respond(phone) {
      width: 95%;
      margin-bottom: $spacing-md;
      font-size: $font-size-p-phone;
      letter-spacing: $letter-spacing-p-phone;
      line-height: $line-height-p-phone;
    }
  }
}
</style>
