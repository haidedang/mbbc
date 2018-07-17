import Vue from "vue";
import CircularJSON from "circular-json";
/* import { setCurrentConversation, clearContacts } from './actions'; */

export default {
  setFriends(state, response) {
    response.forEach(friend => {
      state.friendRequests.push(friend);
    });
    console.log("FRIENDS", state.friendRequests);
  },
  setUser(state, response) {
    state.user = response;
  },
  setContact(state, payload) {
    state.user.contacts.push(payload);
  },
  setToken(state, token) {
    state.token = token;
    state.isUserLoggedIn = !!token;
  },
  setURL(state, url) {
    state.url = url;
  },
  setBlogs(state, response) {
    state.blogs = response;
  },
  setProfile(state, response) {
    state.profile = response;
  },
  setCurrentConversation(state, response) {
    state.conversation = response;
  },
  setCurrentMessages(state, response) {
    console.log(response);
    response.data.message.forEach(message => {
      state.messages.push(message);
    });
  },
  showFriends(state, response) {
    state.friend = !response;
  },
  clearConversation(state, response) {
    state.conversation = response;
  },
  clearMessages(state, messages) {
    state.messages = [];
  },
  receiveFriendRequest(state, response) {
    state.friendRequests.push(response);
  },
  removeFriendRequest(state, response) {
    let newArray = state.friendRequests.filter(friendRequest => {
      friendRequest.sender !== response.sender;
    });
    state.friendRequests = newArray;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  setContacts(state, response) {
    console.log("beginning of setting contacts", response);
    let val = false;
    let distinctURL = [];
    response.forEach(contact => distinctURL.push(contact.storageAddress));
    let unique = [...new Set(distinctURL)];
    unique.forEach(contact => {
      state.endpoints.push({
        endpoint: contact,
        token: "",
        authenticated: false
      });
    });
    state.contacts = response;
    console.log("new endpoints Array", state.endpoints);
  },
  setChatToken(state, response) {
    let result = state.endpoints.filter(
      contact => contact.endpoint == response.user.storageAddress
    )[0];
    result.authenticated = true;
    result.token = response.token;
    state.currentEndpoint = result;
  },
  clearContacts(state, response) {
    state.endpoints = response;
  },
  clearState(state) {
    let initialState = {
      token: null,
      user: null,
      profile: null,
      isUserLoggedIn: false,
      url: null,
      conversation: null,
      friendRequests: [],
      messages: [],
      blog: [],
      contacts: [],
      endpoints: [],
      currentEndpoint: null,
      friend: false
    };
    Object.keys(initialState).forEach(key => {
      state[key] = initialState[key];
    });
    console.log(state);
  },
  setBlogNotifications(state, response) {
    state.blogNotification = response;
  },
  appendBlogEntries(state, response) {
    let longArray = [];
    let shortArray = [];

    if (response.Blog >= state.blog) {
      longArray = JSON.parse(JSON.stringify(response.Blog));
      shortArray = JSON.parse(JSON.stringify(state.blog));
    } else {
      longArray = JSON.parse(JSON.stringify(state.blog));
      shortArray = JSON.parse(JSON.stringify(response.Blog));
    }

    for (var i = 0; i < longArray.length; i++) {
      for (var j = 0; j < shortArray.length; j++) {
        if (JSON.stringify(longArray[i]) == JSON.stringify(shortArray[j])) {
          longArray.splice(i, 1);
          i = i - 1;
        }
      }
    }
    Array.prototype.push.apply(state.blog, longArray);
    console.log(state.blog);
  }
};
