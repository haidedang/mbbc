import UserService from '../services/UserService'

export const getProfile = ({ commit }, contact) => {
    UserService.getUser(contact.url, contact.id)
        .then((result) => {
            console.log(result);
            commit('setProfile', result.data.user) // result = new User! 
        })
}

export const getBlogs = ({ commit }, contact) => {
    UserService.getTweetsFromUser(contact.url)
        .then((result) => {
            console.log(result);
            commit('setBlogs', result.data.tweets)
        })
}

export const addContact = ({ commit }, contact) => {
    console.log('DONE')
    UserService.addContact(contact.url, contact.id, contact.recipient)
        .then((result) => {
            console.log('Reached')
            console.log('RESULT',result)
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

export const clearMessages = ({commit}, messages) => { 
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

// store.dispatch('addContact')