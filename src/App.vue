<template>
  <div id="app">
    <v-header :title='title' v-if='showHd' :show-back='showBack'></v-header>

    <router-view :class='{"page-has-hd": showHd, "page-has-tab": showTab}'/>

    <v-tabbar v-if='showTab'></v-tabbar>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader';
import VTabbar from '@/components/VTabbar';

export default {
  name: 'app',
  components: { VHeader, VTabbar},
  computed: {
    title() { return this.$route.meta.title; },
    showHd() { return this.$route.meta.showHd; },
    showTab() { return this.$route.meta.showTab; },
    showBack() { return this.$route.meta.showBack; },
  },

  created() {
    this.getConfig()
    .then(res => {
      if (window.localStorage.getItem('token')) {
        return this.getUserInfo();
      }
      return res;
    }).then(res => {
      if (window.localStorage.getItem('token')) {
        this.getNewChatNum(); // 获取最新消息数
        this.getNewAddContactNum(); //获取最新添加好友请求消息数
      }
      return res;
    }).then(res => {
      this.init();
      this.watchRouter();
      return res;
    });
  },

  methods: {
    // 初始化（进入或刷新）
    init() {
      document.title = this.$route.meta.title + ' - ' + this.$store.state.config.system_name;
      // 如果本页面要登录且没有登录 则跳去登录
      if (this.$route.meta.requireAuth && !this.$store.state.hasLogin) {
        this.$router.push({name: 'Login', query: {redirect: this.$route.fullPath}});
      }
    },

    // 路由跳转时检测是否需要登录
    watchRouter() {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.title) {
          document.title = to.meta.title + ' - ' + this.$store.state.config.system_name;
        }

        if (to.matched.some(record => record.meta.requireAuth)) {
          if (!this.$store.state.hasLogin) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next();
          }
        } else {
          next();
        }
        // 每次路由跳转都会滚动到顶部
        window.scrollTo(0, 0);
      })
    },

    // 获取最新消息数
    getNewChatNum() {
      return this.$api.getNewChatNum()
      .then(res => {
        if (res.code == '00') {
          if (res.data != 0) {
            this.$store.commit('setNewChatNum', res.data);
          }
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 获取最新添加好友请求消息数
    getNewAddContactNum() {
      return this.$api.getNewAddContactNum()
      .then(res => {
        if (res.code == '00') {
          if (res.data != 0) {
            this.$store.commit('setNewAddContactNum', res.data);
          }
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },
    
  }
}
</script>

<style>
@import './assets/css/app.less';
</style>
