import Vue from 'vue'
import Router from 'vue-router'
import Api from '@/assets/js/api';

import ChatList from '@/views/Chat/ChatList'
const Chat = () => import('@/views/Chat/Chat')


import Contact from '@/views/Contact/Contact'
const NewFriend = () => import('@/views/Contact/NewFriend')
const AddContact = () => import('@/views/Contact/AddContact')
const PersonalDetail = () => import('@/views/Contact/PersonalDetail')


import Find from '@/views/Find/Find'
const Moment = () => import('@/views/Find/Moment')
const CreateMoment = () => import('@/views/Find/CreateMoment')
const MomentDetail = () => import('@/views/Find/MomentDetail')


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
        keepAlive: true,
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
        keepAlive: true,
      }
    },
    {
      path: '/find',
      name: 'Find',
      component: Find,
      meta: {
        title: '广场',
        showHd: false,
        showTab: true,
        showBack: false,
        requireAuth: true,
        keepAlive: true,
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
        keepAlive: true,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: true,
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
        keepAlive: true,
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
        keepAlive: false,
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
        keepAlive: false,
      },
      beforeEnter: (to, from, next) => {
        Api.getUserInfo({id: to.query.id})
        .then(res => {
          if (res.code == '00') {
            to.meta.title = res.data.username;
            to.query.username = res.data.username;
            to.query.avatar = res.data.avatar;
          }
          next();
        }).catch(err => {
          next();
        })
      }
    },
    {
      path: '/createMoment',
      name: 'CreateMoment',
      component: CreateMoment,
      meta: {
        title: '记录中',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
        keepAlive: false,
      }
    },
    {
      path: '/moment',
      name: 'Moment',
      component: Moment,
      meta: {
        title: '记忆',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
        keepAlive: true,
      }
    },
    {
      path: '/momentDetail',
      name: 'MomentDetail',
      component: MomentDetail,
      meta: {
        title: '详情',
        showHd: true,
        showTab: false,
        showBack: true,
        requireAuth: true,
        keepAlive: false,
      }
    },


    // 必须放最后
    {
      path: '*',
      redirect: '/'
    },
  ],

  scrollBehavior (to, from, savedPosition) {
    // 好像因为使用了keepAlive缓存视图，所以scrollBehavior表现的有些不同
    // keepAlive为true的页面共用一个savedPosition

    // savedPosition是to最后的位置信息 首次是null 以后每次都是window.pageXOffset和window.pageYOffset
    // console.log('scrollBehavior: ', savedPosition);

    // 共有四种情况
    // 1.不缓存->不缓存 此时savedPosition为0 滚动到顶部 
    // 2.不缓存->缓存 此时的savedPosition为to页面上次滚动的位置，赋值给to.meta.savedPosition 然后滚动到to.meta.savedPosition 这也是scrollBehavior默认行为
    // 3.缓存->缓存 此时的savedPosition为当前window滚动的位置信息，赋值给from.meta.savedPosition 然后滚动到to.meta.Position 没有则滚动到顶部
    // 4.缓存->不缓存 此时savedPosition为0 滚动到顶部 
    if (to.meta.keepAlive) {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = savedPosition;
        if (to.meta.savedPosition) {
          return to.meta.savedPosition;
        }
      } else {
        to.meta.savedPosition = savedPosition;
        return to.meta.savedPosition;
      }
    }
    return { x: 0, y: 0 };
  }
})
