<template>
      <div class="card">
        <div class="card-heading py-1 green darken-1">
          <h5 class="my-auto">Register Domain</h5>
        </div>
        <div class="card-body">
          <form
            name="tab-tracker-form"
            autocomplete="off">
            <v-text-field
              label="userID"
              v-model="userID"
              suffix='.eth'
            ></v-text-field>
          </form>
          <div class="danger-alert" v-html="error" />
           <v-radio-group v-model="radios" :mandatory="false">
               <v-btn v-bind:class="{'green darken-1': DomainClicked}"  @click="registerDomain">Register Ethereum ID</v-btn> 
               <v-btn v-bind:class="{'green darken-1': StorageClicked}"  @click="setNameForReverseAddress">set name for Reverse Address</v-btn> 
           </v-radio-group>
         <br>
          <v-btn
            depressed 
            :disabled="!BothClicked" 
            :to="{name: 'storage'}">
            Select Storage
          </v-btn>
        </div>
      </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import App from "@/services/web3";
import $ from "jquery";

export default {
  data() {
    return {
      radios: "",
      userID: "",
      DomainClicked: false,
      StorageClicked: false,
      BothClicked: false, 
      error: null
    };
  },
  beforeCreate: function() {
    App.init();
  },
  methods: {
    async registerDomain() {
      let response = await App.registerDomain(this.userID);
      console.log(response);
      this.DomainClicked= true
      this.checkForClick(); 
      console.log(this.DomainClicked)
    },

    async setNameForReverseAddress() {
      let response = await App.setNameForReverseAddress(this.userID);
      console.log(response);
      this.StorageClicked = true; 
      console.log(this.StorageClicked)
      this.checkForClick();
      console.log(this.BothClicked);
    },
    checkForClick(){ 
        if (this.DomainClicked && this.StorageClicked){ 
            this.BothClicked = true; 
        } 
    }
  }
};
</script>

<style scoped>
h5 {
  color: white;
}
</style>
