<template>
<v-layout>
<input placeholder="username" v-model = "userName"/>
<v-flex> 
  <button @click="registerDomain">Register Ethereum ID</button> 
</v-flex> 
<v-flex> 
  <button @click="searchUser">Search User </button>
</v-flex>

</v-layout>
</template>

<script>
import App from '@/services/web3' 
 
export default {
  data(){
    return { 
      userName:''
    }
  },
  beforeCreate: function(){
    App.init()
  },
  methods:{ 
   async registerDomain(){ 
     let response =  App.registerDomain(this.userName); 
     console.log(response);
    },
    searchUser(){ 
      App.searchUser(this.userName); 
    }
  }
}
</script>

<style scoped>
</style>
