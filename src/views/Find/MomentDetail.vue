<template>
  <section class="page moment-detail-page">
    <div class="page-hd">
      <div class="hd-t user-cell">
        <div class="cell-l"><img src="../../assets/img/person/user-default.jpeg" alt="" class="img-face"></div>
        <div class="cell-r">
          <div class="cell-r-t">username</div>
          <div class="cell-r-b">time</div>
        </div>
      </div>
      <div class="hd-c">sadhiahdsahdkahjkasd</div>
      <!-- 点赞评论 -->
      <div class="hd-b">
        <i class="iconfont icon-like icon-l"></i>
        <i class="iconfont icon-custom-comment icon-r"></i>
      </div>
    </div>

    <div class="page-title">全部评论</div>
    <!-- 评论列表 -->
    <div class="page-bd">
      <div class="comment-card">
        <div class="card-hd user-cell">
          <div class="cell-l"><img src="../../assets/img/person/user-default.jpeg" alt="" class="img-face"></div>
          <div class="cell-r">
            <div class="cell-r-t">username</div>
            <div class="cell-r-b">time</div>
          </div>
        </div>
        <div class="card-bd">dsahjkdashklfhakl</div>
      </div>
    </div>

  </section>
</template>


<script>
export default {
  name: 'MomentDetail',
  data() {
    return {

    }
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.moment-detail-page {
  .user-cell {
    display: flex;
    .cell-r {
      flex: 1;
      margin-left: .15rem;
    }
    .cell-r-t {
      margin: .05rem 0;
      font-size: .16rem;
    }
    .cell-r-b {
      color: @gray;
    }
  }

  .page-hd {
    background-color: #fff;
    padding: .1rem .15rem;
    margin-bottom: .2rem;

    .hd-c {
      margin: .15rem 0 .3rem;
    }

    .hd-b {
      display: flex;
      justify-content: flex-end;
      padding: 0 .2rem;
      .iconfont {
        font-size: .25rem;
        color: @gray-deep;
      }
      .icon-l {
        margin-right: .2rem;
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
    padding: .1rem .15rem;

    .comment-card {
      .card-bd {
        padding-left: .65rem;
      }
    }
  }

}
</style>