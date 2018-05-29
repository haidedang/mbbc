import Api from '@/services/Api'

export default {
  index (userID) {
    return Api.get(`user/${userID}`)
  }
}
