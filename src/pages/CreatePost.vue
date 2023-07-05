<template>
  <div
    class="container min-vh-100 d-flex justify-content-center align-items-center"
  >
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
    <div class="text-center" v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <form
      @submit.prevent="submitHundler"
      class="form-control w-50"
      type="form"
      v-if="isElementVisible"
    >
      <div>
        <div
          class="bg-info bg-opacity-10 border border-info rounded mx-auto p-2 d-block align-self-center w-75"
        >
          <h1 class="text-center">Create New Post</h1>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">User ID</label>
          <div class="input-group">
            <span class="input-group-text">ID</span>
            <input
              v-model="post.userId"
              :class="{
                'is-invalid': isSubmitted && v$.post.userId.$invalid,
              }"
              type="number"
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
              'is-invalid':
                (isSubmitted && v$.post.body.$invalid) ||
                v$.post.body.alpha.$invalid,
            }"
            type="text"
            class="form-control"
            rows="5"
            placeholder="Required example textarea"
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
import { mapMutations } from "vuex";
export default {
  name: "CreatePage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      post: {
        id: this.$store.getters.posts.at(-1)?.id + 1 || 1,
        userId: "",
        title: "",
        body: "",
      },
      loading: false,
      isSubmitted: false,
      isElementVisible: true,
      errorred: false,
    };
  },
  validations() {
    return {
      post: {
        userId: {
          required: helpers.withMessage("Field must not be empty.", required),
        },
        title: {
          alpha: helpers.withMessage(
            "There is a number",
            helpers.regex(/^[А-яёЁA-z!-+.,@ ]*$/)
          ),
          required: helpers.withMessage("Пожалуйста добавьте текст", required),
        },
        body: {
          alpha: helpers.withMessage(
            "There is a number",
            helpers.regex(/^[А-яёЁA-z!-+.,@ ]*$/)
          ),
          required: helpers.withMessage("Пожалуйста добавьте текст", required),
        },
      },
    };
  },
  methods: {
    ...mapMutations(["createPost"]),
    submitHundler() {
      this.isSubmitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.isElementVisible = false;
      this.loading = true;
      instance
        .post("/posts/", this.post)
        .then(() => {
          this.createPost(this.post);
          this.$router.push("/list");
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
