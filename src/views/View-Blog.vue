<template>
  <div class="view-blog">
    <Header />
    <BlogHero />
    <div class="view-blog_blog-container">
      <div class="view-blog_blog-container_post-prev">
        <BlogPostPrev
          v-for="(post, index) in BlogPosts"
          :key="index"
          :post="post"
        />
      </div>
      <div class="view-blog_blog-container_widget">
        <BlogWidget />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import BlogHero from "@/components/blog/Blog-Hero.vue";
import BlogPostPrev from "@/components/blog/Blog-Post-Prev.vue";
import BlogWidget from "@/components/blog/Blog-Widget.vue";
import Footer from "@/components/footer/Footer.vue";

import { BlogPosts } from "@/assets/BlogPosts.js";

export default {
  name: "ViewBlog",
  components: {
    Header,
    BlogHero,
    BlogPostPrev,
    BlogWidget,
    Footer,
  },
  data() {
    return {
      BlogPosts,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-blog {
  &_blog-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: $width-desktop - 300px;
    margin: 0 auto;

    &_post-prev {
      width: 68%;
    }

    &_widget {
      width: 29.5%;
    }
  }
}
</style>
