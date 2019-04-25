<template>
  <mt-tabbar v-model="selected" class='v-tabbar'>
    <mt-tab-item :id="item.id" v-for='item in tabs' :key='item.id' @click.native='goto(item.link)'>
      <mt-badge type="error" size='small' class='tab-item-badge' v-if='item.title == "微信" && chatNum > 0'>{{chatNum}}</mt-badge>
      <mt-badge type="error" size='small' class='tab-item-badge' v-if='item.title == "通讯录" && addContactNum > 0'>{{addContactNum}}</mt-badge>
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
        { id: '/', title: '微信', icon: 'icon-duihua', link: '/' },
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
      chatNum: state => state.chatNum, //最新消息数
      addContactNum: state => state.addContactNum, //最新添加好友请求消息数
    })
  },
  
  created() {
    if (window.localStorage.getItem('token')) {
      this.getNewChatNum(); // 获取最新消息数
      this.getNewAddContactNum(); //获取最新添加好友请求消息数
    }
  },

  methods: {
    // 获取最新消息数
    getNewChatNum() {
      this.$api.getNewChatNum()
      .then(res => {
        if (res.code == '00') {
          if (res.data != 0) {
            this.$store.commit('setNewChatNum', res.data);
            this.showChatBage = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取最新添加好友请求消息数
    getNewAddContactNum() {
      this.$api.getNewAddContactNum()
      .then(res => {
        if (res.code == '00') {
          if (res.data != 0) {
            this.$store.commit('setNewAddContactNum', res.data);
            this.showContactBage = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    goto(url) {
      return this.$router.replace({path: url});
    }
  }
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-tabbar {
  position: fixed;
  background: #f9f9f9;
  border-top: 1px solid @border-c;
  color: #929292;
  .mint-tab-item.is-selected {
    background-color: #f9f9f9;
    color: @green;
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
    // padding: .03rem;
  }
}
</style>