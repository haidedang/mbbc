<template>
  <div>
   <!--  <div class="message" v-scroll-bottom="session.messages"> -->
    <div class= "message">
      <ul v-if="session">
        <li v-for="item in messages" :key="item.id">
          <div class="main" :class="{ self: item.self }">
            <img class="avatar" width="30" height="30" :src="src" />
            <div class="text">{{ item.content }}
             <!--  <sub>{{ item.timestamp | time }}</sub> -->
            </div>
          </div>
        </li>
      </ul> 
    </div>
    
  <div class="textArea">
    <textarea placeholder="your message" v-model="input" @keydown.enter="submit" ></textarea>
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
import store from '@/store/store'



let socket = null;

export default {
  name: "Conversation",
  data() {
    return {
      src: "../static/ferhat.jpg",
      session: {
        messages: [
          {
            conversationId: "12312314121",
            date: "11:23",
            content: "Hello"
          },
          {
            conversationId: "32432234234",
            date: "11:25",
            content: "Are you my twin?"
          }
        ]
      },
      input: ""
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "conversation"]),
    ...mapGetters({ messages: "currentMessages" })
  },
  created() {
    console.log("Here " + this.user.userID);
    console.log(this.conversation[0].participants[1]);
    console.log(this.messages);
    let recipient = this.conversation[0].participants[1];
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
      store.dispatch("sendMessage", {
        conversationId: store.state.conversation[0]._id,
        author: store.state.conversation[0].participants[1],
        content: data,
        timestamp: Date.now()
      });
      
    });
  },
  methods: {
    show() {
      console.log(this.user);
    },
    async submit() {
      socket.emit("message", {
        conversationId: this.conversation[0]._id,
        author: this.user.userID,
        sentTo: this.conversation[0].participants[1],
        content: this.input,
        socket: socket.id
      });
      let url = await AuthService.searchUser(
        this.conversation[0].participants[1]
      );
      console.log(url);

      $.post(
        url + "/conversation/" + this.conversation[0].participants[1],
        {
          userID: this.user,
          sentTo: this.conversation[0].participants[1],
          message: this.input
        },
        response => {
          console.log(response);
        }
      );
      this.$store.dispatch("sendMessage", {
        conversationId: this.conversation[0]._id,
        author: this.user.userID,
        content: this.input,
        timestamp: Date.now()
      });

      this.input = "";
    }
  }
};
</script>

<style scoped lang="less">
.message {
  padding: 10px 15px;
  overflow-y: auto;
  width: 100%;
  height: 350px;
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
    max-width: 33px;
  }
  .text {
    float: left;
    display: inline-block;
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
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;
      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}

.textArea {
  height: 160px;
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
