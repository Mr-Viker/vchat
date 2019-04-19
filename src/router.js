import Vue from 'vue'
import Router from 'vue-router'

import Chat from '@/views/Chat/Chat'

import Contact from '@/views/Contact/Contact'

import Find from '@/views/Find/Find'


import Person from '@/views/Person/Person'
// const Register = () => import('@/views/Person/Register')
// const Login = () => import('@/views/Person/Login')
// const Personal = () => import('@/views/Person/Personal')
// const ChangePassword = () => import('@/views/Person/ChangePassword')
// const ForgetPassword = () => import('@/views/Person/ForgetPassword')



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat,
      meta: {
        title: '微信',
        showHd: true,
        showTab: true,
        showBack: false,
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        title: '通讯录',
        showHd: true,
        showTab: true,
        showBack: false,
      }
    },
    {
      path: '/find',
      name: 'Find',
      component: Find,
      meta: {
        title: '发现',
        showHd: true,
        showTab: true,
        showBack: false,
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        title: '我',
        showHd: true,
        showTab: true,
        showBack: false,
      }
    },




    // 必须放最后
    {
      path: '*',
      redirect: '/'
    },
  ]
})
