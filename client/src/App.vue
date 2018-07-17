<template>
  <div id="app">
    <v-app>
      <pageHeader id = "header"/>
      <FriendRequest id = "friendRequest"/>
      <main id = "main">
        <div class="mt-5">
          <router-view></router-view>
        </div>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import FriendRequest from "@/components/FriendRequest.vue";
import $ from "jquery";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import store from "@/store/store";
import io from "socket.io-client";

let socket = null;

export default {
  name: "app",
  components: {
    PageHeader,
    FriendRequest
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "user",
      "conversation",
      "friendRequests",
      "currentEndpoint"
    ]),
    ...mapGetters({ messages: "currentMessages" })
  },
  created() {
    console.log(this.user);
  },
  mounted() {
    let that = this;
    console.log("here", this.user.userID);
    socket = io.connect(this.user.storageAddress);
    socket.on("connect", function() {
      socket.emit("username", { username: that.user.userID });
      console.log("Socket APPContainer ID: " + socket.id);
    });

    socket.on("friendRequest", data => {
      console.log("FriendRequest sendet!:", data);
      store.dispatch("receiveFriendRequest", data);
    });

    socket.on('blogEntry', data => {
      console.log('new Blog entry received')
      console.log('unread BlogEntries:' , data);
      store.dispatch('setBlogNotifications', data);
    })
  },
  destroyed() {
    console.log("destroy App socket");
    socket.close();
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

// doesnt work
#header {
  z-index: 2;
}

#friendRequest {
  z-index: 3;
}

#main   {
  z-index: 1;
}

/* main{
  z-index:1;
} */
.main {
  overflow: hidden;
  margin-top: 10vh;
}

.danger-alert {
  color: red;
}
</style>
