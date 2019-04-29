/**
 * API请求
 */
import axios from '@/assets/js/http';

export default {
  // 获取系统设置
  getConfig(params) {
    return axios.post('/config', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 获取用户信息
  getUserInfo(params) {
    return axios.post('/user/info', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 获取短信验证码
  getSms(params) {
    return axios.post('/sms', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 用户注册
  register(params) {
    return axios.post('/user/register', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 用户登录
  login(params) {
    return axios.post('/user/login', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 忘记密码
  forgetPassword(params) {
    return axios.post('/user/forgetPassword', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 登出
  logout(params) {
    return axios.post('/user/logout', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 修改用户信息
  editUserInfo(params) {
    return axios.post('/user/editUserInfo', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 修改密码
  editPassword(params) {
    return axios.post('/user/editPassword', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 通讯录列表
  getContactList(params) {
    return axios.post('/contact/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 添加通讯录好友请求列表
  getAddContactList(params) {
    return axios.post('/contact/addList', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 添加通讯录好友请求列表
  editAddContact(params) {
    return axios.post('/contact/editAddContact', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取最新消息数
  getNewChatNum(params) {
    return axios.post('/chat/getNewChatNum', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取最新添加好友请求消息数
  getNewAddContactNum(params) {
    return axios.post('/contact/getNewAddContactNum', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 告知已读添加请求列表
  readAddContact(params) {
    return axios.post('/contact/readAddContact', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 搜索用户
  search(params) {
    return axios.post('/user/search', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 添加好友
  addContact(params) {
    return axios.post('/contact/add', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 绑定client_id和用户id
  bindUid(params) {
    return axios.post('/chat/bindUid', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 删除好友
  delContact(params) {
    return axios.post('/contact/del', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取聊天列表
  getChatList(params) {
    return axios.post('/chat/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 发送消息
  send(params) {
    return axios.post('/chat/send', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取聊天记录列表
  getChatRecord(params) {
    return axios.post('/chat/record', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 修改未读消息为已读状态
  readChat(params) {
    return axios.post('/chat/read', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },


  // 根据手机号获取头像
  getAvatar(params) {
    return axios.post('/user/avatar', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

}