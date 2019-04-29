<template>
  <section class="page login-page">

    <div class="page-hd flex-v">
      <div class="v-uploader">
        <img :src="getImgURL(avatar)" alt="" v-if='avatar' class="img-response">
        <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-response" v-else>
      </div>
    </div>
    
    <div class="page-bd">
      <form @submit.prevent='login' novalidate>
        <mt-field class='input-container' v-model="form.phone" type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container' v-model="form.password" type='password' placeholder='请输入密码(6~16位字母和数字组合)'></mt-field>

        <input type="submit" class="mint-button btn-primary mint-button--primary mint-button--large" value="登 录">
      </form>

      <div class="link-container">
        <router-link to='/register'>前往注册</router-link>
        <router-link to='/forgetPassword'>忘记密码</router-link>
      </div>
    </div>
  </section>
</template>


<script>
import axios from '@/assets/js/http';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
      avatar: '',
    }
  },

  watch: {
    'form.phone'(newVal, oldVal) {
      if (newVal.length == 11) {
        this.$api.getAvatar({phone: newVal})
        .then(res => {
          if (res.code == '00') {
            if (res.data) {
              this.avatar = res.data.avatar;
            }
          }
        })
      }
    }
  },

  methods: {
    // 表单提交
    login() {
      if (this.validate(this.form)) {
        this.$api.login(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '登录成功', duration: 1000});
            
            window.localStorage.setItem('token', res.data.token);
            axios.defaults.headers.token = 'bearer ' + res.data.token;

            this.getUserInfo()
            .then(res => {
              setTimeout(() => {
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect);
                } else {
                  this.$router.push({name: 'Person'});
                }
                window.location.reload();
              }, 500);
            })

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

.login-page {
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
    .btn-primary {
      margin-top: .2rem;
      background-color: @green;
    }

    .link-container {
      display: flex;
      margin-top: .4rem;
      justify-content: space-between;
      a {
        color: @blue;
      }
    }
  }
}
</style>