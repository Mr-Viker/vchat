<template>
  <section class="page person-page">
    <div class="page-hd">
      <mt-cell title="Viker" label="微信号：zzx_454502552" to="/personal" is-link class='hd-cell'>
        <img slot="icon" src="../../assets/img/launch.png" class='img-face'>
        <span><img src="../../assets/img/person/qrcode.png" class="img-qrcode" alt=""></span>
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
        { id: 'setting', title: '设置', img: require('@/assets/img/person/setting.png'), url: '/setting' },
      ]
    }
  }
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.person-page {
  .page-hd {
    margin: .2rem 0;
    .hd-cell {
      position: relative;
      padding: .1rem .05rem;
      background-image: none;
    }
    .img-face {
      display: inline-block;
      width: .6rem;
      height: .6rem;
      border-radius: .05rem;
      border: 1px solid @border-c;
    }
    .img-qrcode {
      display: inline-block;
      width: .25rem;
      height: .25rem;
    }
    .mint-cell-text {
      display: inline-block;
      margin-bottom: 0.2rem;
      font-size: .18rem;
    }
    .mint-cell-label {
      position: absolute;
      top: .4rem;
      left: .8rem;
      font-size: .14rem;
    }
  }

  .page-bd {
    .setting-cell {
      margin-top: .2rem;
    }
  }
}
</style>