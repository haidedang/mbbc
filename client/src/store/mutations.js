import Vue from 'vue' 

export default { 
    addContact (state, payload) { 
        state.user.contacts.push(payload.userID); 
    }
}