<template>
  <article class="blog-post-prev">
    <img :src="require(`@/assets/${post.image}`)" alt="Blog Post Image" />
    <div class="img-platzhalter"></div>
    <h2>💬 {{ post.title }}</h2>
    <p>{{ post.introduction }}</p>
    <router-link :to="'blog/blogpost/#' + post.articleId">
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
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.blog-post-prev {
  margin: 0 0 50px 0;
  padding: 0 0 50px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  @include respond(laptop) {
  }

  @include respond(tablet) {
  }

  @include respond(phone) {
  }

  & img {
    width: 100%;
    height: auto;
    border-bottom: 7.5px solid lighten($color-dark-blue, 15%);

    @include respond(tablet) {
      height: auto;
    }

    @include respond(phone) {
    }
  }

  & h2 {
    margin: 0;
    padding: 50px 40px 0 40px;
    text-align: left;

    @include respond(tablet) {
    }

    @include respond(phone) {
    }
  }

  & p {
    margin: 40px 0 40px 0;
    padding: 0px 40px 0 40px;
    text-align: justify;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;

    @include respond(tablet) {
      margin: 0 0 20px 0;
      padding: 0 20px;
    }
  }

  & a {
    margin: 0;
    padding: 0px 40px;
    text-decoration: none;
    text-decoration: none;
    text-transform: uppercase;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    font-weight: 500;
    color: lighten($color-dark-blue, 15%);

    @include respond(tablet) {
      padding: 0 20px;
    }

    & i {
      margin: 0 10px 0 0;
    }
  }
}
</style>
