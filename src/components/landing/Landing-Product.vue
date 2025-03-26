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
@use "../../variables/variables.scss" as *;

.landing-product {
  width: 100%;
  margin: calc($spacing-lg + 50px) 0;

  @include respond(laptop) {
    margin: 10px 0 $spacing-md 0;
  }

  @include respond(tablet) {
    margin: $spacing-md 0;
  }

  @include respond(phone) {
  }

  &_row {
    @include content-container;
    margin: 0 auto;
    height: 600px;
    background-color: $color-dark-blue;
    border-radius: 15px;

    @include respond(laptop) {
      height: 500px;
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }
  }
}
</style>
