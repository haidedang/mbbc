<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <!-- <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
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
import App from '@/services/web3'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  beforeCreate: function(){ 
    App.init();
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
    let response = await AuthenticationService.login();
   
    //  if (response){ 
    //     $.post('http://localhost:8081/login', {userID:this.userID}, (response) => {
    //       console.log(response);
       this.$store.dispatch('setToken', response.token)
       this.$store.dispatch('setUser', response.user)
       console.log(response.user)
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
