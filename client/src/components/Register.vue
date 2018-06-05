<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="card">
        <div class="card-heading py-1 green darken-1">
          <h5 class="my-auto">Register</h5>
        </div>
        <div class="card-body">
          <form
            name="tab-tracker-form"
            autocomplete="off">
            <!-- <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field> -->
            <!--HAIDEDANG STUFF  -->
            <v-text-field
              label="userID"
              placeholder=" exampleID.eth"
              v-model="userID"
            ></v-text-field>

          </form>

          <div class="danger-alert" v-html="error" />

           <v-radio-group v-model="radios" :mandatory="false">
              <v-radio ref="storage1" color="red" label="DropStore.com" value="http://localhost:8081" @change="selectRadio1"></v-radio>
              <v-radio ref="storage2" color="blue" label="CryptoStorage.com" value="http://localhost:8082" @change="selectRadio2"></v-radio>
         </v-radio-group>

                 <br>
          <v-btn
            dark
            class="green darken-1"
            @click="registerUser">
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import App from "@/services/web3";
import $ from "jquery";

export default {
  data() {
    return {
      value:"",
      radios:"",
      userID: "",
      result: "",
      error: null
    };
  },
  beforeCreate: function() {
    App.init();
  },
  methods: {
    selectRadio1(){
      this.value =  this.$refs.storage1.value;
      console.log(this.value);
    },
    selectRadio2(){
      this.value =  this.$refs.storage2.value;
      console.log(this.value);
    },
    async registerUser() {
      this.result = await App.registerUser(this.userID,this.value);

      if (this.result) {
        $.post(
          this.value + "/register",
          { userID: this.userID, address: this.result, storageAddress: this.value },
          response => {
            console.log(response);
            this.$store.dispatch("setToken", response.token);
            this.$store.dispatch("setUser", response.user);
            this.$router.push({
              path: `/profile/${this.userID}`
            });
          }
        );
      }
    }
  }
};
</script>

<style scoped>
  h5{
    color:white;
  }
</style>
