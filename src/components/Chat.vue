<template>
  <div class="chat">
    <div class="chat-message-list">
      <vuescroll>
        <div
          v-for="(message, index) in messages"
          :key="message.index"
          :class="message.from == 'me' ? 'sent-message' : 'received-message'"
        >
          <div class="message-text">{{ message.text }}</div>
          <div class="message-date">
            {{ message.timestamp.toDate().toLocaleString() }}
          </div>
        </div>
      </vuescroll>
    </div>
    <div class="chat-input">
      <input
        v-model="newMessage"
        placeholder="Enter your message here"
        label="yourMsg"
        type="text"
      />
      <button @click="sendMessage" type="submit" class="send-button">
        send
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import vuescroll from "vuescroll";

export default {
  components: {
    vuescroll,
  },
  data() {
    return {
      newMessage: "",
      serverTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage !== "") {
        this.$store.dispatch("firebaseSendMessage", {
          message: {
            text: this.newMessage,
            from: "me",
            timestamp: this.serverTimestamp,
          },
          otherUserId: this.$route.params.otherUserId,
        });
      }
      this.newMessage = "";
    },
  },
  computed: {
    messages() {
      return this.$store.state.auth.messages;
    },
  },
  

  created() {
    this.$store.dispatch("firebaseGetMessages", this.$route.params.otherUserId);
  },
  destroyed: {},
  watch: {
    $route(to, from) {
      this.$store.dispatch("firebaseStopMessages").then(() => {
        this.$store.state.auth.messages = {};
      });
      this.$store.dispatch(
        "firebaseGetMessages",
        this.$route.params.otherUserId
      );
    },
  },
};
</script>


<style lang="scss" scoped>
.chat {
  overflow: hidden;
  padding-top: 10px;
  width: 74vw;
  display: grid;
  grid:
    "chat-input" 93vh
    "chat-message-list" 5vh;
}
.chat-message-list {
  grid-area: "chat-message-list";
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // align-items: flex-end;
}
.chat-input {
  border-top: 1px solid gray;
  grid-area: "chat-input";
  overflow: hidden;
}
.chat-input > input {
  padding: 9px 14px;

  height: 100%;
  width: 90%;

  &:focus {
    outline: none;
  }
}
.send-button {
  color: white;
  background-color: #afb7c2;
  height: 102%;
  width: 10%;
}

//Messages
.sent-message {
  margin-right: 5px;
  margin-left: 100px;
}
.sent-message .message-text {
  background-color: #505050;
  color: white;
  border-radius: 14px 14px 0 14px;
}
.message-text {
  padding: 9px 14px;
}
.message-date {
  color: #777;
}
.received-message {
  color: white;
  margin-left: 5px;
  margin-right: 100px;
  border-radius: 4px;
}
.received-message .message-text {
  background-color: #f9a06a;
  border-radius: 14px 14px 14px 0;
}
</style>