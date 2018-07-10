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
    },

    getTweetsFromUser(url){
        return Api().get(url + '/api/tweets/')
    },

    getContactsByUserId(url, userId){
        return Api().get(url + `/api/user/${userId}/contacts`)
    }


    //getUser

    // sendMessage

    // getConversations

    // getConversation

    //getMessages


}
