<template>
  <mt-tabbar v-model="selected" class='v-tabbar'>
    <mt-tab-item :id="item.id" v-for='item in tabs' :key='item.id' @click.native='goto(item.link)'>
      <i :class="['iconfont', item.icon]" slot='icon'></i>
      {{item.title}}
    </mt-tab-item>
  </mt-tabbar>
</template>


<script>
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
    }
  },
  
  methods: {
    goto(url) {
      return this.$router.replace({path: url});
    }
  }
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-tabbar {
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
    transform: scale(0.9);
  }
}
</style>