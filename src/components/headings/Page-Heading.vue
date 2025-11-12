<template>
  <div class="heading-section">
    <div class="heading-section_row">
      <h2>{{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeading",
  props: {
    heading: {
      type: String,
      default: "HEADING",
    },
    subheading: {
      type: String,
      default: "subheading",
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.heading-section {
  width: 100%;

  &_row {
    @include content-container;
    margin: $spacing-xl auto;
    text-align: center;

    @include respond(laptop) {
      margin: calc($spacing-lg + 55px) auto calc($spacing-lg + 75px) auto;
    }

    @include respond(tablet) {
      margin: calc($spacing-lg + 35px) auto calc($spacing-lg + 50px) auto;
    }

    @include respond(phone) {
      margin: calc($spacing-lg + 35px) auto calc($spacing-lg + 30px) auto;
    }

    & h2 {
      font-size: $font-size-h1-lg;
      margin: 0 0 $spacing-xs 0;
      color: $color-dark-blue;
      line-height: $line-height;

      @include respond(laptop) {
      }

      @include respond(tablet) {
        font-size: $font-size-h1-md;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
      }

      @include respond(phone) {
        font-size: $font-size-h1-sm;
        width: 100%;
      }
    }

    & p {
      width: 60%;
      min-height: 60px;
      margin: 0 auto;
      padding: 0;
      font-size: $font-size-p-desktop;
      letter-spacing: $letter-spacing-p-desktop;
      line-height: $line-height-p-desktop;

      @include respond(laptop) {
        height: auto;
        font-size: $font-size-p-laptop;
        letter-spacing: $letter-spacing-p-laptop;
        line-height: $line-height-p-laptop;
      }

      @include respond(tablet) {
        width: 80%;
        font-size: $font-size-p-tablet;
        letter-spacing: $letter-spacing-p-tablet;
        line-height: $line-height-p-tablet;
      }

      @include respond(phone) {
        width: 95%;
        font-size: $font-size-p-phone;
        letter-spacing: $letter-spacing-p-phone;
        line-height: $line-height-p-phone;
      }
    }
  }
}
</style>
