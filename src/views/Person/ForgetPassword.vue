<template>
  <section class="page forget-page">

    <div class="page-hd"><img class="img-logo" src="../../assets/img/person/logo.jpg"></div>

    <div class="page-bd">
      <form @submit.prevent='submit' novalidate>
        <mt-field class='input-container' v-model="form.phone" type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container captcha-container' v-model="form.smsCode" type='text' placeholder='请输入验证码'>
          <button v-if='leftTime <= 0' class="mint-button btn-captcha mint-button--normal" type='button' @click='getSms'>获取短信验证码</button>
          <button v-else class="mint-button btn-show-captcha mint-button--normal" type='button' disabled>{{leftTime}}s后重新获取</button>
        </mt-field>
        <mt-field class='input-container' v-model="form.password" type='password' placeholder='请输入新密码(6~16位字母和数字组合)'></mt-field>

        <input type="submit" class="mint-button btn-primary mint-button--primary mint-button--large" value="确 定">
      </form>
    </div>

  </section>
</template>


<script>
export default {
  name: 'ForgetPassword',
  data() {
    return {
      form: {
        phone: '',
        smsCode: '',
        password: '',
      },
      timer: '', //计时器
      leftTime: 0,
    }
  },

  methods: {
    // 获取短信验证码
    getSms() {
      var smsForm = {
        phone: this.form.phone,
        type: 1,
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
    submit() {
      if (this.validate(this.form)) {
        this.$api.forgetPassword(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '修改成功', duration: 1500});
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

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.$store.state.hasLogin) {
        vm.$router.back();
      }
    })
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.forget-page {
  .page-hd {
    height: 2rem;
    .img-logo {
      height: 100%;
      width: 100%;
    }
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
  }
}
</style>