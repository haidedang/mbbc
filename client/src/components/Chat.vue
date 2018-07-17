 <template>
  <v-layout> 
      <form id="form" >
            <v-text-field v-model="input" type="text" @keydown.enter="submit"></v-text-field>
            <!-- <v-btn @click="submit" value="Send"></v-btn> -->
            <v-text-field v-model="recipient" placeholder="recipient" type="text"></v-text-field>
        </form>
  <!--<router-view></router-view>-->
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/UserService";
import $ from "jquery";
import io from "socket.io-client";
import AuthService from "@/services/web3";

let socket = null;

export default {
  name: "Profile",
  data() {
    return {
      recipient: "",
      input: "",
      address: "",
      userID: "",
      src: "../static/ferhat.jpg"
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  beforeCreate: function() {
    /*  console.log(this.user);
   socket = io.connect('http://localhost:8081');
   socket.on('connect', function() {
     socket.emit('username', {username: this.user})
  
  console.log('Connected! ID: ' + socket.id);
}); 

   socket.on('online', function(data){
     console.log('received')
   } ) */
  },
  created() {
    console.log("Here " + this.user.userID);
    let userName = this.user.userID;
    socket = io.connect(this.user.storageAddress);
    socket.on("connect", function() {
      socket.emit("username", { username: userName });

      console.log("Connected! ID: " + socket.id);
    });

    socket.on("online", function(data) {
      console.log("received");
    });
    socket.on("reply", function(data) {
      console.log(data);
    });
  },

  methods: {
    show() {
      console.log(this.user);
    },
    async submit() {
      socket.emit("message", {
        userID: this.user,
        sentTo: this.recipient,
        message: this.input,
        socket: socket.id
      });
      console.log(this.recipient);
      let url = await AuthService.searchUser(this.recipient);
      console.log(url);
      $.post(
        url + "/conversation/" + this.recipient,
        {
          userID: this.user,
          sentTo: this.recipient,
          message: this.input
        },
        response => {
          console.log(response);
        }
      );

      this.input ='';
    }
  }
};
</script>

<style>
img {
  width: 30%;
}
small {
  color: dimgray;
}
</style>
 