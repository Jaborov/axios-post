<template>
  <div
    class="container container min-vh-100 d-flex justify-content-center align-items-center"
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
      class="row g-3 needs-validation w-50"
      typeof="form"
      @submit.prevent="editBody"
      v-if="isElementVisible"
    >
      <div class="form-floating">
        <textarea
          v-model="post.body"
          type="text"
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style="height: 200px"
          :class="{
            'is-invalid': isSubmitted && v$.post.body.required.$invalid,
          }"
        ></textarea>
        <label for="floatingTextarea2">Post</label>
        <div class="invalid-feedback">Please typing a comment.</div>
      </div>

      <div class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapMutations } from "vuex";
import instance from "../axios/instance";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      post: {
        body: "",
      },
      isSubmitted: false,
      errorred: false,
      loading: false,
      isElementVisible: true,
      id: +this.$route.params.id,
    };
  },
  validations() {
    return {
      post: {
        body: { required },
      },
    };
  },
  methods: {
    ...mapMutations([
      "editPost",
      // this.post = { ...this.$store.getters.postsById(this.id) };
      // this.$router.back();
    ]),

    editBody() {
      this.isSubmitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.loading = true;
      this.isElementVisible = true;
      instance
        .patch(`/posts/${this.id}`)
        .then(() => {
          this.editPost(this.post);
          this.$router.back();
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
      // axios
      //   .patch(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
      //     body: this.body,
      //   })
      //   .then(() => {
      //     this.editPost(this.post);
      //     this.$router.back();
      //     // this.$store.dispatch("editPost", this.post);
      //   })
      //   .catch(() => {
      //     this.errorred = true;
      //     this.isElementVisible = false;
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
  },
  mounted() {
    this.post = { ...this.$store.getters.postsById(+this.$route.params.id) };
  },
};
</script>
