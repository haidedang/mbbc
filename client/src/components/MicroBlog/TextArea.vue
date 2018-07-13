<template>
<div class="d-flex">
    <v-layout>
        <v-flex>
          <div class="text">
            <textarea placeholder="Blog Here .." autofocus v-model="input" @keydown.enter="postBlog"></textarea>
         </div>
        </v-flex>
    </v-layout>
    </div>
</template>

<script>
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
    data() {
        return {
            input: "",
            recipient: "",
            address: "",
            userID: ""
        }
    },
    computed: {
        ...mapState([
        "user",
        "contacts",
        "endpoints"
        ])
        /*contacts() {
            console.log("contacts computedben");
            return this.store.mapState.contacts;
        }*/
    },
    created(){
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
        setCurrentConversation(contact) {
            let Contact = this.contacts.filter(item => item.name == contact)[0];
            console.log(Contact);
            let Endpoint = this.endpoints.filter(
                endpoint => endpoint.endpoint == Contact.storageAddress
            )[0];
            console.log(Endpoint);
            // CHeck if the token for that Endpoint exists if not, ask for that token first

            this.$store
                .dispatch("setCurrentConversation", {
                url: this.user.storageAddress,
                id: this.user.userID,
                recipient: contact
                })
                .then(conversation => {
                console.log("conversationID from Server", conversation[0]._id);
                this.$store.dispatch("setCurrentMessages", {
                    url: this.user.storageAddress,
                    id: conversation[0]._id
                });
                })
                .then(() => {
                if (!Endpoint.authenticated) {
                this.$store.dispatch("setChatToken", Contact);
            }
                });
            },
        async postBlog(event) {
            //event.preventDefault();
            console.log("You Pressed Enter")
            
            //this.sendBlog(this.input)
            //this.input=''
            console.log(this.contacts);
            console.log(this.user);
            console.log(this.input);
            
            //Sending new blog entry to server for storing
            socket.emit("blog", {
                userID: this.user,
                content: this.input
            });

            this.contacts.forEach(async (contact) => {
                let url = await AuthService.searchUser(contact.userID);

                //let url = await AuthService.searchUser(this.recipient);
                console.log("Sending message to the server: " + url + " of user: " + contact.userID);
                //Sending request to server of contact
                $.post(
                    url + "/blogs/" + contact.userID,
                    {
                        userID: this.user
                    },
                    response => {
                    console.log(response);
                })
            });
            
            //Sending post request to servers from contactlist

        //Sending blog notification to recipient server
        /*router.route('/blogs/:recipient')
            .post(BlogController.sendNotification)*/
        }
    }
    };
</script>
<style lang="less">
.text {
  height: 160px;
  margin-bottom: 1vh;
  textarea {
    padding: 2vh;
    height: 100%;
    width: 70%;
    border-style: solid;
    border-width: 2px;
    border-color: #43a047;
    outline: none;
    resize: none;
  }
}
</style>
