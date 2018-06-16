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
            <p>{{this.profile.address}}</p>
          </div>
          <div class="form-group">
            <h2>Username</h2>
            <h4>{{this.profile.userID}}</h4>
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
import { mapState } from "vuex";
import UserService from "@/services/UserService";
import $ from "jquery";
import axios from "axios";
import Api from "../services/Api";
import AuthService from "@/services/web3";

export default {
  name: "Profile",
  data() {
    return {
      address: "",
      userID: "",
      src: "../static/ferhat.jpg"
    };
  },
  beforeCreate: function() {
    AuthService.init();
  },
  computed: {
    ...mapState(["isUserLoggedIn", "profile", "token", "user", "url"]),
    avatarSize() {
      return "180px";
    }
  },
  created: async function() {
    console.log("wait");
    if (!this.isUserLoggedIn) {
      return;
    }
    try {
      let url = await AuthService.searchUser(this.$route.params.id);
      this.$store
        .dispatch("getProfile", { url: url, id: this.$route.params.id })
        .then(result => {});
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    show() {
      this.$store.dispatch("addContact", {
        url: this.user.storageAddress,
        id: this.user.userID,
        recipient: this.profile.userID
      });
    }
  }
};
</script>

<style>
img {
  width: 30%;
}
small {
  color: dimgrey;
}
</style>
