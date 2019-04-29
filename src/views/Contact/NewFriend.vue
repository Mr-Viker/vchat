<template>
  <section class="page new-friend-page page-has-search">
    <!-- 右上角添加联系人图标 -->
    <i class="iconfont icon-jiahaoyou v-header-r" @click='$router.push({name: "AddContact"})'></i>

    <v-search></v-search>

    <div class="page-hd">
      <i class="iconfont icon-iphone"></i>
      <span>添加手机联系人</span>
    </div>

    <div class="page-bd" v-infinite-scroll="getAddContactList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <mt-cell :title="item.username" :label='item.pivot.content' :to="'/personalDetail?id=' + item.id" class='v-cell v-cell-2' v-for='(item, index) in addContactList' :key='item.id'>
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <mt-button class="btn-green btn-action" type='primary' size="small" v-if='item.pivot.status == 0' @click.native.prevent.stop='editAddContact(item, 1, index)'>接受</mt-button>
        <mt-button class="btn-reject btn-action" type='danger' size="small" v-if='item.pivot.status == 0' @click.native.prevent.stop='editAddContact(item, 2, index)'>拒绝</mt-button>
        <span class='btn-txt' v-if='item.pivot.status == 1'>已添加</span>
        <span class='btn-txt' v-if='item.pivot.status == 2'>已拒绝</span>
      </mt-cell>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';
import {mapState} from 'vuex';

export default {
  name: 'NewFriend',
  components: {VSearch},
  data() {
    return {
      addContactList: [],
      page: 1,
      pageNum: 15,
      loading: false, //加载状态
    }
  },

  computed: {
    ...mapState({
      newAddContactNum: state => state.newAddContactNum,
    })
  },

  created() {
    this.getAddContactList();
    if (this.newAddContactNum > 0) {
      this.readAddContact();
    }
  },

  methods: {
    // 告知已读添加请求列表
    readAddContact() {
      this.$api.readAddContact()
      .then(res => {
        if (res.code == '00') {
          this.$store.commit('setNewAddContactNum', 0);
        }
      })
    },

    // 获取添加通讯录好友请求列表
    getAddContactList() {
      if (this.loading) {return;}
      this.loading = true;
      this.$api.getAddContactList({page: this.page, pageNum: this.pageNum})
      .then(res => {
        if (res.code == '00') {
          this.addContactList = this.addContactList.concat(res.data);

          // 检测是否已加载完
          if (this.page < res.last_page) {
            this.page++;
            this.loading = false;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 修改状态
    editAddContact(item, status, index) {
      this.$api.editAddContact({id: item.id, status, status})
      .then(res => {
        if (res.code == '00') {
          this.$set(this.addContactList[index].pivot, 'status', status);

          // 如果是同意 则需要在聊天列表新增和对方的聊天框 并重新获取通讯录列表
          if (status == 1) {
            this.getContactList();
            console.log('editAddContact: ', res.data);
            this.$store.commit('addChatList', res.data);
            this.$router.push({name: 'Chat', query: {id: res.data.uid}});
          }
        } else {
          this.$toast(res.msg);
        }
      })
    }

  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.new-friend-page {
  .page-hd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: .9rem;
    background-color: #fff;
    color: @gray;
    .iconfont {
      color: @green;
      font-size: .32rem;
      margin-bottom: .05rem;
    }
  }

  .page-bd {
    margin-top: .2rem;
    .btn-action {
      height: .27rem;
      font-size: .12rem;
    }
    .btn-reject {
      margin-left: .1rem;
    }
    .btn-txt {
      font-size: .12rem;
    }
  }
}
</style>