<template>
  <div class="d-block" v-if="loading">
    <div class="position-absolute bottom-50 end-50">
      <div
        class="spinner-border text-primary"
        style="width: 4rem; height: 4rem"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div>
    <div
      v-if="errorred"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>we are unable to load the information, please try again</div>
    </div>
  </div>
  <div class="container" v-if="isElementVisible">
    <h1 class="text-center">List</h1>
    <table class="table table-hover" type="table">
      <thead class="table-group-divider">
        <tr class="table-light">
          <th scope="col">№</th>
          <th scope="col">User ID</th>
          <th scope="col">Post Name</th>
          <th scope="col">Post</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post of posts" :key="post.id">
          <th scope="row">{{ post.id }}</th>
          <td>{{ post.userId }}</td>
          <td @click="openPost(post.id)">{{ post.title }}</td>
          <td @click="openPost(post.id)">{{ post.body }}</td>
          <div class="hstack gap-3">
            <button @click="deletePost(post.id)" class="btn btn-danger">
              Delete
            </button>
            <button @click="editPost(post.id)" class="btn btn-warning">
              Edit
            </button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {
        userId: "",
        title: "",
        body: "",
      },
      posts: this.$store.getters.posts || [],
      errorred: false,
      loading: false,
      isElementVisible: true,
    };
  },
  mounted() {
    if (this.$store.getters.posts.length === 0) {
      this.loading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => {
          this.$store.dispatch("addPosts", response.data);
          this.posts = this.$store.getters.posts;
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  methods: {
    deletePost(id) {
      this.loading = true;
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          this.$store.dispatch("deletePost", id);
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editPost(id) {
      this.$router.push({ name: "editPost", params: { id } });
    },
    openPost(id) {
      this.isElementVisible = false;
      this.loading = true;
      this.$router.push({ name: "post", params: { id } });
    },
  },
};
</script>
