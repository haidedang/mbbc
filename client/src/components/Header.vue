<template>
  <v-toolbar fixed class="cyan" dark>
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
          name: 'profile'
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
        :to="{
          name: 'login'
        }">
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
  import {bus} from '../main' // import the bus from main.js or new file
  export default {
  methods: {
    openMyDialog () {
      bus.$emit('dialog', true) // emit the event to the bus
    },
    logout () {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>
<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #E9E;
}
</style>
