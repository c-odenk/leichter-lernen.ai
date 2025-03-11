<template>
  <div class="landing-product">
    <div class="landing-product_row"></div>
  </div>
</template>

<script>
export default {
  name: "ProductSection",
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.landing-product {
  width: 100%;
  margin: $spacing-lg 0;
  // padding: 0 $spacing-sm;

  &_row {
    width: $width-desktop;
    margin: 0 auto;
    height: 600px;
    background-color: $color-dark-blue;
    border-radius: 15px;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }
  }
}
</style>
