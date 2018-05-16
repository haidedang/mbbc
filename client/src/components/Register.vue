<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
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
            v-model="userID"
          ></v-text-field>
          
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
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
      userID: '', 
      error: null
    }
  },
  beforeCreate: function(){ 
    App.init();
  },
  methods: {
    register: function() { 
      App.handleRegister(this.userID).then((result)=>{console.log(result)}).catch((err)=> {console.log(err)}); 
    }
    // async register () {
    //   try {
    //     const response = await AuthenticationService.register({
    //       email: this.email,
    //       password: this.password
    //     })
    //     this.$store.dispatch('setToken', response.data.token)
    //     this.$store.dispatch('setUser', response.data.user)
    //     this.$router.push({
    //       name: 'songs'
    //     })
    //   } catch (error) {
    //     this.error = error.response.data.error
    //   }
    // }
  }
}
</script>

<style scoped>
</style>
