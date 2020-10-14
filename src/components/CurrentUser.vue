<template>
  <div class="preview">
    <v-badge bottom overlap color="green" offset-x="25" offset-y="25">
      <v-avatar bordered class="profile-pic" size="67">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/5.jpg"></v-img>
      </v-avatar>
    </v-badge>
    <div class="textbox">
      <div class="username">{{ userName }}</div>
      <div class="last-message">Add Status feature</div>
    </div>
    <div class="logout" @click="logout()">Logout</div>
  </div>
</template>



<script>
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    redirect() {
      console.log("Hey");
    },
  },
  computed: {
    userName() {
      return (
        this.$store.state.auth.userDetails.name +
        " " +
        this.$store.state.auth.userDetails.last
      );
    },
  },
};
</script>


<style lang="scss" scoped>
.preview {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
  border-bottom: 2px solid gray;
}
.logout {
  max-width: 3vh;
  cursor: pointer;
  padding: 25px;
  color: white;
}
.active {
  background-color: #19122e;
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