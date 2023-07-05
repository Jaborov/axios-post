<template>
  <div class="d-block" v-if="loading">
    <div class="position-absolute bottom-50 end-50">
      <div class="spinner-border text-primary" role="status">
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
        <tr
          class="pointer"
          @click.stop="openPost(post.id)"
          v-for="post of posts"
          :key="post.id"
        >
          <th>{{ post.id }}</th>
          <td>{{ post.userId }}</td>
          <td class="wid">
            <div class="text">{{ post.title }}</div>
          </td>
          <td class="wid">
            <div class="text">{{ post.body }}</div>
          </td>
          <td>
            <div class="hstack gap-3 d-flex justify-content-evenly">
              <button
                :disabled="disabledButton"
                @click.stop="deletePost(post.id)"
                class="btn btn-danger"
              >
                Delete
              </button>
              <button
                :disabled="disabledButton"
                @click.stop="editPost(post.id)"
                class="btn btn-warning"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <nav aria-label="...">
        <ul class="pagination pagination-sm">
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ 'page-item active': pageNumber === page }"
            aria-current="page"
            @click="changePage(page)"
          >
            <span class="page-link">{{ page }}</span>
          </li>
        </ul>
      </nav>
    </div>
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
      pageNumber: 1,
      limit: 10,
      totalPages: 0,
      newPost: this.posts || [],
      errorred: false,
      loading: false,
      isElementVisible: true,
      disabledButton: false,
    };
  },
  computed: {
    ...mapGetters(["posts"]),
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    ...mapMutations(["deletePostBy", "addPosts"]),
    async fetchPosts() {
      this.loading = true;
      instance
        .get("/posts", {
          params: {
            _page: this.pageNumber,
            _limit: this.limit,
          },
        })
        .then((response) => {
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.addPosts(response.data);
          this.newPost = this.posts;

          console.log(this.posts);
        })
        .catch(() => {
          this.errorred = true;
          this.isElementVisible = false;
        })
        .finally(() => {
          this.loading = false;
        });
      // }
    },
    changePage(page) {
      this.pageNumber = page;
    },
    deletePost(id) {
      this.disabledButton = true;
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
          this.disabledButton = false;
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
  watch: {
    pageNumber() {
      this.fetchPosts();
    },
  },
};
</script>
<style scoped>
tr.pointer {
  cursor: pointer;
}
.wid {
  max-width: 200px;
}
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
