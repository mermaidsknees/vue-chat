<template>
  <div class="sidebar">
    <vuescroll>
      <CurrentUser />
      <UserPreview
        v-for="(user, key) in users"
        :key="user.key"
        v-bind:user="user"
        @click.native="showChat(key)"
      />
    </vuescroll>
  </div>
</template>

<script>
import UserPreview from "./UserPreview.vue";
import CurrentUser from "./CurrentUser.vue";
import vuescroll from "vuescroll";

export default {
  components: {
    UserPreview,
    CurrentUser,
    vuescroll,
  },
  methods: {
    showChat(key) {
      const path = `/chat/${key}`;
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  overflow: hidden;
  width: 25vw;
  min-width: 400px;
  background-color: #505050;
  height: 100vh;
}
.sidebar:first-child {
  padding-top: 20px;
}
</style>