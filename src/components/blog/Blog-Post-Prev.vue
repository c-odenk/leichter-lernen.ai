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
    <a href="#" class="read-more" @click.prevent="showAlertMessage">
      <i class="fa-solid fa-chevron-right"></i>Weiterlesen
    </a>
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
    showAlertMessage() {
      alert("Die vollständigen Blogposts werden in kürze bereitgestellt.");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.blog-post-prev {
  margin: 0 0 $spacing-lg 0;
  padding: 0 0 $spacing-lg 0;
  box-shadow: $shadow-md;
  border-radius: $border-radius-lg;
  background-color: $color-text-white;
  transition: box-shadow $transition-speed-medium $transition-timing;

  @include respond(tablet) {
    margin: 0 0 $spacing-lg 0;
    padding: 0 0 $spacing-md 0;
  }

  @include respond(phone) {
    margin: 0 0 $spacing-md 0;
    padding: 0 0 calc($spacing-md + 7.5px) 0;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    overflow: hidden;
    background-color: #f0f0f0; /* Leichte Hintergrundfarbe für den Placeholder */
    border-top-left-radius: $border-radius-md;
    border-top-right-radius: $border-radius-md;

    @include respond(laptop) {
      padding-bottom: 48%;
    }

    @include respond(tablet) {
      padding-bottom: 45%;
    }
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

    @include respond(laptop) {
      padding: $spacing-md $spacing-lg 0 $spacing-lg;
      font-size: $font-size-h2-lg;
    }

    @include respond(tablet) {
      padding: $spacing-lg $spacing-md 0 $spacing-md;
      font-size: $font-size-h2-md;
      margin-top: 0; /* Keine zusätzliche Anpassung nötig bei 51% */
    }

    @include respond(phone) {
      padding: $spacing-md $spacing-sm 0 $spacing-sm;
      font-size: $font-size-h2-sm;
    }
  }

  & p {
    margin: $spacing-lg 0;
    padding: 0 $spacing-lg;
    text-align: justify;
    font-size: $font-size-p-xl;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    @include themed(color, text);

    @include respond(laptop) {
      margin: $spacing-md 0;
      font-size: $font-size-p-xl;
    }

    @include respond(tablet) {
      margin: $spacing-md 0;
      padding: 0 $spacing-md;
      font-size: $font-size-p-md;
    }

    @include respond(phone) {
      padding: 0 $spacing-sm;
      font-size: $font-size-p-sm;
      text-align: left;
    }
  }

  .read-more {
    display: inline-block;
    margin: 0;
    padding: 0 $spacing-lg $spacing-md $spacing-lg;
    text-decoration: none;
    font-size: $font-size-p-xl;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-weight: 500;
    @include themed(color, accent);
    transition: color $transition-speed-medium $transition-timing;

    &:hover {
      opacity: 0.8;
    }

    @include respond(laptop) {
      padding: 0 $spacing-lg 0 $spacing-lg;
      font-size: $font-size-p-xl;
    }

    @include respond(tablet) {
      padding: 0 $spacing-md $spacing-md $spacing-md;
      font-size: $font-size-p-md;
    }

    @include respond(phone) {
      padding: 0 $spacing-sm;
      font-size: $font-size-p-sm;
    }

    & i {
      margin: 0 15px 0 0;
    }
  }
}
</style>
