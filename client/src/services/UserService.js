import Api from '@/services/Api'

export default {

    addContact(url, userID, recipient) {
        return Api().get(url + `/users/${userID}/${recipient}`)
    },

    getUser(url, userID) {
        return Api().get(url + `/users/${userID}`)
    },

    getConversationByUserIDs(url, userID, recipient){
        return Api().get(url + `/api/conversation/${userID}/${recipient}` )
    },

    getMessagesByConversationId(url, conversationId){
        return Api().get(url + `/api/messages/${conversationId}` )
    },
    
    getTweetsFromUser(url){
        return Api().get(url + '/api/tweets/')
    }


    //getUser 

    // sendMessage 

    // getConversations 

    // getConversation 

    //getMessages 


}
