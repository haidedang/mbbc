<template>
<v-layout>
<v-flex>
  <input class ="userName" placeholder="username" v-model = "userName"/>
  <input class="domain" placeholder=".eth"/>
  <v-btn  @click="registerDomain">Register Ethereum ID</v-btn> 
</v-flex> 
<v-flex> 
  
</v-flex> 
<!-- <v-flex> 
  <button @click="searchUser">Search User </button>
</v-flex> -->

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

.domain { 
  background-color: rgb(167, 166, 166); 
  width:30px;
}

.userName {
  border: 0.5px solid rgb(167, 166, 166); 
}

</style>
