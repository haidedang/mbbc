import Api from '@/services/Api'
import { getConversationsByUserIDs } from '../../../server/src/controllers/ConversationController';

export default {

    addContact(url, userID, recipient) {
        return Api().get(url + `/users/${userID}/${recipient}`)
    },

    getUser(url, userID) {
        return Api().get(url + `/users/${userID}`)
    },

    getConversationByUserIDs(url, userID, recipient){
        return Api().get(url + `api/conversation/${userID}/${recipient}` )
    }



    //getUser 

    // sendMessage 

    // getConversations 

    // getConversation 

    //getMessages 


}
