<template>
  <v-container align-content-center justify-center>
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
        <div>
          <v-tooltip bottom>
            <v-btn flat href="#">
              <i class="material-icons mx-1">
                add_alert
              </i>
            </v-btn>
            <span>Follow</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn flat href="#">
              <i class="material-icons mx-1">
                person_add
              </i>
            </v-btn>
            <span>Add contact</span>
          </v-tooltip>
      </div></li>
    </ul>
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
