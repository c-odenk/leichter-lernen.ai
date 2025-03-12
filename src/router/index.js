import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/View-Landing.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("../views/View-Product.vue"),
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: () => import("../views/View-Pricing.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/View-Blog.vue"),
  },
  {
    path: "/blogpost",
    name: "BlogPost",
    component: () => import("../views/View-Blog-Post.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/View-Login.vue"),
  },
  {
    path: "/newtopic",
    name: "NewTopic",
    component: () => import("../views/View-Dashboard-New-Topic.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/View-Dashboard-Analyzed-Topic.vue"),
  },
  {
    path: "/imprint",
    name: "Impressum",
    component: () => import("../views/View-Imprint.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/View-Privacy.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("../views/View-Terms.vue"),
  },
  {
    path: "/pitch",
    name: "Pitch",
    component: () => import("../views/View-Pitch.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
