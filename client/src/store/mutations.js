import Vue from 'vue'
import CircularJSON from 'circular-json';
/* import { setCurrentConversation, clearContacts } from './actions'; */


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
  setBlogs(state, response) {
    state.blogs = response;
  },
  setProfile(state, response) {
    state.profile = response
  },
  setCurrentConversation(state, response) {
    state.conversation = response
  },
  setCurrentMessages(state, response) {
    console.log(response)
    response.data.message.forEach((message) => {
      state.messages.push(message)
    })

  },
  showFriends(state, response) { 
    state.friend = !response;
  },
  clearConversation(state, response) {
    state.conversation = response
  },
  clearMessages(state, messages) {
    state.messages = []
  },
  receiveFriendRequest(state, response) {
    state.friendRequests.push(response);
  },
  removeFriendRequest(state, response) {
    let newArray = state.friendRequests.filter((friendRequest) => {
      friendRequest.sender !== response.sender
    })
    state.friendRequests = newArray;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  setContacts(state, response) {
    console.log('beginning of setting contacts', response)
    let val = false;
    let distinctURL = []
    response.forEach(contact => distinctURL.push(contact.storageAddress));
    let unique = [...new Set(distinctURL)];
    unique.forEach(contact => {
      state.endpoints.push({ endpoint: contact, token: '', authenticated: false });
    })
    state.contacts = response;
    console.log('new endpoints Array', state.endpoints);
  },
  setChatToken(state, response) {
    let result = state.endpoints.filter((contact) => contact.endpoint == response.user.storageAddress)[0]
    result.authenticated = true;
    result.token = response.token;
    state.currentEndpoint = result;
  },
  clearContacts(state, response) {
    state.endpoints = response;
  },
  clearState(state) { 
    state = {
      token: null,
      user: null,
      profile: null,
      isUserLoggedIn: false,
      url: null,
      conversation: null,
      friendRequests: [],
      messages: [] ,
      blog: [],
      contacts : [],
      endpoints:[],
      currentEndpoint: null,
      friend: false
    }
  }
}

