import Vue from 'vue' 


export default { 
    setUser (state, payload) { 
        state.user = data
    }
}

export default { 
    setContact (state, payload) { 
        state.user.contacts.push(payload.userID); 
    }
}