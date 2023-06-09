import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/create",
    name: "create",
    component: () => import("../views/CreatePostPage.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListPage.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostPage.vue"),
  },
  {
    path: "/editPost/:id",
    name: "editPost",
    component: () => import("../views/EditPostPage.vue"),
  },
  {
    path: "/editPostBody/:id",
    name: "editPostBody",
    component: () => import("../views/EditPostBody.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
