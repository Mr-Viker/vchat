import Vue from 'vue'
import Router from 'vue-router'

import ChatList from '@/views/Chat/ChatList'
const Chat = () => import('@/views/Chat/Chat')


import Contact from '@/views/Contact/Contact'
const NewFriend = () => import('@/views/Contact/NewFriend')
const AddContact = () => import('@/views/Contact/AddContact')
const PersonalDetail = () => import('@/views/Contact/PersonalDetail')


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
      name: 'ChatList',
      component: ChatList,
      meta: {
        title: '聊天',
        showHd: true,
        showTab: true,
        showBack: false,
        requireAuth: true,
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
        requireAuth: true,
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
        requireAuth: true,
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        title: '我',
        showHd: false,
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
    {
      path: '/newFriend',
      name: 'NewFriend',
      component: NewFriend,
      meta: {
        title: '新的朋友',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
      }
    },
    {
      path: '/addContact',
      name: 'AddContact',
      component: AddContact,
      meta: {
        title: '添加好友',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
      }
    },
    {
      path: '/personalDetail',
      name: 'PersonalDetail',
      component: PersonalDetail,
      meta: {
        title: '详细资料',
        showHd: false,
        showTab: false,
        showBack: true,
        requireAuth: true,
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        title: '',
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
