import Vue from 'vue'
/* import { setCurrentConversation } from './actions'; */


export default {
    setUser(state, response) {
        state.user = response
    },
    setContact(state, payload) {
        state.user.contacts.push(payload);
    },
    setToken(state, token) {
        state.token = token
        state.isUserLoggedIn = !!(token)
    },
    setURL(state, url) {
        state.url = url
    },
    setProfile(state, response) {
        state.profile = response
    },
    setCurrentConversation(state, response) {
        state.conversation = response
    },
    setCurrentMessages(state, response) {
        console.log(response)
        response.data.message.forEach( (message) =>{
            state.messages.push(message)
        })

    },
    clearConversation(state, response){
        state.conversation  = response
    },
    clearMessages(state, messages){ 
        state.messages = []
    },
    receiveFriendRequest(state, response){ 
        state.friendRequests.push(response); 
    },
    removeFriendRequest(state,response){ 
      let newArray=  state.friendRequests.filter((friendRequest)=>{ 
            friendRequest.sender !== response.sender
        })
    state.friendRequests = newArray; 
    },
    addMessage(state, message) {
        state.messages.push(message);
    }
}

