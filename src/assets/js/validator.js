/**
 * 验证器
 * 在main.js使用Vue.use(..)调用后即可使用
 */

export default {
  install(Vue, opts) {
    Vue.prototype.validate = function(form) {
      return true;


      // 昵称
      if (form.hasOwnProperty('username')) {
        if (!form.username) {
          this.$toast('昵称不能为空');
          return false;
        }
      }

      // 手机号码
      if (form.hasOwnProperty('phone')) {
        if (!form.phone) {
          this.$toast('手机号码不能为空');
          return false;
        }
        if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(form.phone))) {
          this.$toast('手机号码不正确');
          return false;
        }
      }

      // 密码
      if (form.hasOwnProperty('password')) {
        if (!form.password) {
          this.$toast('密码不能为空');
          return false;
        }
        if (form.password.length < 6 || form.password.length > 12) {
          this.$toast('密码长度必须是6~12位');
          return false;
        }
        if (!(/^\w{6,12}$/.test(form.password))) {
          this.$toast('密码格式不正确');
          return false;
        }
      }

      // 确认密码
      if (form.hasOwnProperty('passwordAgain')) {
        if (!form.passwordAgain) {
          this.$toast('确认密码不能为空');
          return false;
        }
        if (form.passwordAgain != form.password) {
          this.$toast('两次输入的密码不一致');
          return false;
        }
      }

      // 昵称
      if (form.hasOwnProperty('smsCode')) {
        if (!form.smsCode) {
          this.$toast('短信验证码不能为空');
          return false;
        }
      }

      return true;
    }
  }
}