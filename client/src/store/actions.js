import UserService from '../services/UserService'

export const getProfile = ({ commit }, contact) => {
    UserService.getUser(contact.url, contact.id)
        .then((result) => {
            /* commit('addUser', result);  */
            commit('setProfile', result) // result = new User! 
            console.log(result);
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