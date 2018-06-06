import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import User from '@/components/UserProfile'
import Domain from '@/components/Domain'
import Search from '@/components/Search'
import Chat from '@/components/Chat'
import Message from '@/components/Message'
import Profile from '@/components/Profile'
import Contacts from '@/components/FindContact'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/chat', name: 'chat', component: Chat },
    { path: '/search', name: 'search', component: Search },
    { path: '/registerDomain', name: 'domain', component: Domain },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Register },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/User/*',
      name: 'user',
      component: User
    },
    {
      path: '/Message',
      name: 'message',
      component: Message
    },
    {
      path: '/Contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
