<template>
  <section class="page find-page page-has-hd">
    <mt-navbar v-model="selected" fixed class='hd-navbar'>
      <mt-tab-item id="1">广场</mt-tab-item>
      <mt-tab-item id="2">好友</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" v-infinite-scroll="getPlazaMomentList" infinite-scroll-disabled="loading1" infinite-scroll-distance="100" :infinite-scroll-immediate-check='false' ref='tab1'>
        <router-link :to="'momentDetail?id=' + item.id" class="find-card" v-for='item in plazaMomentList'>
          <div class="card-hd user-cell">
            <router-link :to="'/personalDetail?id=' + item.uid" class="cell-l"><img :src="getImgURL(item.user.avatar)" alt="" class="img-face"></router-link>
            <div class="cell-r">
              <div class="cell-r-t">{{ item.user.username }}</div>
              <div class="cell-r-b">{{ item.created_at.substr(5) }}</div>
            </div>
          </div>
          <div class="card-bd">{{item.content}}</div>
          <div class="card-ft">
            <span class="img-container" v-for='img in item.imgs' :style="{background: 'url(' + getImgURL(img) + ') no-repeat center/cover'}"></span>
          </div>
        </router-link>
      </mt-tab-container-item>

      <mt-tab-container-item id="2" v-infinite-scroll="getFriendMomentList" infinite-scroll-disabled="loading2" infinite-scroll-distance="100" :infinite-scroll-immediate-check='false' ref='tab2'>
        <router-link :to="'momentDetail?id=' + item.id" class="find-card" v-for='item in friendMomentList'>
          <div class="card-hd user-cell">
            <router-link :to="'/personalDetail?id=' + item.uid" class="cell-l"><img :src="getImgURL(item.user.avatar)" alt="" class="img-face"></router-link>
            <div class="cell-r">
              <div class="cell-r-t">{{ item.user.username }}</div>
              <div class="cell-r-b">{{ item.created_at.substr(5) }}</div>
            </div>
          </div>
          <div class="card-bd">{{item.content}}</div>
          <div class="card-ft">
            <span class="img-container" v-for='img in item.imgs' :style="{background: 'url(' + getImgURL(img) + ') no-repeat center/cover'}"></span>
          </div>
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Find',
  data() {
    return {
      selected: '1',

      plazaMomentList: [], // 广场记忆列表
      page1: 1,
      pageNum1: 15,
      loading1: false, // 广场tab加载状态
      complete1: false, // 全部加载完成状态 用于判断切换tab后需不需要可以触发请求
      scrollTop1: 0, // 记录广场tab上次停留的位置

      friendMomentList: [], // 好友记忆列表
      page2: 1,
      pageNum2: 15,
      loading2: false, // 好友tab加载状态
      complete2: false, // 全部加载完成状态
      scrollTop2: 0, // 记录好友tab上次停留的位置
    }
  },

  // computed: {
  //   ...mapState({
  //     scrollTop1: state => state.scrollTop1,
  //     scrollTop2: state => state.scrollTop2,
  //   })
  // },

  watch: {
    selected(newVal, oldVal) {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (newVal == '2') {
        this.loading1 = true;
        this.scrollTop1 = scrollTop;
        // this.$store.commit('setScrollTop1', scrollTop);
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollTop2); // 滚动到上次停留的位置
        });
        // 如果没有全部加载完成则可以继续加载
        if (!this.complete2) {
          this.loading2 = false;
          this.getFriendMomentList();
        }

      } else {
        this.loading2 = true;
        this.scrollTop2 = scrollTop;
        // this.$store.commit('setScrollTop2', scrollTop);
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollTop1); // 滚动到上次停留的位置
        });
        // 如果没有全部加载完成则可以继续加载
        if (!this.complete1) {
          this.loading1 = false;
          this.getPlazaMomentList();
        }
      }
    }
  },

  created() {
    this.loading2 = true;
    this.getPlazaMomentList();
  },

  methods: {
    // 获取广场记忆列表
    getPlazaMomentList() {
      if (this.loading1) {return;}
      this.loading1 = true;

      this.$api.getPlazaMomentList({
        page: this.page1,
        pageNum: this.pageNum1,
      }).then(res => {
        if (res.code == '00') {
          this.plazaMomentList = this.plazaMomentList.concat(res.data);

          if (this.page1 < res.last_page) {
            this.page1++;
            this.loading1 = false;
          } else {
            this.complete1 = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取好友记忆列表
    getFriendMomentList() {
      if (this.loading2) {return;}
      this.loading2 = true;

      this.$api.getFriendMomentList({
        page: this.page2,
        pageNum: this.pageNum2,
      }).then(res => {
        if (res.code == '00') {
          this.friendMomentList = this.friendMomentList.concat(res.data);

          if (this.page2 < res.last_page) {
            this.page2++;
            this.loading2 = false;
          } else {
            this.complete2 = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },
  },

  // beforeRouteLeave(to, from, next) {
  //   var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  //   this.$store.commit('setScrollTop' + this.selected, scrollTop);
  //   console.log('beforeRouteleave: ', this.scrollTop1);
  //   next();
  // }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.find-page {
  .hd-navbar {
    padding: 0 30vw;

    .mint-tab-item {
      padding: .14rem 0;

      &.is-selected {
        color: @blue;
        border-bottom: 2px solid @blue;
        margin-bottom: -2px;
      }
    }
    .mint-tab-item-label {
      font-size: .15rem;
    }
  }

  .find-card {
    display: block;
    background-color: #fff;
    padding: .1rem .15rem;
    margin-bottom: .1rem;
    .card-bd {
      margin: .1rem 0 .15rem;
    }
  }
}
</style>