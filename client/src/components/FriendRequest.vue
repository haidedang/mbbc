<template>
<div v-if="friend" class="friendBox">
 <ul>
        <li v-for="friendRequest in friendRequests" :key="friendRequest.id">
            <div><p>{{friendRequest.sender}}</p></div>
            <v-btn @click="accept(friendRequest)">Accept</v-btn>
            <v-btn>Deny</v-btn>
        </li>
    </ul>
</div>

</template>

<script>
import { mapState } from "vuex";
import AuthenticationService from "../services/AuthenticationService";
import AuthService from "@/services/web3";
import $ from "jquery";

export default {
  computed: {
    ...mapState(["friend", "friendRequests","user"])
  },
  methods: {
      async accept(friendRequest) {
      let url = await AuthService.searchUser(friendRequest.sender);
      friendRequest.accept = true;

      // Add Contact to own Server
      this.$store.dispatch("addContact", {
        url: this.user.storageAddress,
        id: this.user.userID,
        recipient: friendRequest.sender,
        body: {
          userID: this.user.userID,
          name: friendRequest.sender,
          storageAddress: friendRequest.storageAddress
        }
      });

      // Create a new Conversation on own Server
      $.post(
        this.user.storageAddress +
          `/api/conversation/new/${this.user.userID}/${friendRequest.sender}`,
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
        "/friendRequest/",
        "POST",
        {
          accept: friendRequest.accept,
          conversationID: friendRequest.conversationID,
          userID: friendRequest.sender,
          name: this.user.userID,
          storageAddress: this.user.storageAddress
        }
      );

      console.log(response);
      this.$store.dispatch("removeFriendRequest", friendRequest);
    }
  }
};
</script>
<style scoped>
.friendBox {
  position: fixed;
  height: 200px;
  margin-left: 200px;
  margin-top: 20px;
  width: 300px;
  background-color: white;
}
</style>
