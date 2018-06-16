import Vue from 'vue'


export default {
    setUser(state, response) {
        state.user = response
    },
   /*  setContact(state, payload) {
        state.user.contacts.push(payload.userID);
    }, */
    setToken(state, token) {
        state.token = token
        state.isUserLoggedIn = !!(token)
    },
    setURL(state, url) {
        state.url = url
    },
    setProfile(state, response) {
        state.profile = response
    }
}

