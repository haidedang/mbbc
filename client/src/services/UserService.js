import Api from '@/services/Api'

export default {

    addContact(url, userID, recipient, body) {
        return Api().post(url + `/users/${userID}/${recipient}`,body)
    },

    getUser(url, userID) {
        return Api().get(url + `/users/${userID}`)
    },

    getConversationByUserIDs(url, userID, recipient){
        return Api().get(url + `/api/conversation/${userID}/${recipient}` )
    },

    getMessagesByConversationId(url, conversationId){
        return Api().get(url + `/api/messages/${conversationId}` )
    }



    //getUser 

    // sendMessage 

    // getConversations 

    // getConversation 

    //getMessages 


}
