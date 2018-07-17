<template>
<div>
    <v-layout >
        <ul >
          <li v-for='item in this.blog' :key="item._id" >
            <v-flex>
              <v-card>
                <v-card-title>
                  <h5 class="mb-0">{{item.userID}}</h5>
                  <div class="mt-0">
                    <p class="timestamp">{{item.createdAt}}</p>
                    <p class="mt-2">{{item.content}} </p>
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
    ...mapState(["user", 'blog'])
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

<style lang = 'less' scope>
ul {
  list-style-type: none;
  width: 100%;
}

p{
  text-align: left;
}
.timestamp {
  font-size: small;
  color: darkgrey;
}

</style>
