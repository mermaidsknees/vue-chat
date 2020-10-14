<template>
  <v-app>
    <v-main>
        <!-- <Login/> -->
        <router-view/>
    </v-main>

  </v-app>

</template>

<script>
import Login from './components/Login'
import Home from './components/Home'
import HomePage from './views/Home'
import firebase from 'firebase'

export default {
  name: 'App',

  components:{
    Login,Home, HomePage
  },
  mounted(){
      // this.$store.dispatch('handleAuthStateChanged')
  },

  data: () => ({
    //
  }),
};
</script>
