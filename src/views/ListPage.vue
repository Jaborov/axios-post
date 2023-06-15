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
import instance from "@/axios/instance";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      post: {
        userId: "",
        title: "",
        body: "",
      },
      newPost: this.posts || [],
      errorred: false,
      loading: false,
      isElementVisible: true,
    };
  },
  computed: {
    ...mapGetters(["posts"]),
  },
  mounted() {
    if (this.$store.getters.posts.length === 0) {
      this.loading = true;
      instance
        .get("/posts")
        .then((response) => {
          this.addPosts(response.data);
          this.newPost = this.posts;
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
    ...mapMutations(["deletePostBy", "addPosts"]),
    deletePost(id) {
      this.loading = true;
      instance
        .delete(`/posts/${id}`)
        .then(() => {
          this.deletePostBy(id);
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
