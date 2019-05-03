/**
 * 公共方法
 */

import {getPinYinFirstCharacter} from '@/assets/js/pinyin';

export default {
  install(Vue, opts) {
    // 判断是否是微信浏览器
    Vue.prototype.isWeChat = function() {
      return /micromessenger/.test(navigator.userAgent.toLowerCase());
    }
    
    // 获取系统配置
    Vue.prototype.getConfig = function() {
      return this.$api.getConfig()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setConfig', res.data);
        }
        return res.data;
      })
    }

    // 获取用户信息
    Vue.prototype.getUserInfo = function() {
     return  this.$api.getUserInfo()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setUserInfo', res.data);
          this.$store.commit('setHasLogin', true);
        }
        return res;
      });
    }

    // 判断路径是否是绝对路径
    Vue.prototype.getImgURL = function(url) {
      if (url && /^[http|www]/.test(url)) {
        return url;
      } else {
        return this.$store.state.baseImgURL + url;
      }
    }

    // 格式化数据 保留两位
    Vue.prototype.format = function(value, keep) {
      keep = keep || 2;
      if (typeof value == 'undefined' || value == null || isNaN(value)) {
        return value;
      }
      return parseFloat(Number(value).toFixed(keep));
    }


    // 获取聊天列表
    Vue.prototype.getChatList = function() {
      return this.$api.getChatList()
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('setChatList', res.data);
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    }


    // 修改未读消息为已读状态
    Vue.prototype.readChat = function(id) {
      this.$api.readChat({id: id})
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('readChatList', {uid: id});
        }
      })
    }


    // 获取通讯录列表
    Vue.prototype.getContactList = function() {
      return this.$api.getContactList()
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('setContactList', this.formatContact(res.data));
          this.$store.commit('setTotalContactNum', res.data.length);
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    }


    // 格式化通讯录数组
    Vue.prototype.formatContact = function(data) {
      var result = {};
      var charArr = [];
      var res = {};

      data.forEach((item) => {
        var key = getPinYinFirstCharacter(item.username).substr(0,1).toUpperCase();
        if (typeof result[key] == 'undefined') {
          result[key] = [];
          charArr.push(key);
        }
        result[key].push(item);
      });

      // 排序
      charArr.sort();
      charArr.forEach((val) => {
        res[val] = result[val];
      })

      return res;
    }


    // 修改视图缓存状态
    Vue.prototype.changeKeepAlive = function(name, status) {
      var routes = this.$router.options.routes;
      for (var i = routes.length - 1; i >= 0; i--) {
        if (routes[i].name == name) {
          routes[i].meta.keepAlive = status;
          break;
        }
      }
    }

  }
}