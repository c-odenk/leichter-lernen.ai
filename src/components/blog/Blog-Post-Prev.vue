<template>
  <article class="blog-post-prev">
    <img :src="getImageUrl(post.image)" alt="Blog Post Image" />
    <h2>💬 {{ post.title }}</h2>
    <p>{{ post.introduction }}</p>
    <router-link :to="'blog/blogpost/#' + post.articleId" class="read-more">
      <i class="fa-solid fa-chevron-right"></i>Weiterlesen
    </router-link>
  </article>
</template>

<script>
export default {
  name: "BlogPostPrev",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.blog-post-prev {
  @include blog-post-container;

  & img {
    width: 100%;
    height: auto;
    border-bottom: $blog-post-border-accent solid $color-dark-blue-lighter;
    border-top-left-radius: $border-radius-md;
    border-top-right-radius: $border-radius-md;
  }

  & h2 {
    margin: 0;
    padding: $spacing-lg $spacing-lg 0 $spacing-lg;
    text-align: left;
    font-size: $font-size-h2-lg;
    @include themed(color, heading);

    @include respond(tablet) {
      padding: $spacing-md $spacing-md 0 $spacing-md;
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      padding: $spacing-sm $spacing-sm 0 $spacing-sm;
      font-size: $font-size-h2-sm;
    }
  }

  & p {
    margin: $spacing-lg 0;
    padding: 0 $spacing-lg;
    text-align: justify;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    @include themed(color, text);
    @include text-content-responsive;
  }

  .read-more {
    display: inline-block;
    margin: 0;
    padding: 0 $spacing-lg $spacing-md $spacing-lg;
    text-decoration: none;
    text-transform: uppercase;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-weight: 500;
    @include themed(color, accent);

    @include link-hover-effect;

    @include respond(tablet) {
      padding: 0 $spacing-md $spacing-md $spacing-md;
      font-size: $font-size-p-md;
    }

    @include respond(phone) {
      padding: 0 $spacing-sm $spacing-sm $spacing-sm;
      font-size: $font-size-p-sm;
    }

    & i {
      margin: 0 $spacing-xs 0 0;
    }
  }
}
</style>
