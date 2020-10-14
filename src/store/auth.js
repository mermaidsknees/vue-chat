import firebase from "firebase/app";
import { firebaseAuth, firebaseDb } from "../main";
import Vue from "vue";
import "core-js";

export let unsubscribe;

export default {
  messagesRef: "",

  state: {
    userDetails: {},
    users: {},
    messages: {},
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload.userDetails;
    },
    addUser(state, payload) {
      Vue.set(state.users, payload.userId, payload.userData);
    },
    updateUser(state, payload) {
      //Write update user function
    },
    getMessages(state, payload) {
      Vue.set(state.messages, payload.messageId, payload.message);
    },
    clearMessages(state) {},
  },
  actions: {
    login({ dispatch, commit }, { email, password }) {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch('handleAuthStateChanged')
      } catch (e) {
        throw e;
      }
    },
    currentUser({dispatch, commit}, userId){
        firebaseDb.collection("users").doc(userId).get().then((user)=>{
          let userId = firebase.auth().currentUser.uid;
          let userDetails = user.data();
          commit("setUserDetails", {
            userId,
            userDetails,
          });
        })
    },
    handleAuthStateChanged({ commit, dispatch, state }) {
       firebase.auth().onAuthStateChanged(function(user) {
        if(user){
          let userId = firebase.auth().currentUser.uid;
          
          dispatch('currentUser', userId)
          dispatch("firebaseGetUsers")
          dispatch("firebaseGetMessages") 
        }
      });
    },
    async createUser({ dispatch, commit }, { name, last, email, password }) {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        let userId = firebaseAuth.currentUser.uid;

        firebaseDb
          .collection("/users")
          .doc(userId)
          .set({
            name: name,
            last: last,
            email: email,
            password: password,
            online: true,
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

    },

    // firebaseUpdateUser({}, payload) {
    //   firebaseDb
    //     .collection("users")
    //     .doc(payload.userId)
    //     .update(payload.updates);
    // },

    async logout({ dispatch, commit }) {
      let userId = firebaseAuth.currentUser.uid;

      // await dispatch("firebaseUpdateUser", {
      //   userId: userId,
      //   updates: {
      //     online: false,
      //   },
      // });

      try {
        await firebase.auth().signOut();
        commit('setUserDetails',{})
        commit('getMessages', {})
      } catch (e){
       // an error
      } 
      // firebase
      // .auth()
      // .signOut()
      // .then(function() {
      //   store.userDetails = {}
      //   commit("setUserDetails", {});
      //   // firebase.auth().currentUser = {}
      //     // commit("seUserDe")
      //     commit("getMessages", {});
      //   })
      //   .catch(function(error) {});
    },

    async firebaseGetUsers({ commit }) {
      await firebaseDb.collection("users").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          let userData = doc.data();
          let userId = doc.id;
          commit("addUser", {
            userData,
            userId,
          });
        });
      });
    },

    async firebaseGetMessages({ dispatch, commit }, otherUserId) {
      unsubscribe = await firebaseDb
        .collection("messages")
        .doc(firebaseAuth.currentUser.uid)
        .collection(otherUserId)
        .orderBy("timestamp")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let message = doc.data();
            let messageId = doc.id;
            commit("getMessages", {
              message,
              messageId,
            });
          });
        });
    },

    firebaseStopMessages({ dispatch, commit }) {
      unsubscribe();
    },

    firebaseSendMessage({ dispatch, commit }, payload) {
      console.log(payload);
      firebaseDb
        .collection("messages")
        .doc(firebaseAuth.currentUser.uid)
        .collection(payload.otherUserId)
        .add(payload.message);
      payload.message.from = "them";
      firebaseDb
        .collection("messages")
        .doc(payload.otherUserId)
        .collection(firebaseAuth.currentUser.uid)
        .add(payload.message);
    },
  },
  getters: {
    users: (state) => {
      let usersFiltered = {};
      let userId = firebaseAuth.currentUser.uid;
      Object.keys(state.users).forEach((key) => {
        if (key !== userId) {
          usersFiltered[key] = state.users[key];
        }
      });
      return usersFiltered;
    },
  },
};
