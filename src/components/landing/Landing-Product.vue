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

  @include respond(tablet) {
    margin: $spacing-md 0;
  }

  @include respond(phone) {
    margin: 0;
  }

  &_row {
    @include content-container;
    margin: 0 auto;
    height: 600px;
    background-color: $color-dark-blue;
    border-radius: 15px;

    @include respond(laptop) {
      height: 400px;
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }
  }
}
</style>
