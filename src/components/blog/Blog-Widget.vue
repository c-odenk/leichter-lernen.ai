<template>
  <div class="blog-widget">
    <h2>{{ heading }}</h2>
    <p>{{ paragraph }}</p>
    <!--
      <h2>Top Beiträge</h2>
      <ul>
        <li><router-link to="/#"> #1: Beitrag 1 </router-link></li>
        <li><router-link to="/#"> #2: Beitrag 2 </router-link></li>
        <li><router-link to="/#"> #3: Beitrag 3 </router-link></li>
      </ul>
    -->
  </div>
</template>

<script>
export default {
  name: "BlogWidget",
  data() {
    return {
      heading: "Willkommen auf unserem Blog!",
      paragraph:
        "In unseren Beiträgen gehen wir auf die Herausforderungen ein, mit denen Studierende während der Prüfungsphase konfrontiert sind und zeigen, wie mit KI-gestützten Lösungen bessere Lernerfolge erzielt werden können.",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.blog-widget {
  width: 100%;
  padding: $spacing-md $spacing-lg;
  box-shadow: $shadow-md;
  box-sizing: border-box;
  border-radius: $border-radius-md;
  background-color: $color-text-white;

  @include respond(laptop) {
    padding: $spacing-md calc($spacing-md - 5px);
  }

  @include respond(tablet) {
    padding: $spacing-md;
  }

  @include respond(phone) {
    padding: $spacing-sm;
  }

  & h2 {
    margin: 0 0 $spacing-sm 0;
    padding: 0 0 $spacing-xs 0;
    border-bottom: solid 1px #ddd;
    font-size: $font-size-h2-lg;
    color: $color-dark-blue;

    @include respond(tablet) {
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      font-size: $font-size-h2-sm;
    }
  }

  & p {
    margin: 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    color: $color-text-dark;

    @include respond(tablet) {
      font-size: $font-size-p-md;
    }

    @include respond(phone) {
      font-size: $font-size-p-sm;
    }
  }

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;

    & li {
      padding-bottom: $spacing-xs;

      & a {
        text-decoration: none;
        color: $color-light-blue;
        font-weight: 400;

        @include link-hover-effect;

        &:hover {
          color: $color-light-blue-darker;
        }
      }
    }
  }
}
</style>
