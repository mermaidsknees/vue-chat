import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuescroll from "vuescroll";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyDC29hMcbQxB6f0Ny5DKtNDoloC_jPq61g",
  authDomain: "vue-firebase-chat-85f2d.firebaseapp.com",
  databaseURL: "https://vue-firebase-chat-85f2d.firebaseio.com",
  projectId: "vue-firebase-chat-85f2d",
  storageBucket: "vue-firebase-chat-85f2d.appspot.com",
  messagingSenderId: "389835799188",
  appId: "1:389835799188:web:51ff12e27f7db2c8b21281",
};

Vue.use(vuescroll, {
  ops: {
  },
  name: "myScroll",
});
  
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: "#000",
  },
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.firestore();

// //User will log out after finishing the session
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(function() {
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });
let app 

firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


export { firebaseAuth, firebaseDb };
