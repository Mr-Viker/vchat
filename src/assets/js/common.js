/**
 * 公共方法
 */

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


  }
}