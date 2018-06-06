 <template>
  <v-layout> 
      <form id="form" >
            <v-text-field v-model="input" type="text"></v-text-field>
            <v-btn @click="submit" value="Send"></v-btn>
        </form>
  <!--<router-view></router-view>-->
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import $ from 'jquery'
import io from 'socket.io-client'

let socket = null; 

export default {
  name: 'Profile',
  data () {
    return {
      input:'', 
      address:'',
      userID:'',
      src: '../static/ferhat.jpg',
    }
  },
  computed: { 
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
   beforeCreate: function() {
   socket = io.connect('http://localhost:8081'); 
   socket.emit('my other event', { my: 'dafaaf' });
   socket.on('online', )
  },
 
  methods: { 
    show() { 
      console.log(this.user);
    },
    submit() { 
        socket.emit('message', {
            userID: this.user, 
            sentTo: this.recipient, 
            message: this.input});
    }
  }
}
</script>

<style>
  img{
    width:30%;
  }
  small{
    color:dimgray;
  }
</style>
 