<template>
  <div class="preview">
    <v-avatar color="red" bordered class="profile-pic" size="67">
      <!-- <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img> -->
      <h1 style="color: white; font-weight: 400">{{ user.name.charAt(0) }}</h1>
    </v-avatar>
    <div class="textbox">
      <div class="username">{{ user.name }} {{ user.last }}</div>
      <div class="last-message">Available for freelance work.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;

  &:hover {
    background-color: #413f3f;
  }
}
.active {
  background-color: #3e3939;
}
.textbox {
  padding: 15px;
}
.username {
  color: white;
}
.last-message {
  color: gray;
}
</style>