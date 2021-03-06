import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// strict: true
const plugins =  [
  createPersistedState()
]

const initialState = {
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
  friend: false,
  blogNotification: null
}

const state =  initialState;

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins
})
