<template>
  <article class="blog-post-prev">
    <div class="image-container">
      <img
        :src="getImageUrl(post.image)"
        :alt="post.title"
        loading="lazy"
        @load="imageLoaded = true"
        :class="{ 'image-loaded': imageLoaded }"
      />
      <div v-if="!imageLoaded" class="image-placeholder"></div>
    </div>
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
  data() {
    return {
      imageLoaded: false,
    };
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

  .image-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    overflow: hidden;
    background-color: #f0f0f0; /* Leichte Hintergrundfarbe für den Placeholder */
    border-top-left-radius: $border-radius-md;
    border-top-right-radius: $border-radius-md;
  }

  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom: $blog-post-border-accent solid $color-dark-blue-lighter;
    border-top-left-radius: $border-radius-md;
    border-top-right-radius: $border-radius-md;
    will-change: transform;
    opacity: 0; /* Bild ist standardmäßig transparent */
    transition: opacity 0.3s ease; /* Sanfter Übergang beim Laden */
  }

  & img.image-loaded {
    opacity: 1; /* Bild wird sichtbar, wenn geladen */
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
