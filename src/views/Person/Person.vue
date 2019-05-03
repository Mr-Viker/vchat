<template>
  <section class="page person-page">
    <div class="page-hd flex-v">
      <div class="hd-mask v-modal"></div>
      <router-link to='/createMoment' class='hd-photo'><i class="iconfont icon-photography"></i></router-link>
      <router-link to='/personal' class='hd-avatar'>
        <img :src="getImgURL(userInfo.avatar)" alt="" class="img-avatar" v-if='userInfo.avatar'>
        <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-avatar" v-else>
      </router-link>
      <div class="hd-content">
        <div class="content-title">{{userInfo.username}}</div>
        <div class="content-sub text-e">{{userInfo.signature}}</div>
      </div>
    </div>

    <div class="page-bd" v-infinite-scroll="getMomentList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <router-link class="moment-card" v-for='item in momentList' :key='item.id' :to="'/momentDetail?id=' + item.id" >
        <div class="card-hd">{{item.content}}</div>
        <div class="card-bd">
          <!-- <img :src="getImgURL(img)" alt="" v-for='img in item.imgs' class='img-thumb'> -->
          <span class="img-container" v-for='(img, index) in item.imgs' :style="{background: 'url(' + getImgURL(img) + ') no-repeat center/cover'}" @click.prevent='showImgPicker(item.imgs, index)'></span>
        </div>
        <div class="card-ft">{{item.created_at}}</div>
      </router-link>
    </div>

    <img-picker :visible='visible' :imgs='imgs' :index='index' @cancel='cancel'></img-picker>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import ImgPicker from '@/components/ImgPicker';

export default {
  name: 'Person',
  components: {ImgPicker},
  data() {
    return {
      momentList: [], //记忆列表
      page: 1,
      pageNum: 10,
      loading: false, // 加载状态
      visible: false, // 图片弹窗显示状态
      imgs: [], //图片弹窗显示的图片数组
      index: 0, //初始显示的图片索引
      leaving: false, // 离开状态
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  created() {
    this.getMomentList();
  },

  activated() {
    this.leaving = false;
  },

  // 离开页面时触发 防止在其他缓存页滚动的时候触发本页面的滚动加载
  deactivated() {
    this.leaving = true;
  },

  methods: {
    // 关闭弹框
    cancel() {
      this.visible = false;
    },

    // 点击图片事件
    showImgPicker(imgs, index) {
      this.imgs = imgs;
      this.index = index;
      this.visible = true;
    },

    // 获取记忆列表
    getMomentList() {
      if (this.loading || this.leaving) {return;}
      this.loading = true;

      this.$api.getMomentList({
        page: this.page,
        pageNum: this.pageNum,
      }).then(res => {
        if (res.code == '00') {
          this.momentList = this.momentList.concat(res.data);

          if (this.page < res.last_page) {
            this.page++;
            this.loading = false;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },
  },

  beforeRouteLeave(to, from, next) {
    // 如果当前页没有缓存视图 则修改为缓存视图 (因为发布记忆后会修改个人页面为不缓存)
    if (!this.$route.meta.keepAlive) {
      this.changeKeepAlive('Person', true);
    }
    next();
  }
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.person-page {

  .page-hd {
    position: relative;
    height: 2rem;
    background: url(../../assets/img/person/person-bg-2.jpeg) no-repeat center / cover;
    border-radius: 0 0 15% 15%;
    .hd-mask {
      position: absolute;
      opacity: .15;
      border-radius: 0 0 15% 15%;
    }

    .hd-photo {
      position: absolute;
      z-index: 10;
      top: .1rem;
      right: .2rem;
      color: #f5f5f5;
      text-decoration: none;
      i {
        font-size: .3rem;
      }
    }
    .hd-avatar {
      position: relative;
      z-index: 10;
    }
    .hd-content {
      position: absolute;
      z-index: 10;
      top: 1.4rem;
      left: 50%;
      transform: translate(-50%);
      width: 100%;
      text-align: center;
      color: #fff;
    }
    .content-title {
      font-size: .16rem;
      padding: 0 .15rem;
    }
    .content-sub {
      font-size: .13rem;
      margin-top: .1rem;
      padding: 0 .15rem;
    }
  }

  .page-bd {
    padding: .2rem .15rem;

    .moment-card {
      display: block;
      text-decoration: none;
      color: @black;
      background-color: #fff;
      padding: .1rem;
      border-radius: .05rem;
      margin-bottom: .15rem;
      .card-hd {
        font-size: .14rem;
      }
      .card-bd {
        margin-top: .2rem;
        .img-thumb {
          display: inline-block;
          width: 30vw;
          height: auto;
          margin-right: .1rem;
          margin-bottom: .1rem;
        }
      }
      .card-ft {
        color: @gray;
        font-size: .12rem;
        margin-top: .2rem;
      }
    }
  }

}
</style>