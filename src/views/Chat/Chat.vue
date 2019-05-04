<template>
  <section class="page chat-page page-has-chat-tab">
    <!-- 右上角添加联系人图标 -->
    <i class="iconfont icon-wo v-header-r" @click='$router.push({name: "PersonalDetail", query: {id: $route.query.id}})'></i>

    <!-- 列表区域 -->
    <mt-loadmore class='page-bd' id='page-bd' :top-method="getChatRecord" ref="loadmore" top-pull-text='下拉加载' :top-distance='50' :cancelable='false'>
      <div :class="['chat-card', 'chat-card-' + index]" v-for='(item, index) in recordList'>
        <!-- 对方发的 -->
        <div class="left-card" v-if='item.from_id == form.id'>
          <router-link :to="'/personalDetail?id=' + info.id"><img :src="getImgURL(info.avatar)" alt="" class="img-head"></router-link>
          <!-- 图片 -->
          <div class="card-bd card-bd-pic" v-if='item.content_type == 1'>
            <img :src="getImgURL(item.content)" alt="" class='img-chat' @click.prevent='showImgPicker(item.content)'>
          </div>
          <!-- 语音 -->
          <div class="card-bd card-bd-audio" v-else-if='item.content_type == 2' @click='startPlay(index)'>
            <i class="iconfont icon-yuyinzuo"></i> {{ item.duration }}s
          </div>
          <!-- 文字 -->
          <div class="card-bd" v-else>{{item.content}}</div>
        </div>

        <!-- 自己发的 -->
        <div class="right-card" v-else-if='item.from_id == userInfo.id'>
          <!-- 图片 -->
          <div class="card-bd card-bd-pic" v-if='item.content_type == 1'>
            <img :src="getImgURL(item.content)" alt="" class='img-chat' @click.prevent='showImgPicker(item.content)'>
          </div>
          <!-- 语音 -->
          <div class="card-bd card-bd-audio" v-else-if='item.content_type == 2' @click='startPlay(index)'>
            {{ item.duration }}s <i class="iconfont icon-yuyinyou"></i>
          </div>
          <!-- 文字 -->
          <div class="card-bd" v-else>{{item.content}}</div>
          <router-link :to="'/personalDetail?id=' + userInfo.id"><img :src="getImgURL(userInfo.avatar)" alt="" class="img-head"></router-link>
        </div>

        <div :class="['card-time', item.from_id == userInfo.id ? 'card-time-r' : 'card-time-l']">{{item.created_at.substring(5, 16)}}</div>
      </div>
    </mt-loadmore>

    <div class="page-ft">
      <!-- 文字表单 -->
      <form class="ft-form" @submit.prevent='submit' novalidate>
        <!-- <i class="iconfont icon-84qiehuanyuyin ft-icon"></i> -->
        <input type="text" class="ft-input" v-model='content'>
        <i class="iconfont icon-send ft-icon" @click='submit'></i>
      </form>
      <!-- 附加功能 -->
      <div class="ft-b">
        <v-uploader input-name='file' @uploaded='uploaded' icon='icon-tupian' class='ft-uploader'></v-uploader>
        <v-audio @success='sendAudio'></v-audio>
      </div>
    </div>


    <!-- 语音播放器 -->
    <audio-player :options='playOptions' @change='changeTime'></audio-player>

    <img-picker :visible='visible' :imgs='imgs' @cancel='cancel'></img-picker>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import VUploader  from '@/components/VUploader';
import ImgPicker from '@/components/ImgPicker';
import VAudio from '@/components/VAudio';
import AudioPlayer from '@/components/AudioPlayer';

export default {
  name: 'Chat',
  components: { VUploader, ImgPicker, VAudio, AudioPlayer },
  data() {
    return {
      form: {
        id: '',
        content: '',
        content_type: 0, //内容类型 0文字 1图片 2语音
        type: 0, // 对话类型 0用户-用户
      },
      // recordList: [], // 聊天记录列表
      page: 1,
      pageNum: 15,
      loading: false, // 加载状态
      info: {}, //对方用户信息
      content: '', //输入框内容

      visible: false, // 图片弹窗显示状态
      imgs: [], //图片弹窗显示的图片数组

      playOptions: {
        index: '', //播放的语音索引
        same: false, // 是否是同一个语音
      }
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
    // 监视历史列表 进行相应的滚动操作
    recordList(newVal, oldVal) {
      if (newVal.length <= 0) {return;}
      this.$nextTick(() => {
        // 发送或接收
        if (newVal.length == oldVal.length) {
          var cards = document.querySelectorAll('.chat-card');
          var height = cards[cards.length - 1].offsetHeight;
          window.scrollBy(0, height);
        } else {
          // 加载
          var num = newVal.length - oldVal.length - 1;
          var height = document.querySelector('.chat-card-' + num).offsetTop;
          window.scrollBy(0, height);
        }
      });
    }
  },

  created() {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id;
      this.info = {id: this.$route.query.id, username: this.$route.query.username, avatar: this.$route.query.avatar};

      this.getChatRecord();
      
      // 如果有未读消息 则需要调用已读接口
      if (this.$route.query.num > 0) {
        this.readChat(this.$route.query.id);
      }
    } else {
      this.$router.back();
    }
  },


  methods: {
    // 播放音频
    startPlay(index) {
      if (index == this.playOptions.index) {
        this.playOptions = {
          index: index,         
          same: true,
        };
      } else {
        this.playOptions = {
          index: index,         
          same: false,
        };
      }
    },

    // 播放过程中修改该语音的显示时长
    changeTime(data) {
      this.recordList[data.index].duration = data.duration;
    },

    // 上传语音文件后的回调
    sendAudio(data) {
      this.form.content = data.url;
      this.form.content_type = 2;
      this.form.duration = data.duration;
      this.submit();
    },

    // 关闭弹框
    cancel() {
      this.visible = false;
    },

    // 点击图片事件
    showImgPicker(imgs) {
      this.imgs = [imgs];
      if (this.isApp()) {
        this.previewImage(this.imgs, 0);
      } else {
        this.visible = true;
      }
    },

    // 上传图片后
    uploaded(res) {
      this.form.content = res.data[0];
      this.form.content_type = 1;
      this.submit();
    },

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
      if (!this.form.content_type) {
        this.form.content = this.content;
      }
      
      if (this.validate(this.form)) {
        this.$api.send(this.form)
        .then(res => {
          if (res.code == '00') {
            // 新增一条聊天记录
            this.$store.commit('pushRecordList', res.data);
            // 更新chatList中和该用户的最后一条聊天记录
            var newItem = {};
            this.chatList.forEach((item) => {
              if (item.uid == this.form.id) {
                newItem.avatar = item.avatar;
                newItem.content = this.form.content;
                newItem.content_type = this.form.content_type;
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

            this.resetForm();
          } else {
            this.$toast(res.msg);
          }
        }).catch(err => {
          this.resetForm();
          this.$toast({message: '连接IM超时, 已缓存至数据库，稍后请刷新消息记录以确认是否发送成功', duration: 5000});
        })
      }
    },

    // 重置表单
    resetForm() {
      this.content = '';
      this.form.content = '';
      this.form.content_type = 0;
      this.form.duration ? this.form.duration = 0 : '';
    }

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
  // background: url('../../assets/img/chat/chat-bg.jpg') no-repeat fixed;
  // background-size: contain;
  &.page-has-chat-tab {
    padding-bottom: .86rem !important;
  }

  .v-header-r {
    top: .12rem;
  }

  .page-bd {
    min-height: 70vh;
    padding: .1rem .1rem 0;

    .chat-card {
      margin-bottom: .15rem;
      .card-time {
        color: @gray;
        font-size: .12rem;
        padding-top: .03rem;
        &.card-time-l {
          text-align: left;
          padding-left: .6rem;
        }
        &.card-time-r {
          text-align: right;
          padding-right: .6rem;
        }
      }
    }

    .img-head {
      min-width: .35rem;
    }
    .img-chat {
      display: inline-block;
      width: auto;
      height: 1rem;
      max-width: 50vh;
    }
    .card-bd-pic {
      padding: 0 !important;
      background: none !important;
      &::before {
        display: none !important;
      }
    }
    .card-bd-audio {
      padding: .08rem .2rem !important;
      .iconfont {
        vertical-align: text-bottom;
      }
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
        word-break: break-all;
        align-self: flex-start;
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
        background-color: @green-light;
        padding: .1rem .15rem;
        border-radius: .05rem;
        margin-right: .1rem;
        word-break: break-all;
        align-self: flex-start;
        &::before {
          display: inline-block;
          content: '';
          border-width: .08rem;
          border-style: solid;
          border-color: transparent transparent transparent @green-light;
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
    // height: .5rem;
    background-color: @bgc;
    border-top: 1px solid @disabled-bgc;
    overflow: hidden;

    .ft-form {
      display: flex;
      align-items: center;
      padding: .1rem .1rem .05rem;
      box-sizing: border-box;
      width: 100%;
      // height: .4rem;
      overflow: hidden;
    }
    .ft-input {
      flex: 1;
      margin: 0 .1rem;
      border: none;
      border-radius: .05rem;
      height: .35rem;
      padding: 0 .1rem;
      &:focus {
        outline: none;
      }
    }
    .ft-icon {
      font-size: .24rem;
      color: @green-light;
    }

    .ft-b {
      padding: 0 .2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .ft-uploader {
      width: .35rem;
      height: .35rem;
      border: none;
      .icon {
        font-size: .35rem;
      }
    }
    .ft-b-icon {
      font-size: .26rem;
      color: #fff;
    }
  }
}
</style>