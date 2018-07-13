<template>
    <v-toolbar fixed class="green darken-1 d-flex pb-1 header" dark>
        <v-toolbar-title class="mr-4">
            <router-link
            class="home"
            tag="span"
            :to="{
              name: 'login'
            }">
            Blockchat
          </router-link>
        </v-toolbar-title>

        <v-toolbar-items>
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            :to="{
              name: 'profile'
            }">
            <font-awesome-icon icon="user"></font-awesome-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            :to="{
              name: 'search'
            }">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            @click="showFriendRequest"
           >
            <font-awesome-icon icon="user-friends"></font-awesome-icon>

          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            v-if="!$store.state.isUserLoggedIn"
            flat
            dark
            @click="login">
            Login
          </v-btn>

          <v-btn
            v-if="!$store.state.isUserLoggedIn"
            flat
            dark
            :to="{
              name: 'register'
            }">
            Sign Up
          </v-btn>

          <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            @click="logout">
            <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
          </v-btn>
        </v-toolbar-items>
      <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      class="green lighten-2 bot-nav"
      >
        <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'blogging'
          }">
        Blog
        </v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          flat
          dark
          :to="{
            name: 'conversation'
          }">
           <font-awesome-icon icon="comments"></font-awesome-icon>
        </v-btn>
      </v-bottom-nav>
    </v-toolbar>

</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
import { bus } from "../main"; // import the bus from main.js or new file
import AuthenticationService from "@/services/AuthenticationService";
import AuthService from "@/services/web3";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faSearch,
  faComments,
  faSignOutAlt,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faSearch, faComments, faSignOutAlt, faUserFriends);

export default {
  beforeCreate: async function() {
    await AuthService.init();
  },
  computed: {
    ...mapState(["user", "friend"])
  },
  methods: {
    openMyDialog() {
      bus.$emit("dialog", true); // emit the event to the bus
    },
    logout() {
      // Clear State and set back to initial State
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("clearMessages", []);
      this.$store.dispatch("clearContacts", []);
      this.$store.dispatch("resetState");
      this.$router.push({
        name: "songs"
      });
      this.$store.dispatch("clearConversation", null);
    },
    showFriendRequest() {
      this.$store.dispatch("clicked", this.friend);
    },
    async login() {
      let that = this;
      let userID = await AuthService.getNameForReverseAddress();
      let url = await AuthService.searchUser(userID);
      let response = await AuthenticationService.login(
        url,
        "/auth/",
        "/login/"
      );
      console.log(response);
      console.log(response.user.storageAddress);

      await this.$store.dispatch("setToken", response.token);
      await this.$store.dispatch("setUser", response.user);
      await this.$store.dispatch("setFriendList", response);
      await this.$store.dispatch("setContacts", {
        url: response.user.storageAddress,
        userID: response.user.userID
      });
      console.log(response.user.userID);
      $.ajax({
        url:
          this.user.storageAddress +
          `/api/users/${this.user.userID}/friendRequests`,
        type: "GET",
        success: data => {
          console.log("GOT IT ", data);
          that.$store.dispatch('setFriends', data);
        }
      });
      this.$router.push({
        path: `/profile/${response.user.userID}`
      });
    }
  }
};
</script>
<style scoped>
.bot-nav {
  height: 4vh;
  position: absolute;
}
.darken-1 {
  height: 10vh;
}

.home {
  cursor: pointer;
}

.home:hover {
  color: #e9e;
}
</style>
