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

}