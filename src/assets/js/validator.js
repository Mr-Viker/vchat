/**
 * 验证器
 * 在main.js使用Vue.use(..)调用后即可使用
 */

export default {
  install(Vue, opts) {
    Vue.prototype.validate = function(form) {
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

      // 旧密码
      if (form.hasOwnProperty('oldPassword')) {
        if (!form.oldPassword) {
          this.$toast('旧密码不能为空');
          return false;
        }
        if (form.oldPassword.length < 6 || form.oldPassword.length > 16) {
          this.$toast('旧密码长度必须是6~16位');
          return false;
        }
        if (!(/^\w{6,16}$/.test(form.oldPassword))) {
          this.$toast('旧密码格式不正确');
          return false;
        }
      }

      // 密码
      if (form.hasOwnProperty('password')) {
        if (!form.password) {
          this.$toast('密码不能为空');
          return false;
        }
        if (form.password.length < 6 || form.password.length > 16) {
          this.$toast('密码长度必须是6~16位');
          return false;
        }
        if (!(/^\w{6,16}$/.test(form.password))) {
          this.$toast('密码格式不正确');
          return false;
        }
      }

      // 确认密码
      if (form.hasOwnProperty('confirmPassword')) {
        if (!form.confirmPassword) {
          this.$toast('确认密码不能为空');
          return false;
        }
        if (form.confirmPassword != form.password) {
          this.$toast('两次输入的密码不一致');
          return false;
        }
      }

      // 短信验证码
      if (form.hasOwnProperty('smsCode')) {
        if (!form.smsCode) {
          this.$toast('短信验证码不能为空');
          return false;
        }
      }

      // 内容
      if (form.hasOwnProperty('content')) {
        if (!form.content) {
          this.$toast('内容不能为空');
          return false;
        }
      }

      return true;
    }
  }
}