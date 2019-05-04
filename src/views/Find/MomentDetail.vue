<template>
  <section class="page moment-detail-page">
    <div class="page-hd">
      <div class="hd-t user-cell" v-if='detail.user'>
        <router-link :to="'/personalDetail?id=' + detail.uid" class="cell-l"><img :src="getImgURL(detail.user.avatar)" alt="" class="img-face"></router-link>
        <div class="cell-r">
          <div class="cell-r-t">{{ detail.user.username }}</div>
          <div class="cell-r-b">{{ detail.created_at }}</div>
        </div>
      </div>
      <div class="hd-c">
        <div>{{ detail.content }}</div>
        <div class="hd-c-imgs">
          <img v-lazy="getImgURL(img)" v-for='(img, index) in detail.imgs' class="img-moment" @click='showImgPicker(detail.imgs, index)'>
        </div>
      </div>
      <!-- 点赞评论 -->
      <div class="hd-b" v-if='detail.user'>
        <span class="hd-b-l">
          <i class="iconfont icon-like2" @click='unlike' v-if='detail.is_like'></i>
          <i class="iconfont icon-like" @click='like' v-else></i>
          <span v-if='detail.like_num > 0'>{{ detail.like_num }}</span>
        </span>
        <span class="hd-b-r">
          <i class="iconfont icon-custom-comment" @click='commentPickerVisible = true;'></i>
          <span v-if='detail.comment_num > 0'>{{ detail.comment_num }}</span>
        </span>
      </div>
    </div>

    <div class="page-title">全部评论</div>
    <!-- 评论列表 -->
    <div class="page-bd" v-infinite-scroll="getCommentList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <div class="comment-card" v-for='item in commentList' @click='comment(item.from_uid)'>
        <div class="card-hd user-cell">
          <router-link :to="'/personalDetail?id=' + item.from_uid" class="cell-l"><img :src="getImgURL(item.from_user.avatar)" alt="" class="img-face"></router-link>
          <div class="cell-r">
            <div class="cell-r-t">
              <router-link :to="'/personalDetail?id=' + item.from_uid">{{ item.from_user.username }}</router-link>&nbsp;<span v-if='item.to_uid'><span class='cell-r-b'>回复</span>&nbsp;<router-link  :to="'/personalDetail?id=' + item.to_uid">{{ item.to_user.username }}</router-link></span>
            </div>
            <div class="cell-r-b">{{ item.created_at.substring(5, 16) }}</div>
          </div>
        </div>
        <div class="card-bd">{{ item.content }}</div>
      </div>
    </div>

    <!-- 评论弹框 -->
    <comment-picker :visible='commentPickerVisible' @confirm='confirm' @cancel='cancel'></comment-picker>
    <!-- 图片弹框 -->
    <img-picker :visible='visible' :imgs='imgs' :index='index' @cancel='cancelImgPicker'></img-picker>
  </section>
</template>


<script>
import CommentPicker from '@/components/CommentPicker';
import ImgPicker from '@/components/ImgPicker';

export default {
  name: 'MomentDetail',
  components: {CommentPicker, ImgPicker},
  data() {
    return {
      detail: {}, // 记忆详情
      commentList: [], //评论列表
      page: 1,
      pageNum: 15,
      loading: false, //加载状态
      likeLoading: false, //点赞操作是否完成
      commentPickerVisible: false, //评论弹框显示状态
      form: {
        id: '', //记忆ID
        content: '', //评论内容
      },
      visible: false, // 图片弹窗显示状态
      imgs: [], //图片弹窗显示的图片数组
      index: 0, //初始显示的图片索引
    }
  },

  created() {
    this.form.id = this.$route.query.id;
    if (this.form.id) {
      this.getMomentDetail()
      .then(res => {
        this.getCommentList();
      })
    } else {
      this.$router.back();
    }
  },

  methods: {
    // 关闭图片弹框
    cancelImgPicker() {
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

    // 评论别人的评论
    comment(toUid) {
      this.form.toUid = toUid;
      this.commentPickerVisible = true;
    },

    // 提交评论
    confirm(data) {
      this.form.content = data;
      this.$api.addComment(this.form)
      .then(res => {
        if (res.code == '00') {
          this.cancel();
          this.commentList.unshift(res.data);
          this.$set(this.detail, 'comment_num', this.detail.comment_num + 1);

          // 如果是从发现tab页进来的 则还需要修改tab页缓存的数据列表
          this.checkFromForUpdate('comment');
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 评论弹框取消
    cancel() {
      this.form.toUid = '';
      this.commentPickerVisible = false;
    },

    // 点赞
    like() {
      if (this.likeLoading) {return;}
      this.likeLoading = true;

      this.$api.like({id: this.form.id})
      .then(res => {
        if (res.code == '00') {
          this.$set(this.detail, 'is_like', 1);
          this.$set(this.detail, 'like_num', this.detail.like_num + 1);
          this.likeLoading = false;

          // 如果是从发现tab页进来的 则还需要修改tab页缓存的数据列表
          this.checkFromForUpdate('like');
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 取消点赞
    unlike() {
      if (this.likeLoading) {return;}
      this.likeLoading = true;

      this.$api.unlike({id: this.form.id})
      .then(res => {
        if (res.code == '00') {
          this.$set(this.detail, 'is_like', 0);
          this.$set(this.detail, 'like_num', this.detail.like_num - 1);
          this.likeLoading = false;

          // 如果是从发现tab页进来的 则还需要修改tab页缓存的数据列表
          this.checkFromForUpdate('unlike');
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取记忆详情
    getMomentDetail() {
      return this.$api.getMomentDetail({id: this.form.id})
      .then(res => {
        if (res.code == '00') {
          this.detail = res.data;
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 获取评论列表
    getCommentList() {
      if (this.loading) {return;}
      this.loading = true;

      this.$api.getCommentList({
        id: this.form.id,
        page: this.page,
        pageNum: this.pageNum,
      }).then(res => {
        if (res.code == '00') {
          this.commentList = this.commentList.concat(res.data);

          if (this.page < res.last_page) {
            this.page++;
            this.loading = false;
          }
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 检测路由是否有来源，有的话则修改相应的vuex存储的数据 用于解决更新在本页面的操作但是来源缓存页没有更新的问题
    checkFromForUpdate(type) {
      var from = this.$route.query.from;
      var index = this.$route.query.index;
      if (type == 'like') {
        var change = [
          {index: index, key: 'is_like', value: 1},
          {index: index, key: 'like_num', value: this.detail.like_num},
        ];
      } else if (type == 'unlike') {
        var change = [
          {index: index, key: 'is_like', value: 0},
          {index: index, key: 'like_num', value: this.detail.like_num},
        ];
      } else if (type == 'comment') {
        var change = [
          {index: index, key: 'comment_num', value: this.detail.comment_num},
        ];
      }

      if (from == 'plaza') {
        this.$store.commit('editPlazaMomentList', change);
      } else if (from == 'friend') {
        this.$store.commit('editFriendMomentList', change);
      }
    }

  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.moment-detail-page {
  .page-hd {
    background-color: #fff;
    padding: .1rem .15rem;
    margin-bottom: .1rem;

    .hd-c {
      margin: .15rem 0 .3rem;
    }
    .img-moment {
      display: inline-block;
      width: 100%;
      height: auto;
      margin-top: .1rem;
    }

    .hd-b {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 .15rem;
      color: @gray-deep;
      .iconfont {
        font-size: .25rem;
        color: @gray-deep;
        vertical-align: middle;
        margin-right: .05rem;
      }
      .hd-b-l {
        margin-right: .2rem;
      }
      .icon-like2 {
        color: @red;
      }
    }
  }

  .page-title {
    color: @gray;
    border-bottom: 1px solid @border-c;
    padding: .05rem .15rem;
  }

  .page-bd {
    background-color: #fff;

    .comment-card {
      padding: .1rem .15rem;
      border-bottom: 1px solid @border-c;
      .card-bd {
        padding: .05rem 0 .05rem .6rem;
      }
    }
  }

}
</style>