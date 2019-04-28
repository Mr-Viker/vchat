<template>
  <section class="page chat-page page-has-tab">
    <!-- 列表区域 -->
    <mt-loadmore class='page-bd' id='page-bd' :top-method="getChatRecord" ref="loadmore" top-pull-text='下拉加载' :top-distance='30'>
      <div class="chat-card" id="chat-card" v-for='item in recordList' :key='item.id'>
        <!-- 对方发的 -->
        <div class="left-card" v-if='item.from_id == form.id'>
          <img :src="getImgURL(info.avatar)" alt="" class="img-head">
          <span class="card-bd">{{item.content}}</span>
        </div>
        <!-- 自己发的 -->
        <div class="right-card" v-else>
          <span class="card-bd">{{item.content}}</span>
          <img :src="getImgURL(info.avatar)" alt="" class="img-head">
        </div>
      </div>
    </mt-loadmore>

    <div class="page-ft">
      <form class="ft-form" @submit.prevent='submit' novalidate>
        <i class="iconfont icon-84qiehuanyuyin ft-icon"></i>
        <input type="text" class="ft-input" v-model='form.content'>
        <i class="iconfont icon-add ft-icon"></i>
      </form>
    </div>
  </section>
</template>


<script>
export default {
  name: 'Chat',
  data() {
    return {
      form: {
        id: '',
        content: '',
        type: 0,
      },
      recordList: [], // 聊天记录列表
      page: 1,
      pageNum: 15,
      loading: false, // 加载状态
      info: {}, //对方用户信息
    }
  },

  created() {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id;
      this.getChatRecord()
      .then(res => {
        this.$nextTick(() => {
          var bd = document.getElementById('page-bd');
          window.scrollTo(0, bd.scrollHeight);
        })
      })

      // 如果有未读消息 则需要调用已读接口
      if (this.$route.query.num > 0) {
        this.readChat();
      }

      // this.getInfo(this.form.id);
      this.info = {
        username: this.$route.query.username,
        avatar: this.$route.query.avatar,
      }
    } else {
      this.$router.back();
    }
  },

  methods: {
    // 获取聊天记录列表
    getChatRecord() {
      if (this.loading) { 
        this.$refs.loadmore.onTopLoaded();
        return; 
      }
      this.loading = true;
      return this.$api.getChatRecord({
        id: this.form.id,
        page: this.page,
        pageNum: this.pageNum,
      }).then(res => {
        if (res.code == '00') {
          this.recordList = res.data.reverse().concat(this.recordList);
          this.$refs.loadmore.onTopLoaded();

          if (this.page < res.last_page) {
            this.page++;
            this.loading = false;
          }
        } else {
          this.toast(res.msg);
        }
        return res;
      })
    },

    // 获取该用户信息
    getInfo(id) {
      this.$api.getUserInfo({id: id})
      .then(res => {
        if (res.code == '00') {
          this.info = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 修改未读消息为已读状态
    readChat() {
      this.$api.readChat({id: this.form.id})
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('readChatList', {uid: this.form.id});
        }
      })
    },

    // 发送
    submit() {
      if (this.validate(this.form)) {
        this.$api.send(this.form)
        .then(res => {
          if (res.code == '00') {
            this.form.content = '';
            // 新增一条记录
            this.recordList.push(res.data);
            // 向上滚动一些距离
            this.$nextTick(() => {
              var card = document.getElementById('chat-card');
              window.scrollBy(0, card.scrollHeight + 15);
            })
          } else {
            this.$toast(res.msg);
          }
        })
      }
    }
  },

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.chat-page {
  background: url('../../assets/img/chat/chat-bg.jpg') no-repeat fixed;
  background-size: contain;

  .page-bd {
    min-height: 70vh;
    padding: .1rem .1rem 0;

    .chat-card {
      margin-bottom: .15rem;
    }

    .left-card {
      display: flex;
      margin-right: .5rem;
      .card-bd {
        position: relative;
        background-color: #fff;
        padding: .1rem .15rem;
        border-radius: .05rem;
        margin-left: .1rem;
        &::before {
          display: inline-block;
          content: '';
          border-width: .08rem;
          border-style: solid;
          border-color: transparent #fff transparent transparent;
          position: absolute;
          left: -.16rem;
        }
      }
    }

    .right-card {
      display: flex;
      justify-content: flex-end;
      margin-left: .5rem;
      .card-bd {
        position: relative;
        background-color: #fff;
        padding: .1rem .15rem;
        border-radius: .05rem;
        margin-right: .1rem;
        &::before {
          display: inline-block;
          content: '';
          border-width: .08rem;
          border-style: solid;
          border-color: transparent transparent transparent #fff;
          position: absolute;
          right: -.16rem;
        }
      }
    }
  }

  .page-ft {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .5rem;
    background-color: @bgc;
    // border-top: 1px solid @disabled-bgc;
    .ft-form {
      display: flex;
      align-items: center;
      padding: 0 .1rem;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    .ft-input {
      flex: 1;
      margin: 0 .1rem;
      border: none;
      border-radius: .05rem;
      height: .3rem;
      padding: 0 .1rem;
      &:focus {
        outline: none;
      }
    }
    .ft-icon {
      font-size: .28rem;
      color: @gray-deep;
    }
  }
}
</style>