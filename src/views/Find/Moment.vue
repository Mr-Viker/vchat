<template>
  <section class="page moment-page">
    <div class="page-hd flex-v">
      <div class="hd-mask v-modal"></div>
      <div class='hd-avatar'>
        <img :src="getImgURL(info.avatar)" alt="" class="img-avatar" v-if='info.avatar'>
        <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-avatar" v-else>
      </div>
      <div class="hd-content">
        <div class="content-title">{{info.username}}</div>
        <div class="content-sub text-e">{{info.signature}}</div>
      </div>
    </div>

    <div class="page-bd" v-infinite-scroll="getMomentList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <router-link class="moment-card" v-for='item in momentList' :key='item.id' :to="'/momentDetail?id=' + item.id" >
        <div class="card-hd">{{item.content}}</div>
        <div class="card-bd">
          <!-- <img :src="getImgURL(img)" alt="" v-for='img in item.imgs' class='img-thumb'> -->
          <span class="img-container" v-for='(img, index) in item.imgs' @click.prevent='showImgPicker(item.imgs, index)'><img v-lazy='getImgURL(img)' class="img-full"></span>
        </div>
        <div class="card-ft">{{item.created_at}}</div>
      </router-link>
    </div>

    <img-picker :visible='visible' :imgs='imgs' :index='index'  @cancel='cancel'></img-picker>
  </section>
</template>


<script>
import ImgPicker from '@/components/ImgPicker';

export default {
  name: 'Moment',
  components: {ImgPicker},
  data() {
    return {
      id: '', //用户ID
      info: {}, //用户信息
      momentList: [], //记忆列表
      page: 1,
      pageNum: 15,
      loading: false, // 加载状态
      visible: false, // 图片弹窗显示状态
      imgs: [], //图片弹窗显示的图片数组
      index: 0, //初始显示的图片索引
      leaving: false, // 离开状态
      }
  },

  created() {
    if(!this.$route.query.id) {
      this.$router.back();
    }
  },

  // 因为缓存了视图 所以每次显示都要判断是否是缓存的用户ID下的记忆列表 不是的话就重新加载
  activated() {
    this.leaving = false;
    if (this.id != this.$route.query.id) {
      this.id = this.$route.query.id;
      this.reset();
      this.getInfo();
      this.getMomentList();
    }
  },

  // 离开页面时触发 防止在其他缓存页滚动的时候触发本页面的滚动加载
  deactivated() {
    this.leaving = true;
  },


  methods: {
    // 重置
    reset() {
      this.info = {};
      this.momentList = [];
      this.page = 1;
      this.loading = false;
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

    // 获取该用户信息
    getInfo() {
      this.$api.getUserInfo({id: this.id})
      .then(res => {
        if (res.code == '00') {
          this.info = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取记忆列表
    getMomentList() {
      if (this.loading || this.leaving) {return;}
      this.loading = true;

      this.$api.getMomentList({
        id: this.id,
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
  
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.moment-page {

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
        .img-container {
          display: inline-block;
          width: 30vw;
          height: 30vw;
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