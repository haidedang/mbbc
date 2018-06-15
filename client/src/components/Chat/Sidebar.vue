<template>
  <div>
    <aside class="sidebar" >
      <div>
        <ul>
          <li>
            <img class="rounded-circle mt-0" v-bind:src="src" id="thumbnail" alt="Thumbnail">
          </li>
          <li class="my-3">
            <h6>{{id}}</h6>
          </li>
        </ul>
      </div>
      <v-divider></v-divider>
      <v-list style="background-color: transparent">
        <v-list-tile 
        v-for="contact in contacts" 
        :key="contact" 
        avatar
        @click="show(contact)">
          <!--<v-list-tile-avatar>
            <img :src="">
          </v-list-tile-avatar>-->
        <v-list-tile-content>
            <v-list-tile-title v-text="contact"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </aside>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  created() {
    console.log(JSON.parse(localStorage.getItem("vuex")));
    console.log(this.user)
  },
  data() {
    return {
      dialog: false,
      src: "../static/ferhat.jpg",
      id: JSON.parse(localStorage.getItem("vuex")).user.userID,
      /* contacts: JSON.parse(localStorage.getItem("vuex")).user.contacts */
      contacts: this.user.contacts
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  methods: {
    show(contact) {
        console.log(this.user)
      console.log(contact);
    }
  }
};
</script>

<style scoped>
.sidebar {
  flex: 1 0 30%;
  height: 100%;
  overflow-y: auto;
  min-width: 50%;
  width: fit-content;
  padding: 50px 30px;
  box-sizing: border-box;
  border-right: 1px solid #43a047;
}
img {
  height: auto;
  width: 80px;
}
ul {
  list-style-type: none;
}
</style>
