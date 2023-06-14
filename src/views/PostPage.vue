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
  <div
    class="container min-vh-100 d-flex justify-content-center align-items-center"
    v-if="isElementVisible"
  >
    <div>
      <div class="mb-3">
        <div class="card">
          <div class="card-header">
            ID : {{ post.id }} user ID : {{ post.userId }}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ post.title }}.</p>
              <footer class="blockquote-footer">
                {{ post.body }}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div class="mb-3 hstack gap-5">
        <button
          class="btn btn-primary position-relative"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="true"
          aria-controls="collapseExample"
        >
          comment
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ comments.length }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
        <button
          @click="editPostBody(post.id)"
          type="button"
          class="btn btn-secondary"
        >
          Edit post
        </button>
      </div>
      <div class="text-center" v-if="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="collapse" id="collapseExample">
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
        <ol class="list-group list-group-numbered">
          <li
            class="list-group-item d-flex justify-content-between align-items-start"
            v-for="comment in comments"
            :key="comment.id"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ comment.name }}</div>
              {{ comment.body }}
            </div>
            <span class="badge bg-primary rounded-pill">{{
              comment.email
            }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import instance from "@/axios/instance";
export default {
  data() {
    return {
      post: {},
      comments: [],
      id: +this.$route.params.id,
      loading: true,
      errorred: false,
      isElementVisible: true,
    };
  },
  mounted() {
    this.post = this.$store.getters.postsById(this.id);
    this.loading = true;
    this.isElementVisible = true;
    instance
      .get(`/posts/${this.id}/comments`)
      .then((response) => {
        this.comments = response.data;
      })
      .catch(() => {
        this.errorred = true;
        this.isElementVisible = false;
      })
      .finally(() => {
        this.loading = false;
        this.isElementVisible = true;
      });
    // axios
    //   .get(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)
    //   .then((response) => {
    //     this.comments = response.data;
    //   })
    //   .catch(() => {
    //     this.errorred = true;
    //     this.isElementVisible = false;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //     this.isElementVisible = true;
    //   });
  },
  methods: {
    editPostBody(id) {
      this.isElementVisible = false;
      this.loading = true;
      instance
        .get(`/posts/${id}`)
        .then(() => {
          this.$router.push({ name: "editPostBody", params: { id } });
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => (this.loading = false));
      // axios
      //   .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      //   .then(() => {
      //     this.$router.push({ name: "editPostBody", params: { id } });
      //   })
      //   .catch(() => {
      //     this.errorred = true;
      //     this.isElementVisible = false;
      //   })
      //   .finally(() => (this.loading = false));
    },
  },
};
</script>
