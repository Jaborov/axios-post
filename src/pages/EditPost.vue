<template>
  <div
    class="container min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="d-block" v-if="loading">
      <div class="position-absolute bottom-50 end-50">
        <div class="spinner-border text-primary" role="status" rows="">
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
          class="bg-info bg-opacity-10 border border-info rounded mx-auto p-2 d-block align-self-center w-50"
        >
          <h1 class="text-center">Edit Post</h1>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">User name</label>
          <div class="input-group">
            <span class="input-group-text">User</span>
            <input
              v-model="post.userId"
              :class="{
                'is-invalid': isSubmitted && v$.post.userId.$invalid,
              }"
              type="text"
              class="form-control"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            />
            <div
              v-for="error in v$.post.userId.$errors"
              :key="error"
              class="invalid-feedback"
            >
              {{ error.$message }}
            </div>
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
                (isSubmitted && v$.post.title.$invalid) ||
                v$.post.title.alpha.$invalid,
            }"
            aria-describedby="validationServer03Feedback"
          />
          <div
            v-for="error in v$.post.title.$errors"
            :key="error"
            class="invalid-feedback"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="mb-3">
          <label for="validationTextarea" class="form-label">Post</label>
          <textarea
            v-model="post.body"
            :class="{
              'is-invalid': isSubmitted && v$.post.body.$invalid,
            }"
            type="text"
            class="form-control"
            placeholder="Required example textarea"
            rows="5"
          ></textarea>
          <div
            v-for="error in v$.post.body.$errors"
            :key="error"
            class="invalid-feedback"
          >
            {{ error.$message }}
          </div>
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
import instance from "@/axios/instance";
import { mapMutations, mapGetters } from "vuex";

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
      errorred: false,
      loading: false,
      isElementVisible: true,
      isSubmitted: false,
      id: +this.$route.params.id,
    };
  },
  validations() {
    return {
      post: {
        userId: {
          required: helpers.withMessage("Please choose a username.", required),
        },
        title: {
          alpha: helpers.withMessage(
            "gsfafa",
            helpers.regex(/^[А-яёЁA-z!-+.,@ ]*$/),
            required
          ),
          required: helpers.withMessage("Field must not be empty.", required),
        },
        body: {
          alpha: helpers.withMessage(
            "Not to number",
            helpers.regex(/^[А-яёЁA-z!-+.,@ ]*$/),
            required
          ),
          required: helpers.withMessage("Field must not be empty.", required),
        },
      },
    };
  },
  computed: {
    ...mapGetters(["posts", "postById"]),
    posts() {
      return this.postById(this.id);
    },
  },
  methods: {
    ...mapMutations(["editPost"]),
    submitHundler() {
      this.isSubmitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.loading = true;
      this.isElementVisible = false;
      console.log(this.post);
      instance
        .put(`/posts/${this.id}`, this.post)
        .then(() => {
          this.post = {
            ...this.postById(+this.$route.params.id),
          };
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
      this.editPost(this.post);
      this.$router.push("/list");
    },
  },
  mounted() {
    this.post = { ...this.postById(+this.$route.params.id) };
  },
};
</script>
