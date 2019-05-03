<template>
  <section class="page personal-page">

    <div class="page-hd">
      <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='70' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='upload-container' crop="local" crop-ratio='1:1' :crop-btn="{ok:'确定','cancel':'取消'}">
        <mt-cell title="头像" class='hd-cell' is-link>
          <img :src="getImgURL(userInfo.avatar)" alt="" class="img-avatar" v-if='userInfo.avatar'>
          <!-- <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-avatar" v-else> -->
        </mt-cell>
      </vue-core-image-upload>
    </div>

    <div class="page-bd">
      <mt-cell title="昵称" :value='userInfo.username' is-link @click.native='usernamePickerVisible = true;' />
      <mt-cell title="手机号" :value='userInfo.phone' />
      <mt-cell title="微信号" :value='userInfo.vchat_id' />
      <mt-cell title="密码" value='修改密码' is-link to='/changePassword' />
      <mt-cell title="个性签名" :value='userInfo.signature' is-link @click.native='signaturePickerVisible = true;' />
      <mt-cell title="地区" :value='userInfo.area' is-link @click.native='addressPickerVisible = true;' />
      <mt-cell title="性别" :value='userInfo.sex == 1 ? "女" : "男"' is-link  @click.native='sexPickerVisible = true;'/>
    </div>

    <div class="btn-submit-container">
      <mt-button type="danger" size='large' class='btn-primary' @click.native='logout'>退出登录</mt-button>
    </div>
    


    <!-- 省市选择器 -->
    <address-picker :visible='addressPickerVisible' v-on:confirm='selectAddress' v-on:cancel='cancelAddressPicker'></address-picker>
    <!-- 性别选择器 -->
    <sex-picker :visible='sexPickerVisible' v-on:confirm='selectSex' v-on:cancel='cancelSexPicker'></sex-picker>
    <!-- 用户名弹框 -->
    <username-picker :visible='usernamePickerVisible' v-on:confirm='changeUsername' v-on:cancel='cancelUsernamePicker'></username-picker>
    <!-- 个性签名弹框 -->
    <signature-picker :visible='signaturePickerVisible' v-on:confirm='changeSignature' v-on:cancel='cancelSignaturePicker'></signature-picker>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import VueCoreImageUpload  from 'vue-core-image-upload';
import axios from '@/assets/js/http';
import AddressPicker from '@/components/AddressPicker';
import SexPicker from '@/components/SexPicker';
import UsernamePicker from '@/components/UsernamePicker';
import SignaturePicker from '@/components/SignaturePicker';

export default {
  name: 'Personal',
  components: {VueCoreImageUpload, AddressPicker, SexPicker, UsernamePicker, SignaturePicker},
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/user/editUserInfo',
        headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: 'avatar',
        extensions: 'png, jpeg, jpg, gif',
      },
      addressPickerVisible: false, //省市选择器显示性
      sexPickerVisible: false, //性别选择器显示性
      usernamePickerVisible: false, //用户名弹框显示性
      signaturePickerVisible: false, //个性签名弹框显示性
    };
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  methods: {
    // 取消选择
    cancelSignaturePicker() {
      this.signaturePickerVisible = false;
    },

    // 修改个性签名
    changeSignature(value) {
      this.signaturePickerVisible = false;
      if (value != this.userInfo.signature) {
        this.editUserInfo({signature: value});
      }
    },

    // 取消选择
    cancelUsernamePicker() {
      this.usernamePickerVisible = false;
    },

    // 修改用户名
    changeUsername(value) {
      this.usernamePickerVisible = false;
      if (value != this.userInfo.username) {
        this.editUserInfo({username: value});
      }
    },

    // 取消选择
    cancelSexPicker() {
      this.sexPickerVisible = false;
    },

    // 选择性别
    selectSex(value) {
      this.sexPickerVisible = false;
      if (value != this.userInfo.sex) {
        this.editUserInfo({sex: parseInt(value)});
      }
    },

    // 取消选择
    cancelAddressPicker() {
      this.addressPickerVisible = false;
    },

    // 选择地址
    selectAddress(value) {
      this.addressPickerVisible = false;
      var address = value.selectedProvince + ' ' + value.selectedCity;
      if (address != this.userInfo.area) {
        this.editUserInfo({area: address});
      }
    },

    // 请求更新用户信息
    editUserInfo(form) {
      this.$api.editUserInfo(form)
      .then(res => {
        if (res.code == '00') {
          // this.$toast('更新成功');
          this.$store.commit('updateUserInfo', form);
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 登出
    logout() {
      this.$api.logout()
      .then(res => {
        this.$toast({message: '登出成功', duration: 1000});
        window.localStorage.removeItem('token');
        delete axios.defaults.headers.token;

        setTimeout(() => {
          this.$store.commit('setHasLogin', false);
          this.$store.commit('setUserInfo', {});
          this.$router.push({name: 'Login'});
        }, 500);
      })
    },

    // 读取头像前
    uploading(res) {
      this.$indicator.open();
    },

    // 读取头像后
    uploaded(res) {
      this.$indicator.close();
      if (res.code === '00') {
        this.getUserInfo();
      } else {
        this.$toast(res.msg);
      }
    },

    // 上传失败
    errorhandle(err) {
      this.$indicator.close();
      this.$toast(err);
    },
  },
} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.personal-page {
  .page-hd {
    .hd-cell {
      position: relative;
      padding: .1rem .05rem;
      background-image: none;
    }
  }

  .page-bd {
    margin: .3rem 0 .6rem;
  }
  .upload-container {
    border: none;
  }
  .bd-cell-2 {
    .van-cell__value {
      color: @gray;
    }
  }

  .btn-submit-container {
    padding: 0 .2rem .3rem;
    .btn-primary {
    }
  }
}
</style>