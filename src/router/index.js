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
  scrollBehavior(to, from, savedPosition) {
    // Wenn die Zurück- oder Vorwärts-Taste im Browser verwendet wurde und es eine gespeicherte Position gibt
    if (savedPosition) {
      return savedPosition;
    }

    // Wenn ein Hash/Anker in der URL vorhanden ist (z.B. /some-page#section1)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // Ansonsten zum Seitenanfang scrollen
    return { top: 0 };
  },
});

export default router;
