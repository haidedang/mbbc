 <template>
  <v-layout v-if="isUserLoggedIn"> 
      <v-flex md6>
          <v-text-field v-model="username" v-on:keyup.enter="submit" label=" exampleUser.eth" ></v-text-field>
           <v-list>
          <v-list-tile v-if="userExists" :key="username" avatar @click="search"  >
            <v-list-tile-action>
              <!-- <v-icon v-if="item.icon" color="pink">star</v-icon> -->
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="this.username"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <!-- <img :src="item.avatar"> -->
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-flex>
 
          
      
  <!--<router-view></router-view>-->
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import AuthService from "@/services/web3";
import Api from '../services/Api'; 

export default {
  name: 'Search',
  data(){
      return {
        username: '',
        userExists: false,
        items: [{title:"john"}]
      }
  },
  beforeCreate: function() {
    AuthService.init();
  },
  computed: { 
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: { 
      async submit(){
         console.log(this.username);
         let response =  await AuthService.searchUser(this.username); 
         console.log(response);
         response == '' ? this.userExists= false : this.userExists = true
         
      },
      async search(){
        let url =  await AuthService.searchUser(this.username);
        Api().get(url +"/users/"+this.username).then((result)=>{
            console.log(result);
            this.$router.push({
              path: `/profile/${this.username}`
            });
          })
          // $.get(
          // url +"/users/"+this.username).then((result)=>{
          //   console.log(result);
          //   this.$router.push({
          //     path: `/profile/${this.username}`
          //   });
          // })
          //TODO: open up profile 
          console.log('choosed');
      }
   
  }
}
</script>

<style>

</style>
 