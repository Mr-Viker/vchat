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
    newChatNum: 0, //最新消息数
    newAddContactNum: 0, //最新添加好友请求消息数
    totalContactNum: 0, //通讯录好友总数
    chatList: [], //聊天列表
    recordList: [], //聊天记录
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

    setNewChatNum(state, payload) {
      state.newChatNum = payload;
    },

    setNewAddContactNum(state, payload) {
      state.newAddContactNum = payload;
    },

    setTotalContactNum(state, payload) {
      state.totalContactNum = payload;
    },

    setContactList(state, payload) {
      state.contactList = payload;
    },

    // delContactList(state, payload) {
    //   var key = payload.key;
    //   var index = payload.index;
    //   state.contactList[key].splice(index, 1);
    // },

    // addContactList(state, payload) {
    //   var key = payload.key;
    //   var item = payload.item;
    //   if (!state.contactList[key]) {
    //     state.contactList[key] = [];
    //   }
    //   state.contactList[key].push(item);
    // },

    setChatList(state, payload) {
      state.chatList = payload;
    },

    // 添加一个未读消息到聊天列表
    addNewChatList(state, payload) {
      var key = -1;
      state.newChatNum = state.newChatNum + 1;
      state.chatList.forEach(function(item, index) {
        if (item.uid == payload.uid) {
          var num = state.chatList[index]['new_chat_num'];
          state.chatList[index] = payload;
          state.chatList[index]['new_chat_num'] = num + 1;
          key = index;
        }
      });
      // 把当前项放入数组第一项
      if (key != -1) {
        state.chatList.unshift(state.chatList.splice(key, 1)[0]);
      } else {
        state.chatList.unshift(payload);
      }
    },

    addChatList(state, payload) {
      console.log('addChatList payload: ', payload);
      var key = -1;
      state.chatList.forEach(function(item, index) {
        if (item.uid == payload.uid) {
          var num = state.chatList[index]['new_chat_num'];
          state.chatList[index] = payload;
          state.chatList[index]['new_chat_num'] = num;
          key = index;
        }
      });
      // 把当前项放入数组第一项
      if (key != -1) {
        state.chatList.unshift(state.chatList.splice(key, 1)[0]);
      } else {
        state.chatList.unshift(payload);
      }
    },

    delChatList(state, payload) {
      state.chatList.forEach(function(item, index) {
        if (item.uid == payload.uid) {
          state.chatList.splice(index, 1);
          state.newChatNum = state.newChatNum - item.new_chat_num;
        }
      });
    },

    readChatList(state, payload) {
      state.chatList.forEach(function(item, index) {
        if (item.uid == payload.uid) {
          state.newChatNum = state.newChatNum - item.new_chat_num;
          state.chatList[index]['is_read'] = 1;
          state.chatList[index]['new_chat_num'] = 0;
        }
      });
    },

    setRecordList(state, payload) {
      state.recordList = payload;
    },

    pushRecordList(state, payload, ) {
      console.log('push: ', payload, state.recordList);
      state.recordList.push(payload);
    },

  },

  actions: {

  }
})
