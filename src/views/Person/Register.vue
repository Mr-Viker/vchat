<template>
  <section class="page register-page">

    <div class="page-hd flex-v">
      <v-uploader input-name='file' :multi='true' @uploaded='uploaded'></v-uploader>
    </div>
    
    <div class="page-bd">
      <form @submit.prevent='register' novalidate>
        <mt-field class='input-container' v-model="form.username" type='text' placeholder='请输入用户名'></mt-field>
        <mt-field class='input-container' v-model="form.phone" type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container captcha-container' v-model="form.smsCode" type='text' placeholder='请输入验证码'>
          <button v-if='leftTime <= 0' class="mint-button btn-captcha mint-button--normal" type='button' @click='getSms'>获取短信验证码</button>
          <button v-else class="mint-button btn-show-captcha mint-button--normal" type='button' disabled>{{leftTime}}s后重新获取</button>
        </mt-field>
        <mt-field class='input-container' v-model="form.password" type='password' placeholder='请输入密码(6~16位字母和数字组合)'></mt-field>

        <input type="submit" class="mint-button btn-primary mint-button--primary mint-button--large" value="立刻注册">
      </form>

      <router-link class="btn-to-login text-center" to='/login'>已有账号？立即登录</router-link>
    </div>
  </section>
</template>


<script>
import VUploader  from '@/components/VUploader';

export default {
  name: 'Register',
  components: { VUploader },
  data() {
    return {
      form: {
        phone: '',
        smsCode: '',
        password: '',
        avatar: '',
      },
      leftTime: 0, //短信验证码倒计时
      timer: '', //计时器
    }
  },

  methods: {
    // 读取头像后
    uploaded(res) {
      this.form.avatar = res.data[0];
    },

    // 获取短信验证码
    getSms() {
      var smsForm = {
        phone: this.form.phone,
        type: 0,
      };
      if (this.validate(smsForm)) {
        this.$api.getSms(smsForm)
        .then(res => {
          if (res.code === '00') {
            this.leftTime = 60;
            this.timer = setInterval(() => {
              if (this.leftTime <= 0) {
                clearInterval(this.timer);
                return;
              } else {
                this.leftTime--;
              }
            }, 1000);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 表单提交
    register(ev) {
      if (this.validate(this.form)) {
        this.$api.register(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('注册成功');
            setTimeout(() => {
              this.$router.push({name: 'Login'});
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },


  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.register-page {
  .page-hd {
    height: 2rem;
    background: #fff url("../../assets/img/person/logo.jpg") center/cover no-repeat;
  }

  .page-bd {
    margin-top: .3rem;
    padding: 0 .2rem;
    .input-container {
      border-radius: .1rem;
      margin-bottom: .1rem;
      min-height: .42rem;
    }
    .captcha-container {
      .mint-button {
        font-size: .12rem;
        background: none;
        border-left: 1px solid @border-c;
      }
      .btn-show-captcha {
        color: @gray;
      }
    }
    .btn-primary {
      margin-top: .2rem;
      background-color: @green;
    }
    .btn-to-login {
      display: block;
      margin-top: .4rem;
      text-align: center;
      color: @blue;
    }
  }
}
</style>
