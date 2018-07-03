<template>
  <div>
   <!--  <div class="message" v-scroll-bottom="session.messages"> -->
    <ul>
        <li v-for="friendRequest in friendRequests" :key="friendRequest.id">
            <div><p>{{friendRequest.sender}}</p></div>
            <v-btn @click="accept(friendRequest)">Accept</v-btn>
            <v-btn>Deny</v-btn>
        </li>
    </ul> 
    <div class= "message" id="messages" >
      <ul v-if="session">
        <li v-for="item in messages" :key="item.id">
          <div class="main" :class="{self: kek(item)} ">
            <img class="avatar" :src="src" />
            <div class="text">{{ item.body }}
             <!--<sub>{{ item.timestamp | time }}</sub> -->
            </div>
          </div>
        </li>
      </ul> 
    </div>
    
    <div class="textArea">
      <textarea placeholder="Write your Message here" v-model="input" @keydown.enter="submit" ></textarea>
    </div>
  </div>
</template>

<script>
/* import Text from "@/components/Chat/Text"; */
import { mapState } from "vuex";
import UserService from "@/services/UserService";
import $ from "jquery";
import io from "socket.io-client";
import AuthService from "@/services/web3";
import { mapGetters } from "vuex";
import store from "@/store/store";
import AuthenticationService from "../../services/AuthenticationService";

let socket = null;

export default {
  name: "Conversation",
  data() {
    return {
      src: "../static/ferhat.jpg",
      /* friendRequests: [{id:1}, {id:2}], */
      session: {
        messages: []
      },
      input: ""
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "conversation", "friendRequests"]),
    ...mapGetters({ messages: "currentMessages" })
  },
  created() { 
      $.get(
        this.user.storageAddress + `/api/users/${this.user.userID}`,
        response => {
          console.log('Created Component with ' ,response);
          this.$store.dispatch( 'setUser',response )
        }
      );
  },
  mounted() {
    /*   console.log("conversation", this.conversation); */
    console.log("Here " + this.user.userID);
    /*   let recipient = this.conversation[0].participants[1]; */
    let userName = this.user.userID;
    socket = io.connect(this.user.storageAddress);
    socket.on("connect", function() {
      socket.emit("username", { username: userName });

      console.log("Connected! ID: " + socket.id);
    });
    socket.on("online", function(data) {
      console.log("received");
    });

    // --------- MESSAGING------------
    socket.on("reply", function(data) {
      console.log("you received a message:", data);
      // add to Frontend
      store.dispatch("sendMessage", {
        conversationId: data.conversationId,
        author: data.author,
        body: data.body,
        timestamp: data.timestamp
      });

    });
    // ---------- FRIEND REQUEST----------
    socket.on("friendRequest", data => {
      console.log(data);
      store.dispatch("receiveFriendRequest", data);
    });

  },
  destroyed() {
    socket.close();
  },
  watch: {
    messages: function() {
      var container = this.$el.querySelector("#messages");
      setTimeout(function() {
        console.log(container.scrollHeight);
        container.scrollTop = container.scrollHeight;
      }, 1);
    }
  },
  methods: {
    kek(item) {
      var test = JSON.parse(localStorage.getItem("vuex"));
      if (item.author == test.user.userID) {
        return true;
      } else {
        return false;
      }
    },
    show() {
      console.log(this.user);
    },

    //Sender
    async submit() {
      // send to own Server
      socket.emit("message", {
        conversationId: this.conversation[0]._id,
        author: this.user.userID,
        body: this.input
      });
      let url = await AuthService.searchUser(
        this.conversation[0].participants[1]
      );
      console.log(url);
      // TODO: Refactor with /n and API service
      // send to friends Server

      $.post(
        url + "/conversation/" + this.conversation[0].participants[1],
        {
          conversationId: this.conversation[0]._id,
          author: this.user.userID,
          body: this.input,
          timestamp: Date.now()
        },
        response => {
          console.log(response);
        }
      );

      // add to FrontEnd
      this.$store.dispatch("sendMessage", {
        conversationId: this.conversation[0]._id,
        author: this.user.userID,
        body: this.input,
        timestamp: Date.now()
      });
      this.input = "";
    },
    async accept(friendRequest) {
      let url = await AuthService.searchUser(friendRequest.sender);
      friendRequest.accept = true;

      // Add Contact to own Server
      this.$store.dispatch("addContact", {
        url: this.user.storageAddress,
        id: this.user.userID,
        recipient: friendRequest.sender,
        body: {userID: friendRequest.sender, storageAddress:friendRequest.storageAddress}
      });
    
    // Create a new Conversation on own Server 
      $.post(
        this.user.storageAddress +`/api/conversation/new/${this.user.userID}/${friendRequest.sender}`,
        friendRequest,
        response => {
          console.log(response);
        }
      );

      // Add  on the other Server
      let response = await AuthenticationService.login(
        url,
        `/receiveFriendRequest/auth/${friendRequest.sender}/${
          this.user.userID
        }/`,
        '/friendRequest/',
        'POST',
        {accept: friendRequest.accept,
        conversationID:friendRequest.conversationID,
        userID:this.user.userID,
        storageAddress:this.user.storageAddress}
      );

      console.log(response);
      this.$store.dispatch("removeFriendRequest", friendRequest);
    }
  },
  filters: {
    time(date) {
      if (typeof date === "string") {
        var date = new Date(date);
      }
      return date.getHours() + ":" + date.getMinutes();
    }
  }
};
</script>

<style scoped lang="less">
.message {
  padding: 10px 15px;
  overflow-y: auto;
  width: 100%;
  height: 75vh;
  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;
    > span {
      display: inline-block;
      padding: 0 13px;
      font-size: 10px;
      color: #fff;
      border-radius: 2px;
      background-color: #43a047;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
    width: 30px;
    height: 30px;
  }
  .text {
    float: left;
    position: relative;
    padding: 0 10px;
    max-width: ~"calc(100% - 40px)";
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    color: #fff;
    background-color: #43a047;
    border-radius: 4px;
    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #43a047;
    }
  }
  .self {
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      float: right;
      background-color: #b2e281;
      display: inline-block;
      word-wrap: break-all;
      line-height: 2.5;
      font-size: 12px;
      position: relative;
      &:before {
        position: absolute;
        top: 9px;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}

.textArea {
  height: 15vh;
  border-top: solid 1px #ddd;
  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }
}
</style>
