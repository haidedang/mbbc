 <template>

  <v-layout v-if="isUserLoggedIn">

    <div class="container">
      <div class="row">
        <form class="mx-auto mt-5">
          <a href="#" class="mx-auto d-flex justify-content-center">
            <!-- <img v-bind:src="src" class="img-thumbnail rounded-circle" alt="Thumbnail"> -->
          </a>
          <div class="form-group">
            <h2>Ethereum ID</h2>
            <p>{{this.address}}</p>
          </div>
          <div class="form-group">
            <h2>Username</h2>
            <h4>{{this.userID}}</h4>
            <small>This is needed for Contacts to reach you</small>
          </div>
          <v-btn @click="show">Follow</v-btn>
        </form>
      </div>
    </div>
  </v-layout>

  <!--<router-view></router-view>-->
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import $ from 'jquery'

export default {
  name: 'Profile',
  data () {
    return {
      address:'',
      userID:'',
      src: '../static/ferhat.jpg',
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    avatarSize(){
      return '180px'
    }
  },
  created:function() {

      console.log('wait')
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        $.get(
          "http://localhost:8081/users/"+this.$route.params.id).then((result)=>{
            console.log(result);
            this.userID = result.user.userID;
            this.address = result.user.address;
            console.log(this.userID)
          })

      } catch (err) {
        console.log(err)
      }
    },
  methods: { 
    show() {
      console.log(this.user);
    }
  },
}
</script>

<style>
  img{
    width:30%;
  }
  small{
    color:dimgrey;
  }
</style>
