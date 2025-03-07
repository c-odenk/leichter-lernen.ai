<template>
  <div class="view-blog-post">
    <Header />
    <h1>BLOG POST</h1>
    <!-- <BlogPost /> -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
// import BlogPost from "@/components/blog/Blog-Post.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "ViewBlogPost",
  components: {
    Header,
    // BlogPost,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-blog-post {
}
</style>
