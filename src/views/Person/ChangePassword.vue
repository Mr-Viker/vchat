<template>
  <section class="page change-password-page">
    <!-- <div class="page-hd"><img class="img-logo" src="../../assets/img/person/logo.jpg"></div> -->
        
    <div class="page-bd">
      <form @submit.prevent='submit' novalidate>
        <mt-field class='input-container' v-model="form.oldPassword" type='password' placeholder='请输入旧密码'></mt-field>
        <mt-field class='input-container' v-model="form.password" type='password' placeholder='请输入新密码(6~16位字母和数字组合)'></mt-field>
        <mt-field class='input-container' v-model="form.confirmPassword" type='password' placeholder='请再次输入新密码'></mt-field>

        <input type="submit" class="mint-button btn-primary mint-button--primary mint-button--large" value="确 定">
      </form>
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'ChangePassword',
  data() {
    return {
      form: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
    };
  },

  created() {},

  methods: {
    submit() {
      if (this.validate(this.form)) {
        this.$api.editPassword(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '更新成功', duration: 1500});
            setTimeout(() => {
              this.$router.back();
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    }
  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.change-password-page {
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
    .btn-primary {
      margin-top: .2rem;
      background-color: @green;
    }
  }
}
</style>