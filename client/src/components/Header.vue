<template>
  <v-toolbar fixed class="green darken-1" dark>
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
      <v-btn dark flat @click.stop="openMyDialog()">Find Contact</v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'conversation'
        }">
        Messaging
      </v-btn>
    </v-toolbar-items>

     <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'profile'
        }">
        Blog
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
        Search
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
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { bus } from "../main"; // import the bus from main.js or new file
import AuthenticationService from "@/services/AuthenticationService";
import AuthService from "@/services/web3";

export default {
  beforeCreate: async function() {
    await AuthService.init();
  },
  methods: {
    openMyDialog() {
      bus.$emit("dialog", true); // emit the event to the bus
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "songs"
      });
    },
    async login() {
      let userID = await AuthService.getNameForReverseAddress();
      let url = await AuthService.searchUser(userID);
      let response = await AuthenticationService.login(url);
      console.log(response);
      console.log(response.user.storageAddress);
      this.$store.dispatch("setToken", response.token);
      this.$store.dispatch("setUser", response.user);
      this.$store.dispatch("setURL", response.user.storageAddress);
      console.log(response.user.userID);
      this.$router.push({
        path: `/profile/${response.user.userID}`
      });
    }
  }
};
</script>
<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #e9e;
}
</style>
