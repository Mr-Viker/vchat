<template>
  <section class="page personal-detail-page page-has-hd">
    <v-header :show-back='true'></v-header>

    <div class="page-hd">
      <div class="hd-l"><img :src="getImgURL(info.avatar)" alt="" class="img-avatar" v-if='info.avatar'></div>
      <div class="hd-r">
        <div class="hd-r-t">{{info.username}}</div>
        <div class="hd-r-m">微信号: {{info.vchat_id}}</div>
        <div class="hd-r-b">地区: {{info.area}}</div>
      </div>
    </div>

    <div class="page-bd">
      <div class="bd-cell">
        <div class="cell-hd">朋友圈</div>
        <div class="cell-bd text-e">
          <img src="../../assets/img/contact/contact_add-friend-contacts.png" alt="" class='img-moment'>
          <img src="../../assets/img/person/logo.jpg" alt="" class='img-moment'>
          <img src="../../assets/img/launch.png" alt="" class='img-moment'>
        </div>
        <div class="cell-ft"><i class="mint-cell-allow-right"></i></div>
      </div>

      <mt-cell title="个性签名" :value='info.signature' />
    </div>

    <div class="page-ft">
      <div class="content-cell" v-if='info.is_contact' @click="$router.push({name: 'Chat', query: {id: info.id}})">发信息</div>
      <mt-button type="danger" v-if='info.is_contact' size='large' class='content-cell btn-del' @click.native='delContact'>删除好友</mt-button>
      <div class="content-cell" v-else @click="addContact">添加到通讯录</div>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import {mapState} from 'vuex';
import {getPinYinFirstCharacter} from '@/assets/js/pinyin';

export default {
  name: 'PersonalDetail',
  components: {VHeader},
  data() {
    return {
      info: {}, //用户信息
    };
  },

  computed: {
    ...mapState({
      contactList: state => state.contactList,
    })
  },

  created() {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id);
    }
  },

  methods: {
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

    // 添加好友
    addContact() {
      if (!this.info.id) {return this.$toast('缺少用户ID');}
      this.$api.addContact({id: this.info.id})
      .then(res => {
        if (res.code == '00') {
          this.$toast('已发送请求');
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 删除好友
    delContact() {
      this.$messagebox.confirm('确定删除好友?')
      .then(action => {
        if (action == 'confirm') {
          this.$api.delContact({id: this.info.id})
          .then(res => {
            if (res.code == '00') {
              // 更新关系
              this.$set(this.info, 'is_contact', 0);
              // 更新缓存的通讯录列表
              var key = getPinYinFirstCharacter(this.info.username).substr(0,1).toUpperCase();
              for (var i = this.contactList[key].length - 1; i >= 0; i--) {
                if (this.contactList[key][i].id == this.info.id) {
                  this.$store.commit('delContactList', {key: key, index: i});
                  break;
                }
              }
            } else {
              this.$toast(res.msg);
            }
          })
        }
      }).catch(action => {
        // console.log(action);
      })
    }
  },
} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.personal-detail-page {
  .v-header {
    background-color: #fff;
  }

  .page-hd {
    background-color: #fff;
    padding: .1rem .15rem .3rem;
    display: flex;
    border-bottom: 1px solid @disabled-bgc;
    .hd-r {
      flex: 1;
      margin-left: .2rem;
    }
    .hd-r-t {
      font-size: .16rem;
    }
    .hd-r-m {
      font-size: .12rem;
      margin-top: .08rem;
      color: @gray-deep;
    }
    .hd-r-b {
      color: @gray-deep;
      margin-top: .05rem;
    }
  }

  .page-bd {
    margin: .2rem 0 .4rem;
    border-top: 1px solid @disabled-bgc;
    border-bottom: 1px solid @disabled-bgc;
    .bd-cell {
      position: relative;
      background-color: #fff;
      display: flex;
      border-bottom: 1px solid @border-c;
      height: .6rem;
      align-items: center;
      padding: .1rem .15rem;
    }
    .cell-bd {
      flex: 1;
      margin: 0 .4rem;
    }
  }

  .page-ft {
    border-top: 1px solid @disabled-bgc;
    border-bottom: 1px solid @disabled-bgc;
    .content-cell {
      height: .4rem;
      line-height: .4rem;
      background-color: #fff;
      text-align: center;
      color: @blue
    }
    .btn-del {
      font-size: .14rem;
      margin-top: .1rem;
      color: @red;
    }
  }
}
</style>