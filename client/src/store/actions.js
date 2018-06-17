import UserService from '../services/UserService'

export const getProfile = ({ commit }, contact) => {
    UserService.getUser(contact.url, contact.id)
        .then((result) => {
            console.log(result);
            commit('setProfile', result.data.user) // result = new User! 
        })
}

export const addContact = ({commit}, contact) => { 
    UserService.addContact(contact.url, contact.id, contact.recipient)
        .then((result) => { 
            console.log(result)
            if(result == undefined){ 
                return; 
            } else { 
                commit('setUser', result.data.user); 
            }
        })  
}

export const setCurrentConversation = ({commit}, conversation) => { 
    UserService.getConversationByUserIDs(conversation.url, conversation.id, conversation.recipient)
        .then((result) =>  {
            console.log(result)
            commit('setCurrentConversation', result.data.conversation); 
            /*  commit('setCurrentConversation', ) */
        })
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

// store.dispatch('addContact')