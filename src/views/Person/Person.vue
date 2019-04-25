<template>
  <section class="page person-page">
    <div class="page-hd">
      <mt-cell :title="userInfo.username" :label="'微信号：' + userInfo.vchat_id" to="/personal" is-link class='hd-cell'>
        <img slot="icon" :src="getImgURL(userInfo.avatar)" class='img-avatar' v-if='userInfo.avatar'>
        <img slot="icon" src="../../assets/img/person/user-default.jpeg" alt="" class="img-avatar" v-else>
        <!-- <span><img src="../../assets/img/person/qrcode.png" class="img-qrcode" alt=""></span> -->
      </mt-cell>
    </div>

    <div class="page-bd">
      <mt-cell :title="item.title" v-for='item in bds' :key='item.id' :to='item.url' is-link :class="['v-cell', {'setting-cell': item.id == 'setting'}]">
        <img slot="icon" :src="item.img" width="24" height="24">
      </mt-cell>
    </div>

  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Person',
  data() {
    return {
      bds: [
        { id: 'album', title: '相册', img: require('@/assets/img/person/album.png'), url: '/album' },
        { id: 'collect', title: '收藏', img: require('@/assets/img/person/collect.png'), url: '/collect' },
        { id: 'wallet', title: '钱包', img: require('@/assets/img/person/wallet.png'), url: '/wallet' },
        { id: 'card', title: '卡包', img: require('@/assets/img/person/card.png'), url: '/card' },
        { id: 'face', title: '表情', img: require('@/assets/img/person/face.png'), url: '/face' },
        { id: 'setting', title: '设置', img: require('@/assets/img/person/setting.png'), url: '/personal' },
      ],
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      config: state => state.config,
    }),
  },

  created() {
    if(window.localStorage.getItem('token')) {
      this.getUserInfo();
    }
  },
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.person-page {
  .page-hd {
    margin: 0 0 .2rem;
    .hd-cell {
      position: relative;
      padding: .1rem .05rem;
      background-image: none;
    }
    .img-qrcode {
      display: inline-block;
      width: .25rem;
      height: .25rem;
    }
    .mint-cell-text {
      display: inline-block;
      margin-bottom: 0.2rem;
      font-size: .16rem;
    }
    .mint-cell-label {
      position: absolute;
      top: .4rem;
      left: .8rem;
      width: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .page-bd {
    .setting-cell {
      margin-top: .2rem;
    }
  }
}
</style>