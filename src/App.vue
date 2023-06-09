<template>
  <NavbarPage />
  <router-view />
</template>
<script>
// @ is an alias to /src
import NavbarPage from "@/components/NavbarPage.vue";

export default {
  components: {
    NavbarPage,
  },
};
</script>
<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";
</style>
