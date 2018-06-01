<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
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
          class="cyan"
          @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import AuthService from '@/services/web3'

export default {
  data () {
    return {
      userID: '',
      error: null
    }
  },
  beforeCreate: function(){ 
    AuthService.init();
  },
  methods: {
  //  async login () { 
  //    App.login().then((result)=> { 
  //      if (result){
  //        this.$store.dispatch('setToken', 'j323fsdfseq'); 
  //        this.$router.push({ 
  //          name:'profile'
  //        })
  //      }
  //    });
  //     // this.$store.dispatch('setToken', response.data.token)
  //     // this.$store.dispatch('setUser', response.data.user)
  //     // this.$router.push({
  //     //   name:'songs'
  //     // })
  //   }

   async login(){ 
    let url =  await AuthService.searchUser(this.userID);
    console.log(url);
    let response = await AuthenticationService.login(url);
    console.log(response);
    console.log(response.user.storageAddress);
   
    //  if (response){ 
    //     $.post('http://localhost:8081/login', {userID:this.userID}, (response) => {
    //       console.log(response);
       this.$store.dispatch('setToken', response.token)
       this.$store.dispatch('setUser', response.user)
      this.$store.dispatch('setURL', response.user.storageAddress);
       console.log(response.user.userID)
       this.$router.push({
              path: `/profile/${response.user.userID}`
            })
    //     }); 
    //   } 

  }
 
  }
}
</script>

<style scoped>
</style>
