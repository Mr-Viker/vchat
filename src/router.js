import Vue from 'vue'
import Router from 'vue-router'

import Chat from '@/views/Chat/Chat'

import Contact from '@/views/Contact/Contact'

import Find from '@/views/Find/Find'


import Person from '@/views/Person/Person'
const Register = () => import('@/views/Person/Register')
const Login = () => import('@/views/Person/Login')
const ForgetPassword = () => import('@/views/Person/ForgetPassword')
const Personal = () => import('@/views/Person/Personal')
const ChangePassword = () => import('@/views/Person/ChangePassword')



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
        requireAuth: false,
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
        requireAuth: false,
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
        requireAuth: false,
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
        requireAuth: true,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: false,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: false,
      }
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: '忘记密码',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: false,
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '个人信息',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
      }
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        title: '修改密码',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
      }
    },



    // 必须放最后
    {
      path: '*',
      redirect: '/'
    },
  ]
})
