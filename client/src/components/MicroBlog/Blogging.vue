<template>
    <div>
        BLOG
    </div>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/UserService";
import $ from "jquery";
import io from "socket.io-client";
import AuthService from "@/services/web3";
import { mapGetters } from "vuex";
import store from "@/store/store";
import AuthenticationService from "../../services/AuthenticationService";

let socket = null;

export default {
  computed: {
    ...mapState(["user"])
  },
  created() {
    console.log("Contacts: " + this.user.contacts);
    let userName = this.user.userID;
    socket = io.connect(this.user.storageAddress);
    socket.on("connect", function() {
      socket.emit("username", { username: userName });

      console.log("Connected! ID: " + socket.id);
    });
    socket.on("online", function(data) {
      console.log("received");
    });
  }
};
</script>