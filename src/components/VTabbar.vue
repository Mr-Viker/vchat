<template>
  <mt-tabbar v-model="selected" class='v-tabbar'>
    <mt-tab-item :id="item.id" v-for='item in tabs' :key='item.id' :href="'#' + item.link">
      <mt-badge type="error" size='small' class='tab-item-badge' v-if='item.id == "/" && newChatNum > 0'>{{newChatNum}}</mt-badge>
      <mt-badge type="error" size='small' class='tab-item-badge' v-if='item.id == "/contact" && newAddContactNum > 0'>{{newAddContactNum}}</mt-badge>
      <i :class="['iconfont', item.icon]" slot='icon'></i>
      {{item.title}}
    </mt-tab-item>
  </mt-tabbar>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'VTabbar',
  data() {
    return {
      tabs: [
        { id: '/', title: '聊天', icon: 'icon-duihua', link: '/' },
        { id: '/contact', title: '通讯录', icon: 'icon-tongxunlu', link: '/contact' },
        { id: '/find', title: '发现', icon: 'icon-zhinanzhen', link: '/find' },
        { id: '/person', title: '我', icon: 'icon-wo', link: '/person' },
      ],
    };
  },

  computed: {
    selected: {
      get() {
        return this.$route.path;
      },
      set(val) {}
    },
    ...mapState({
      newChatNum: state => state.newChatNum, //最新消息数
      newAddContactNum: state => state.newAddContactNum, //最新添加好友请求消息数
    })
  },

  // methods: {
  //   goto(url) {
  //     return this.$router.replace({path: url});
  //   }
  // }
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-tabbar {
  position: fixed;
  z-index: 100;
  background: #f9f9f9;
  border-top: 1px solid @border-c;
  color: #929292;
  .mint-tab-item.is-selected {
    background-color: #f9f9f9;
    color: @blue;
  }
  .mint-tab-item {
    padding: 4px 0;
  }
  .iconfont {
    font-size: .24rem;
  }
  .mint-tab-item-label {
    position: relative;
    transform: scale(0.9);
  }
  .tab-item-badge {
    position: absolute;
    top: -.35rem;
    left: 15vw;
    padding: .01rem .04rem;
    // padding: .03rem;
  }
}
</style>