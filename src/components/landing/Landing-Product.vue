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
  margin: 100px 0;

  &_row {
    width: $width-desktop;
    margin: 0 auto;
    height: 600px;
    background-color: $color-orange;

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }
  }
}
</style>
