import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    posts: (s) => s.posts,
    postById: (s) => (id) => {
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
      console.log(55555555);
      console.log(post);
      const index = state.posts.findIndex((item) => item.id === post.id);
      state.posts.splice(index, 1, post);
    },
  },
  modules: {},
});
