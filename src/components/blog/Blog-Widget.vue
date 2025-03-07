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
  padding: 30px 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @include respond(tablet) {
  }

  @include respond(phone) {
  }

  & h2 {
    margin: 0 0 20px 0;
    padding: 0 0 10px 0;
    border-bottom: solid 1px #ddd;
  }

  & p {
    margin: 0;
    padding: 0;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
  }

  & ul {
    list-style: none;
    margin: 0px;
    padding: 0px;

    & li {
      padding-bottom: 5px;

      & a {
        text-decoration: none;
        color: #000;
        font-weight: 400;

        &:hover {
        }
      }
    }
  }
}
</style>
