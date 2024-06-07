<script>

import Navigation from "./components/common/Navigation.vue";
import { userStore } from "./stores/store";

export default {
  name: "App",
  components: {
    Navigation
  },
  setup() {
    const store = userStore();
    store.autoLogin();
  },
};
</script>

<template>
  <Navigation />
  <routerView> </routerView>
</template>

<style scoped></style>
