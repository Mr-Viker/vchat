import Vue from 'vue'
import Vuex from 'vuex'
import CONFIG from '@@/config';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: CONFIG.baseURL,
    baseImgURL: CONFIG.baseImgURL,
    config: {}, //系统配置
    hasLogin: false, //登录状态
    userInfo: {}, //用户信息
    contactList: null, //通讯录列表
    chatNum: 0, //最新消息数
    addContactNum: 0, //最新添加好友请求消息数
  },

  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },

    setHasLogin(state, payload) {
      state.hasLogin = payload;
    },

    setUserInfo(state, payload) {
      state.userInfo = payload;
    },

    updateUserInfo(state, payload) {
      for(var key in payload) {
        state.userInfo[key] = payload[key];
      }
    },

    setContactList(state, payload) {
      state.contactList = payload;
    },

    setNewChatNum(state, payload) {
      state.chatNum = payload;
    },

    setNewAddContactNum(state, payload) {
      state.addContactNum = payload;
    },

  },

  actions: {

  }
})
