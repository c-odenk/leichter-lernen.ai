<template>
  <div class="blog-container">
    <article v-for="(post, index) in blogPosts" :key="index" class="blog-post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="introduction">{{ post.introduction }}</p>

      <section
        v-for="(section, secIndex) in post.sections"
        :key="secIndex"
        class="section"
      >
        <h2 class="subtitle">{{ section.subtitle }}</h2>
        <p class="content">{{ section.content }}</p>

        <!-- Falls Strategien enthalten sind, liste sie auf -->
        <ul v-if="section.strategies" class="strategies">
          <li
            v-for="(strategy, stratIndex) in section.strategies"
            :key="stratIndex"
          >
            {{ strategy }}
          </li>
        </ul>
      </section>

      <!-- Quellenangaben -->
      <footer class="literature">
        <h3>Quellen:</h3>
        <ul>
          <li
            v-for="(source, sourceIndex) in post.literature"
            :key="sourceIndex"
          >
            {{ source }}
          </li>
        </ul>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BlogPosts } from "../data/blogPosts.js"; // Importiere die JSON-Datei

const blogPosts = ref(BlogPosts);
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.blog-post {
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.title {
  font-size: 1.8rem;
  color: #333;
}

.introduction {
  font-size: 1.2rem;
  font-weight: 400;
  color: #555;
}

.section {
  margin-top: 20px;
}

.subtitle {
  font-size: 1.5rem;
  color: #222;
}

.content {
  font-size: 1rem;
  color: #444;
}

.strategies {
  margin-top: 10px;
  padding-left: 20px;
}

.strategies li {
  list-style-type: disc;
  color: #666;
}

.literature {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #777;
}
</style>
