<template>
  <v-container fluid>
    <v-layout row wrap justify-content-center>
      <ul>
        <li>
          <v-avatar :size="avatarSize">
            <img v-bind:src="src" id="thumbnail" alt="Thumbnail">
          </v-avatar>
        </li>
        <li class="my-3">
          <label>ID:</label>
          {{id}}
        </li>
        <li class="my-3">
          <label>Username</label>
          {{username}}
        </li>
        <li>
          <div class="row justify-content-between">
            <a class="btn btn-primary" href="#">
              <i class="material-icons mx-1">
                add_alert
              </i>
              Follow
            </a>
            <a class="btn btn-primary" href="#">
              <i class="material-icons mx-1">
                person_add
              </i>
              Add contact
            </a>
        </div></li>
      </ul>

    </v-layout>
  </v-container>
</template>


<script>
    export default {
        name: "UserProfile",
        data: function () {
          return {
            src: '../static/ferhat.jpg',
            id: 'SomeRandomID',
            username: 'Ferhat',
          }
        },
        computed: {
          avatarSize(){
            return '180px'
          }
        }
    }
</script>

<style scoped>
  ul{
    list-style:none;
  }
  label{
    font-weight:bold;
  }
</style>
