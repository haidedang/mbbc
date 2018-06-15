import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'

Vue.use(Vuex)

// strict: true
const plugins =  [
  createPersistedState()
]

const state =  {
  token: null,
  user: null,
  isUserLoggedIn: false,
  url: null
}

const mutations=  {
  setToken (state, token) {
    state.token = token
    state.isUserLoggedIn = !!(token)
  },
  setUser (state, user) {
    state.user = user
  },
  setURL(state, url) { 
    state.url = url 
  },
  setProfile (state, payload) { 
    state.user = payload.data.user 
}
}


export default new Vuex.Store({
    state,
    mutations, 
    actions,
    plugins
})
