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

}