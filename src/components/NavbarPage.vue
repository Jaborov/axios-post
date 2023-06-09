<template>
  <nav class="navbar navbar-expand-lg bg-dark-subtle sticky-top">
    <div class="container d-flex justify-content-center align-conten-center">
      <router-link to="/create" class="btn btn-outline-success me-2"
        >Create</router-link
      >
      <router-link to="/list" class="btn btn-outline-danger me-2"
        >List</router-link
      >
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavbarPage",
};
</script>
