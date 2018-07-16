<template>
<div>
    <v-layout>
        <ul>
          <li>
            <v-flex>
              <v-card>
                <v-card-title>
                  <h5 class="mb-0">Ferhat.eth</h5>
                  <div class="mt-0">
                    <p class="timestamp">December 12. 2017</p>
                    <p class="mt-2"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </li>
        </ul>
    </v-layout>
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
  }/*,
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
  }*/
};
</script>

<style lang="less" scoped>
ul {
  list-style-type: none;
}

p{
  text-align: left;
}
.timestamp {
  font-size: small;
  color: darkgrey;
}
</style>
