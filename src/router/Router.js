import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/create",
    name: "create",
    component: () => import("../pages/CreatePost.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../pages/List.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../pages/Post.vue"),
  },
  {
    path: "/editPost/:id",
    name: "editPost",
    component: () => import("../pages/EditPost.vue"),
  },
  {
    path: "/editPostBody/:id",
    name: "editPostBody",
    component: () => import("../pages/EditPostBody.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
