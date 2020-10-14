<template>
  <div class="login form-container">
    <v-card class="main-form align-center" max-width="30%">
      <form>
        <h1 class="form-header">Registration</h1>
        <div class="form-inner">
          <v-text-field v-model="name" label="First Name" required></v-text-field>
          <v-text-field v-model="last" label="Last Name" required></v-text-field>
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <!-- <v-btn color="primary" d epressed> Login </v-btn> -->
          <v-btn @click.prevent="submit" color="primary" depressed>
            Create Account
          </v-btn>
        </div>
      </form>
      <v-alert
        style="transition: height 0.1s linear"
        v-if="isCreated"
        type="success"
        >User created with email {{ email }}</v-alert
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name:"",
      last:"",
      email: "",
      password: "",
      isCreated: "",
    };
  },
  methods: {
    submit() {
      var formData = {
        name:this.name,
        last:this.last,
        email: this.email,
        password: this.password,
      };

      try {
        this.$store.dispatch("createUser", formData);
        this.isCreated = true;
      } catch (e) {
        throw e;
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>


<style scoped lang='scss'>
.align-center {
  margin: 0 auto;
}
.login {
  height: 100vh;
  background-color: gray;
}
//Form
.main-form {
  top: 50%;
  transform: translateY(-50%);
}
.form-header {
  padding: 2%;
}
.form-inner {
  padding: 2%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
