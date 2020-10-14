<template>
  <div class="login form-container">
    <v-card class="main-form align-center" max-width="30%">
      <form>
        <h1 class="form-header">Authentification</h1>
        <div class="form-inner">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <!-- <v-btn color="primary" d epressed> Login </v-btn> -->
          <v-btn @click.prevent="submit" color="primary" depressed> Login </v-btn>
        </div>
        Don't have an account? <router-link to='/register'>Register</router-link>
      </form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password:""
    };
  },
  methods:{
    async submit(){
      var formData = {
        email:this.email,
        password:this.password
      }
       
        this.$store.dispatch("login", formData) 
        this.$router.push('/')
    }
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
