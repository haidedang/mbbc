import Api from '@/services/Api'

export default {

  addContact (url, userID) {
    return Api().get(url +`/users/${userID}`)
  },

  getUser(url, userID) { 
      
      return Api().get(url +`/users/${userID}`)
  }



  //getUser 

  // sendMessage 

  // getConversations 

  // getConversation 

  //getMessages 


}
