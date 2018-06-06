import axios from 'axios'
import store from '@/store/store'

export default (url) => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
