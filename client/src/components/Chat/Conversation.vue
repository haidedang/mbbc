<template>
  <div>
    <div class="message" v-scroll-bottom="session.messages">
      <ul v-if="session">
        <li v-for="item in session.messages" :key="item">
          <!--<p class="time">
            <span>{{ item.date | time }}</span>
          </p> -->
          <div class="main" :class="{ self: item.self }">
            <img class="avatar" width="30" height="30" :src="src" />
            <div class="text">{{ item.content }}
              <sub>{{ item.date | time }}</sub></div>
          </div>
        </li>
      </ul>
    </div>
  <div class="textArea">
    <textarea placeholder="Ctrl + Enter" v-model="content" ></textarea>
  </div>
  </div>
</template>

<script>
/* import Text from "@/components/Chat/Text"; */
import {mapState} from 'vuex'

export default {
  name: "Conversation",
  data() {
    return {
      src: "../static/ferhat.jpg",
      session: {
        messages: {
          1: {
            date: "11:23",
            content: "Hello"
          },
          2: {
            date: "11:25",
            content: "Are you my twin?"
          }
        }
      },
      content:''
    };
  },
  computed: { 
      ...mapState(["isUserLoggedIn", "user", "conversation"])
  }
};
</script>

<style scoped lang="less">
.message {
  padding: 10px 15px;
  overflow-y: scroll;
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
