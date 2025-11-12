<template>
  <div class="view-blog">
    <Header />
    <BlogHeading :heading="heroHeading" :subheading="heroSubheading" />
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
import BlogHeading from "@/components/headings/Page-Heading.vue";
import BlogPostPrev from "@/components/blog/Blog-Post-Prev.vue";
import BlogWidget from "@/components/blog/Blog-Widget.vue";
import Footer from "@/components/footer/Footer.vue";
import { BlogPosts } from "@/assets/BlogPosts.js";

export default {
  name: "ViewBlog",
  components: {
    Header,
    BlogHeading,
    BlogPostPrev,
    BlogWidget,
    Footer,
  },
  data() {
    return {
      BlogPosts,
      heroHeading:
        "Erkenntnisse zu den häufigsten Problemen bei der Prüfungsvorbereitung.",
      heroSubheading:
        "Stressige Prüfungsphasen und die richtige Lernstrategie: In unseren Blogbeiträgen zeigen wir dir, welche Herausforderungen es gibt und wie du sie effektiv überwindest.",
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../variables/variables.scss" as *;

.view-blog {
  &_blog-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // width: 100%;
    // max-width: $width-desktop;
    margin: 0 auto;
    width: $width-desktop - 300px;
    padding: 0 $spacing-md;
    box-sizing: border-box;
    gap: $spacing-md;

    @include respond(desktop) {
      max-width: $width-desktop;
    }

    @include respond(laptop) {
      @include content-container;
      gap: $spacing-lg;
    }

    @include respond(tablet) {
      flex-direction: column;
      width: 100%;
      padding: 0 $spacing-sm;
      gap: $spacing-md;
    }

    @include respond(phone) {
      flex-direction: column;
      width: 100%;
      padding: 0 $spacing-sm;
      gap: $spacing-md;
    }

    &_post-prev {
      width: 68%;

      @include respond(laptop) {
        width: 68%;
      }

      @include respond(tablet) {
        width: 100%;
      }

      @include respond(phone) {
        width: 100%;
      }
    }

    &_widget {
      width: 29.5%;

      @include respond(laptop) {
        width: 29.5%;
      }

      @include respond(tablet) {
        width: 100%;
        display: none;
      }

      @include respond(phone) {
        width: 100%;
        display: none;
      }
    }
  }
}
</style>
