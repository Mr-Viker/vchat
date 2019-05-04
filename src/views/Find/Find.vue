<template>
  <section class="page find-page page-has-hd">
    <mt-navbar v-model="selected" fixed class='hd-navbar'>
      <mt-tab-item id="1">广场</mt-tab-item>
      <mt-tab-item id="2">好友</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" id='container'>
      <mt-tab-container-item id="1" v-infinite-scroll="getPlazaMomentList" infinite-scroll-disabled="loading1" infinite-scroll-distance="100">
        <!-- 下拉刷新 -->
        <mt-loadmore :top-method="loadTop1" ref="loadmore1" :top-distance='50'>

          <router-link :to="'momentDetail?id=' + item.id + '&from=plaza&index=' + index" class="find-card" v-for='(item, index) in plazaMomentList'>
            <div class="card-hd user-cell">
              <router-link :to="'/personalDetail?id=' + item.uid" class="cell-l"><img :src="getImgURL(item.user.avatar)" alt="" class="img-face"></router-link>
              <div class="cell-r">
                <div class="cell-r-t">{{ item.user.username }}</div>
                <div class="cell-r-b">{{ item.created_at.substr(5) }}</div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="card-bd">{{item.content}}</div>
            <div class="card-ft">
              <span class="img-container" v-for='(img, index) in item.imgs' @click.prevent='showImgPicker(item.imgs, index)'><img v-lazy='getImgURL(img)' class="img-full"></span>
            </div>
            <!-- 点赞评论 -->
            <div class="card-action">
              <span class="action-l">
                <i class="iconfont icon-like2" @click.prevent.stop='unlike(item.id, index, 1)' v-if='item.is_like'></i>
                <i class="iconfont icon-like" @click.prevent.stop='like(item.id, index, 1)' v-else></i>
                <span v-if='item.like_num > 0'>{{ item.like_num }}</span>
              </span>
              <span class="action-r">
                <i class="iconfont icon-custom-comment"></i>
                <span v-if='item.comment_num > 0'>{{ item.comment_num }}</span>
              </span>
            </div>
          </router-link>

        </mt-loadmore>
      </mt-tab-container-item>

      <mt-tab-container-item id="2" v-infinite-scroll="getFriendMomentList" infinite-scroll-disabled="loading2" infinite-scroll-distance="100">
        <!-- 下拉刷新 -->
        <mt-loadmore :top-method="loadTop2" ref="loadmore2" :top-distance='50'>

          <router-link :to="'momentDetail?id=' + item.id + '&from=friend&index=' + index" class="find-card" v-for='(item, index) in friendMomentList'>
            <div class="card-hd user-cell">
              <router-link :to="'/personalDetail?id=' + item.uid" class="cell-l"><img :src="getImgURL(item.user.avatar)" alt="" class="img-face"></router-link>
              <div class="cell-r">
                <div class="cell-r-t">{{ item.user.username }}</div>
                <div class="cell-r-b">{{ item.created_at.substr(5) }}</div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="card-bd">{{item.content}}</div>
            <div class="card-ft">
              <span class="img-container" v-for='img in item.imgs' @click.prevent='showImgPicker(item.imgs, index)'><img v-lazy='getImgURL(img)' class="img-full"></span>
            </div>
            <!-- 点赞评论 -->
            <div class="card-action">
              <span class="action-l">
                <i class="iconfont icon-like2" @click.prevent.stop='unlike(item.id, index, 2)' v-if='item.is_like'></i>
                <i class="iconfont icon-like" @click.prevent.stop='like(item.id, index, 2)' v-else></i>
                <span v-if='item.like_num > 0'>{{ item.like_num }}</span>
              </span>
              <span class="action-r">
                <i class="iconfont icon-custom-comment"></i>
                <span v-if='item.comment_num > 0'>{{ item.comment_num }}</span>
              </span>
            </div>
          </router-link>

        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>

    <img-picker :visible='visible' :imgs='imgs' :index='index' @cancel='cancel'></img-picker>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import ImgPicker from '@/components/ImgPicker';

export default {
  name: 'Find',
  components: {ImgPicker},
  data() {
    return {
      selected: '1',

      // plazaMomentList: [], // 广场记忆列表
      page1: 1,
      pageNum1: 15,
      loading1: false, // 广场tab加载状态
      complete1: false, // 全部加载完成状态 用于判断切换tab后需不需要可以触发请求
      scrollTop1: 0, // 记录广场tab上次停留的位置

      // friendMomentList: [], // 好友记忆列表
      page2: 1,
      pageNum2: 15,
      loading2: true, // 好友tab加载状态
      complete2: false, // 全部加载完成状态
      scrollTop2: 0, // 记录好友tab上次停留的位置

      visible: false, // 图片弹窗显示状态
      imgs: [], //图片弹窗显示的图片数组
      index: 0, //初始显示的图片索引
      leaving: false, // 离开状态

      lastClickTime: Date.now(), //上次点击时间 用于模拟移动端双击事件
      timer: '', //计时器

      likeLoading: false, //点赞操作是否完成
    }
  },

  computed: {
    ...mapState({
      plazaMomentList: state => state.plazaMomentList,
      friendMomentList: state => state.friendMomentList,
    })
  },

  watch: {
    selected(newVal, oldVal) {
      // 因为是同个页面 所以两个tab共用了一个scrollTop 所以要记录每个tab上次滚动的位置 切换时回滚到记录的位置
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      if (newVal == '2') {
        this.loading1 = true;
        this.scrollTop1 = scrollTop;
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollTop2); // 滚动到上次停留的位置
        });
        // 如果没有全部加载完成则可以继续加载
        if (!this.complete2) {
          this.loading2 = false;
        }

      } else {
        this.loading2 = true;
        this.scrollTop2 = scrollTop;
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollTop1); // 滚动到上次停留的位置
        });
        // 如果没有全部加载完成则可以继续加载
        if (!this.complete1) {
          this.loading1 = false;
        }
      }
    }
  },

  created() {
    this.getPlazaMomentList();
  },
  
  activated() {
    this.leaving = false;
  },

  // 离开页面时触发 防止在其他缓存页滚动的时候触发本页面的滚动加载
  deactivated() {
    this.leaving = true;
  },

  methods: {
    // 点赞
    like(id, index, type) {
      if (this.likeLoading) {return;}
      this.likeLoading = true;

      this.$api.like({id: id})
      .then(res => {
        if (res.code == '00') {
          if (type == 1) {
            var change = [
              {index: index, key: 'is_like', value: 1},
              {index: index, key: 'like_num', value: this.plazaMomentList[index].like_num + 1},
            ];
            this.$store.commit('editPlazaMomentList', change);
            // this.$set(this.plazaMomentList[index], 'is_like', 1);
            // this.$set(this.plazaMomentList[index], 'like_num', this.plazaMomentList[index].like_num + 1);
          } else {
            var change = [
              {index: index, key: 'is_like', value: 1},
              {index: index, key: 'like_num', value: this.friendMomentList[index].like_num + 1},
            ];
            this.$store.commit('editFriendMomentList', change);

            // this.$set(this.friendMomentList[index], 'is_like', 1);
            // this.$set(this.friendMomentList[index], 'like_num', this.friendMomentList[index].like_num + 1);
          }
          this.likeLoading = false;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 取消点赞
    unlike(id, index, type) {
      if (this.likeLoading) {return;}
      this.likeLoading = true;

      this.$api.unlike({id: id})
      .then(res => {
        if (res.code == '00') {
          if (type == 1) {
            var change = [
              {index: index, key: 'is_like', value: 0},
              {index: index, key: 'like_num', value: this.plazaMomentList[index].like_num - 1},
            ];
            this.$store.commit('editPlazaMomentList', change);
          } else {
            var change = [
              {index: index, key: 'is_like', value: 0},
              {index: index, key: 'like_num', value: this.friendMomentList[index].like_num - 1},
            ];
            this.$store.commit('editFriendMomentList', change);
          }
          
          this.likeLoading = false;
        } else {
          this.$toast(res.msg);
        }
      })
    },


    // 双击tab回滚到顶部
    // rollBack(ev) {
    //   var now = Date.now();
    //   if (now - this.lastClickTime < 500) {
    //     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     var time = scrollTop > window.innerHeight ? 300 : 100; // 总共需要多少时间
    //     var speed = Math.ceil(scrollTop * 20 / time);

    //     this.timer = setInterval(() => {
    //       var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //       if (scrollTop <= 0) {
    //         clearInterval(this.timer);
    //       } else {
    //         window.scrollTo(0, scrollTop - speed);
    //       }
    //     }, 20);
    //   } else {
    //     this.lastClickTime = now;
    //   }
    // },

    // 广场tab下拉刷新
    loadTop1() {
      // this.plazaMomentList = [];
      this.page1 = 1;
      this.loading1 = false;
      this.complete1 = false;
      this.scrollTop1 = 0;
      this.getPlazaMomentList()
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('setPlazaMomentList', res.data);
        }
        this.$refs.loadmore1.onTopLoaded();
      })
    },

    // 好友tab下拉刷新
    loadTop2() {
      // this.friendMomentList = [];
      this.page2 = 1;
      this.loading2 = false;
      this.complete2 = false;
      this.scrollTop2 = 0;
      this.getFriendMomentList()
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('setFriendMomentList', res.data);
        }
        this.$refs.loadmore2.onTopLoaded();
      })
    },

    // 获取广场记忆列表
    getPlazaMomentList() {
      if (this.loading1 || this.leaving) {return;}
      this.loading1 = true;

      return this.$api.getPlazaMomentList({
        page: this.page1,
        pageNum: this.pageNum1,
      }).then(res => {
        if (res.code == '00') {
          // this.plazaMomentList = this.plazaMomentList.concat(res.data);
          this.$store.commit('setPlazaMomentList', this.plazaMomentList.concat(res.data));

          if (this.page1 < res.last_page) {
            this.page1++;
            this.loading1 = false;
          } else {
            this.complete1 = true;
          }
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 获取好友记忆列表
    getFriendMomentList() {
      if (this.loading2 || this.leaving) {return;}
      this.loading2 = true;

      return this.$api.getFriendMomentList({
        page: this.page2,
        pageNum: this.pageNum2,
      }).then(res => {
        if (res.code == '00') {
          // this.friendMomentList = this.friendMomentList.concat(res.data);
          this.$store.commit('setFriendMomentList', this.friendMomentList.concat(res.data));

          if (this.page2 < res.last_page) {
            this.page2++;
            this.loading2 = false;
          } else {
            this.complete2 = true;
          }
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 关闭弹框
    cancel() {
      this.visible = false;
    },

    // 点击图片事件
    showImgPicker(imgs, index) {
      if (this.isApp()) {
        this.previewImage(imgs, index);
      } else {
        this.imgs = imgs;
        this.index = index;
        this.visible = true;
      }
    },

  },

  beforeRouteEnter(to, from, next) {
    if (window.plus) {
      plus.navigator.setStatusBarBackground('#fff');
    }
    next();
  },

  beforeRouteLeave(to, from, next) {
    if (window.plus) {
      plus.navigator.setStatusBarBackground('#ededed');
    }
    next();
  }

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
      font-size: .16rem;
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
    .card-action {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 .15rem;
      color: @gray-deep;
      .iconfont {
        font-size: .23rem;
        color: @gray-deep;
        vertical-align: middle;
        margin-right: .05rem;
      }
      .action-l {
        margin-right: .2rem;
      }
      .icon-like2 {
        color: @red;
      }
    }
  }
}
</style>