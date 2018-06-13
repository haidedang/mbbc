<template>
<v-layout>
<v-flex>
  <input class ="userName" placeholder="username" v-model = "userName"/>
  <input class="domain" placeholder=".eth"/>
  <v-btn  @click="registerDomain">Register Ethereum ID</v-btn> 
  <v-btn  @click="getAddressOfDomain">Get DomainAddress</v-btn> 
  <v-btn  @click="getUserName">get UserName</v-btn> 
  <v-btn  @click="getNameForReverseAddress">get name for Reverse Address</v-btn> 
   <v-btn  @click="setAddressOfDomain">Set Address of ETHID</v-btn> 
    <v-btn  @click="setNameForReverseAddress">set name for Reverse Address</v-btn> 
     <v-btn  @click="claimEnsNodeHash">claim Node Hash</v-btn>
     <v-btn  @click="setRootNode">set Root Node</v-btn>
     <v-btn  @click="setChildNode">set Child Node</v-btn>
</v-flex> 
<v-flex> 
  
</v-flex> 
<!-- <v-flex> 
  <button @click="searchUser">Search User </button>
</v-flex> -->

</v-layout>
</template>

<script>
import App from "@/services/web3";

export default {
  data() {
    return {
      userName: "",
      nodeHash:
        "0xaf4873840c3199340a08d48953e09c04675eab9e546d495597f7b0397ba9e9eb"
    };
  },
  beforeCreate: function() {
    App.init();
  },
  methods: {
    async registerDomain() {
      let response = App.registerDomain(this.userName);
      console.log(response);
    },
    searchUser() {
      App.searchUser(this.userName);
    },
    async getAddressOfDomain() {
      let response = await App.getAddressOfDomain(this.userName);
      console.log(response);
    },
    async setAddressOfDomain() {
      let response = App.setAddressOfDomain(this.userName);
      console.log(response);
    },
    async setNameForReverseAddress() {
      let response = await App.setNameForReverseAddress(this.userName);
      console.log(response);
    },
    async getNameForReverseAddress() {
      let response = await App.getNameForReverseAddress();
      console.log(response);
      return response;
    },
    async claimEnsNodeHash() {
      let response = await App.claimEnsNodeHash();
      console.log(response);
    },
    setRootNode() {
      App.setRootNode();
    },
    setChildNode() {
      App.setChildNode();
    },
    async getUserName(){
       let response = await App.getUserName();
       console.log(response);
    }
  }
};
</script>

<style scoped>
.domain {
  background-color: rgb(167, 166, 166);
  width: 30px;
}

.userName {
  border: 0.5px solid rgb(167, 166, 166);
}
</style>
