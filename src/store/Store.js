import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    posts: (s) => s.posts,
    postsById: (s) => (id) => {
      return s.posts.find((t) => t.id === id);
    },
  },
  mutations: {
    createPost(state, post) {
      state.posts.push(post);
    },
    deletePostBy(state, id) {
      const index = state.posts.findIndex((item) => item.id === id);
      state.posts.splice(index, 1);
    },
    addPosts(state, posts) {
      state.posts = posts;
    },
    editPost(state, post) {
      const index = state.posts.findIndex((item) => item.id === post.id);
      state.posts.splice(index, 1, post);
    },
  },
  actions: {
    createPost({ commit }, post) {
      commit("createPost", post);
    },
    addPosts({ commit }, posts) {
      commit("addPosts", posts);
    },
    deletePost({ commit }, post) {
      commit("deletePost", post);
    },
    editPost({ commit }, post) {
      commit("editPost", post);
    },
  },
  modules: {},
});
