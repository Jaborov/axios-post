<template>
  <div
    class="container min-vh-100 d-flex justify-content-center align-items-center"
  >
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
      v-if="errorred"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>we are unable to load the information, please try again</div>
    </div>
    <form
      @submit.prevent="submitHundler"
      class="form-control w-50"
      type="form"
      v-if="isElementVisible"
    >
      <div>
        <div
          class="bg-info bg-opacity-10 border border-info rounded mx-auto p-2 d-block align-self-center"
          style="width: 320px"
        >
          <h1 class="text-center">Create New Post</h1>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">User name</label>
          <div class="input-group">
            <span class="input-group-text">User</span>
            <input
              v-model="post.userId"
              :class="{
                'is-invalid': isSubmitted && v$.post.userId.required.$invalid,
              }"
              type="text"
              class="form-control"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            />
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div class="col-md-8 mb-3">
          <label class="form-label">Name of post</label>
          <input
            v-model="post.title"
            type="text"
            class="form-control"
            :class="{
              'is-invalid':
                (isSubmitted && v$.post.title.required.$invalid) ||
                v$.post.title.alpha.$invalid,
            }"
            aria-describedby="validationServer03Feedback"
          />
          <div class="invalid-feedback">Field must not be empty.</div>
        </div>
        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Post</label>
          <textarea
            v-model="post.body"
            :class="{
              'is-invalid': isSubmitted && v$.post.body.required.$invalid,
            }"
            type="text"
            class="form-control"
            placeholder="Required example textarea"
            style="height: 200px"
          ></textarea>
          <div class="invalid-feedback">Field must not be empty.</div>
        </div>
        <button
          type="submit"
          class="btn btn-success d-block mx-auto aligin-self-center"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "CreatePage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      post: {
        userId: "",
        title: "",
        body: "",
      },
      loading: false,
      isElementVisible: true,
      isSubmitted: false,
      id: +this.$route.params.id,
    };
  },
  validations() {
    return {
      post: {
        userId: { required },
        title: { required, alpha: helpers.regex(/^[а-яёА-ЯЁA-z ]*$/) },
        body: { required },
      },
    };
  },
  methods: {
    submitHundler() {
      this.isSubmitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.loading = true;
      this.isElementVisible = false;
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${this.id}`, this.post)
        .then(() => {
          this.posts = {
            ...this.$store.getters.postsById(+this.$route.params.id),
          };
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
      this.$store.dispatch("editPost", this.post);
      this.$router.push("/list");
    },
  },
  mounted() {
    this.post = { ...this.$store.getters.postsById(+this.$route.params.id) };
  },
};
</script>
