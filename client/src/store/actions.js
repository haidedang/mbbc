import UserService from '../services/UserService'
import AuthentificationService from '../services/AuthenticationService'

export const getProfile = ({ commit }, contact) => {
  UserService.getUser(contact.url, contact.id)
    .then((result) => {
      console.log(result);
      commit('setProfile', result.data.user) // result = new User!
    })
}

export const getBlogs = ({ commit }, contact) => {
  UserService.getBlogsFromUser(contact.storageAddress, contact.name)
    .then((result) => {
      console.log(result);
      commit('appendBlogEntries', result.data)
    })
}

export const addContact = ({ commit }, contact) => {
  console.log('DONE')
  UserService.addContact(contact.url, contact.id, contact.recipient, contact.body)
    .then((result) => {
      console.log('Reached')
      console.log('RESULT', result)
      if (result == undefined) {
        return;
      } else {
        commit('setContact', contact.recipient);
      }
    })
}

export const setCurrentConversation = ({ commit }, conversation) => {
  return new Promise((resolve, reject) => {
    UserService.getConversationByUserIDs(conversation.url, conversation.id, conversation.recipient)
      .then((result) => {
        commit('setCurrentConversation', result.data.conversation);
        resolve(result.data.conversation)
        /*  commit('setCurrentConversation', ) */
      })
  })
}

export const setFriends = ({commit}, friends) => { 
  commit('setFriends', friends);
}

export const clearConversation = ({ commit }, conversation) => {
  commit('clearConversation', conversation)
}

export const removeFriendRequest = ({ commit }, friendRequest) => {
  commit('removeFriendRequest', friendRequest)
}

export const setCurrentMessages = ({ commit }, conversation) => {
  UserService.getMessagesByConversationId(conversation.url, conversation.id)
    .then((result) => {
      commit('setCurrentMessages', result)
    })
}

export const clearMessages = ({ commit }, messages) => {
  commit('clearMessages', messages)
}

export const receiveFriendRequest = ({ commit }, friendRequest) => {
  commit('receiveFriendRequest', friendRequest)
}

export const sendMessage = ({ commit }, message) => {
  commit('addMessage', message)
}

export const setURL = ({ commit }, url) => {
  commit('setURL', url)
}

export const setToken = ({ commit }, token) => {
  commit('setToken', token)
}

export const setUser = ({ commit }, user) => {
  commit('setUser', user)
}

export const setContacts = ({ commit }, contact) => {
  UserService.getContactsByUserId(contact.url, contact.userID)
    .then((result) => {
      console.log('setContacts', result)
      commit('setContacts', result.data.Contacts)
    })
}

export const clearContacts = ({commit}, contact) => {
  commit('clearContacts', contact)
}

export const resetState = ({commit}) => {
  commit('clearState');
}

export const clicked = ({commit}, friend) => { 
  commit('showFriends', friend);
}

/**
 *
 * @param {*} param0
 * @param {*} contact
 *  Authenticate for Messaging and get a Token for that endpoint
 */
export const setChatToken =  ({ commit }, contact) => {
  return new Promise((resolve, reject) => {
   AuthentificationService.login(
      contact.storageAddress,
      `/guestAuth/${contact.name}/`,
      '/guest/',
      'POST',
      contact
    ).then(response => {
        commit('setChatToken', response)
        console.log(response)
      })
  })

  // TOKEN RECEIVED, TO DO: Set the Chat TOken and authentication Flag
  //  FOR Users of your OWN server no need for that Shit build that logic !

  /* commit('setChatToken', contact) */
}
// store.dispatch('addContact')

export const setBlogNotifications = ({commit}, data) => { 
  commit('setBlogNotifications', data);
}

export const setBlogs = ({commit}, data) => { 
  commit('appendBlogEntries', data);
}
