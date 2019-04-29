<template>
  <section class="page chat-page page-has-tab">
    <!-- 右上角添加联系人图标 -->
    <i class="iconfont icon-wo v-header-r" @click='$router.push({name: "PersonalDetail", query: {id: $route.query.id}})'></i>

    <!-- 列表区域 -->
    <mt-loadmore class='page-bd' id='page-bd' :top-method="getChatRecord" ref="loadmore" top-pull-text='下拉加载' :top-distance='30' :cancelable='false'>
      <div :class="['chat-card', 'chat-card-' + index]" v-for='(item, index) in recordList'>
        <!-- 对方发的 -->
        <div class="left-card" v-if='item.from_id == form.id'>
          <router-link :to="'/personalDetail?id=' + info.id"><img :src="getImgURL(info.avatar)" alt="" class="img-head"></router-link>
          <div class="card-bd">{{item.content}}</div>
        </div>
        <!-- 自己发的 -->
        <div class="right-card" v-else-if='item.from_id == userInfo.id'>
          <div class="card-bd">{{item.content}}</div>
          <router-link :to="'/personalDetail?id=' + userInfo.id"><img :src="getImgURL(userInfo.avatar)" alt="" class="img-head"></router-link>
        </div>
      </div>
    </mt-loadmore>

    <div class="page-ft">
      <form class="ft-form" @submit.prevent='submit' novalidate>
        <i class="iconfont icon-84qiehuanyuyin ft-icon"></i>
        <input type="text" class="ft-input" v-model='content'>
        <i class="iconfont icon-add ft-icon"></i>
      </form>
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Chat',
  data() {
    return {
      form: {
        id: '',
        content: '',
        type: 0,
      },
      // recordList: [], // 聊天记录列表
      page: 1,
      pageNum: 15,
      loading: false, // 加载状态
      info: {}, //对方用户信息
      content: '', //输入框内容
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      recordList: state => state.recordList,
      chatList: state => state.chatList,
    })
  },

  watch: {
    recordList(newVal, oldVal) {
      if (newVal.length <= 0) {return;}
      this.$nextTick(() => {
        // 发送或接收
        if (newVal.length == oldVal.length) {
          var height = document.querySelector('.chat-card-0').offsetTop;
          window.scrollBy(0, height);
        } else {
          // 加载
          var num = newVal.length - oldVal.length - 1;
          var height = document.querySelector('.chat-card-' + num).offsetTop;
          window.scrollBy(0, height);
        }
      })
    }
  },

  created() {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id;
      this.info = {id: this.$route.query.id, username: this.$route.query.username, avatar: this.$route.query.avatar};

      this.getChatRecord()
      // .then(res => {
      //   // 滚动到底部
      //   var listH = document.getElementById('page-bd').offsetHeight;
      //   var viewH = window.innerHeight - 96; // 96是header + footer 的高度
      //   window.scrollTo(0, listH - viewH);
      // })

      // 如果有未读消息 则需要调用已读接口
      if (this.$route.query.num > 0) {
        this.readChat(this.$route.query.id);
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
          this.$store.commit('setRecordList', res.data.reverse().concat(this.recordList));
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

    // 发送
    submit() {
      this.form.content = this.content;
      this.content = '';
      if (this.validate(this.form)) {
        this.$api.send(this.form)
        .then(res => {
          if (res.code == '00') {
            console.log('submit: ', res.data);
            // 新增一条聊天记录
            this.$store.commit('pushRecordList', res.data);

            // 更新chatList中和该用户的最后一条聊天记录
            var newItem = {};
            this.chatList.forEach((item) => {
              if (item.uid == this.form.id) {
                newItem.avatar = item.avatar;
                newItem.content = this.form.content;
                newItem.created_at = res.data.created_at;
                newItem.is_accept = 0;
                newItem.is_read = 0;
                newItem.new_chat_num = 0;
                newItem.type = 0;
                newItem.uid = item.uid;
                newItem.username = item.username;
              }
            });
            this.$store.commit('addChatList', newItem);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('setRecordList', []);
    next();
  }
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.chat-page {
  background: url('../../assets/img/chat/chat-bg.jpg') no-repeat fixed;
  background-size: contain;

  .v-header-r {
    top: .12rem;
  }

  .page-bd {
    min-height: 70vh;
    padding: .1rem .1rem 0;

    .chat-card {
      margin-bottom: .15rem;
    }

    .img-head {
      min-width: .35rem;
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