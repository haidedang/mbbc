import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import User from '@/components/UserProfile'
import Profile from '@/components/Profile'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    {path: '/', name:'home', component:Register},
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/User/*',
      name: 'user',
      component: User
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
