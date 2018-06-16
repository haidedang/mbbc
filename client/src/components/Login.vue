<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="card">
        <div class="card-title green darken-1 py-1">
          <h5 class="my-auto">Login</h5>
        </div>
        <div class="card-body">
          <v-text-field
            label="userID"
            v-model="userID"
          ></v-text-field>
          <!-- <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field> -->
          <br>
          <div class="danger-alert" v-html="error" />
          <br>
          <v-btn
            dark
            class="green darken-1"
            @click="login">
            Login
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import AuthService from "@/services/web3";

export default {
  data() {
    return {
      userID: "",
      error: null
    };
  },
  beforeCreate: function() {
    AuthService.init();
  },
  methods: {
    async login() {
      let url = await AuthService.searchUser(this.userID);
      console.log(url);
      let response = await AuthenticationService.login(url);
      console.log(response);
      console.log(response.user.storageAddress);

      this.$store.dispatch("setToken", response.token);
      this.$store.dispatch("setUser", response.user);
      console.log(response.user.userID);
      this.$router.push({
        path: `/profile/${response.user.userID}`
      });
    }
  }
};
</script>

<style scoped>
h5 {
  color: white;
}
</style>
