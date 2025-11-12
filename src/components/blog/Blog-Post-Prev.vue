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
      // Bei Vite:
      // return new URL(`@/assets/${image}`, import.meta.url).href;
    },
    showAlertMessage() {
      alert("Die vollständigen Blogposts werden in Kürze bereitgestellt.");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

// Component specific variable
$blog-post-border-accent: 7.5px;

.blog-post-prev {
  margin: 0 0 $spacing-lg 0;
  padding: 0 0 $spacing-lg 0;
  box-shadow: $shadow-md;
  border-radius: $border-radius-lg;
  background-color: $color-text-white;
  transition: box-shadow $transition-speed-medium $transition-timing;

  &:hover {
    box-shadow: $shadow-lg;
  }

  @include respond(laptop) {
    margin: 0 0 $spacing-lg 0;
    padding: 0 0 $spacing-lg 0;
  }

  @include respond(tablet) {
    margin: 0 0 $spacing-md 0;
    padding: 0 0 $spacing-md 0;
    border-radius: $border-radius-md;
  }

  @include respond(phone) {
    margin: 0 0 $spacing-md 0;
    padding: 0 0 $spacing-md 0;
    border-radius: $border-radius-md;
  }

  /* ================================
     IMAGE CONTAINER & IMAGE STYLES
  ================================= */
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 8.5; // Etwas flacher als zuvor (Desktop & Laptop)
    overflow: hidden;
    background-color: #f0f0f0;
    border-top-left-radius: $border-radius-lg;
    border-top-right-radius: $border-radius-lg;

    @include respond(laptop) {
      aspect-ratio: 16 / 8.5;
      border-top-left-radius: $border-radius-lg;
      border-top-right-radius: $border-radius-lg;
    }

    @include respond(tablet) {
      aspect-ratio: 16 / 7; // Kompakter auf Tablets
      border-top-left-radius: $border-radius-md;
      border-top-right-radius: $border-radius-md;
    }

    @include respond(phone) {
      aspect-ratio: 4 / 3;
      border-top-left-radius: $border-radius-md;
      border-top-right-radius: $border-radius-md;
    }
  }

  .image-placeholder {
    position: absolute;
    inset: 0;
    background-color: #f0f0f0;
    z-index: 1;
  }

  & img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Der blaue Rand unter dem Bild wurde entfernt */
    border-top-left-radius: $border-radius-lg;
    border-top-right-radius: $border-radius-lg;
    will-change: transform;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: block;
    z-index: 2;

    @include respond(laptop) {
      border-top-left-radius: $border-radius-lg;
      border-top-right-radius: $border-radius-lg;
    }

    @include respond(tablet) {
      border-top-left-radius: $border-radius-md;
      border-top-right-radius: $border-radius-md;
    }

    @include respond(phone) {
      border-top-left-radius: $border-radius-md;
      border-top-right-radius: $border-radius-md;
    }
  }

  & img.image-loaded {
    opacity: 1;
  }

  /* ================================
     TEXT & LINK STYLES
  ================================= */
  & h2 {
    margin: 0;
    padding: $spacing-lg $spacing-lg 0 $spacing-lg;
    text-align: left;
    font-size: $font-size-h2-lg;
    color: $color-dark-blue;
    font-weight: 700;

    @include respond(tablet) {
      padding: $spacing-md $spacing-md 0 $spacing-md;
      font-size: $font-size-h2-md;
    }

    @include respond(phone) {
      padding: $spacing-md $spacing-sm 0 $spacing-sm;
      font-size: $font-size-h2-sm;
    }
  }

  & p {
    margin: $spacing-md 0;
    padding: 0 $spacing-lg;
    text-align: justify;
    font-size: $font-size-p-desktop;
    letter-spacing: $letter-spacing-p-desktop;
    line-height: $line-height-p-desktop;
    color: $color-text-dark;

    @include respond(laptop) {
      font-size: $font-size-p-laptop;
      letter-spacing: $letter-spacing-p-laptop;
      line-height: $line-height-p-laptop;
    }

    @include respond(tablet) {
      margin: $spacing-sm 0;
      padding: 0 $spacing-md;
      font-size: $font-size-p-tablet;
      letter-spacing: $letter-spacing-p-tablet;
      line-height: $line-height-p-tablet;
    }

    @include respond(phone) {
      margin: $spacing-sm 0;
      padding: 0 $spacing-sm;
      font-size: $font-size-p-phone;
      letter-spacing: $letter-spacing-p-phone;
      line-height: $line-height-p-phone;
      text-align: left;
    }
  }

  .read-more {
    display: inline-block;
    padding: 0 $spacing-lg;
    text-decoration: none;
    font-size: $font-size-p-desktop;
    font-weight: 600;
    color: $color-light-blue;
    transition: color $transition-speed-medium $transition-timing;

    &:hover {
      color: $color-light-blue-darker;
    }

    @include respond(tablet) {
      padding: 0 $spacing-md;
      font-size: $font-size-p-tablet;
    }

    @include respond(phone) {
      padding: 0 $spacing-sm;
      font-size: $font-size-p-phone;
    }

    & i {
      margin: 0 10px 0 0;
      font-size: 14px;

      @include respond(phone) {
        font-size: 12px;
        margin: 0 6px 0 0;
      }
    }
  }
}
</style>
