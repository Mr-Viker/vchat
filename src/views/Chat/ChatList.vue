<template>
  <section class="page chat-list-page">
    <v-search></v-search>

    <div class="page-bd">
      <mt-cell :title="item.username" :label='item.content' :to="'/Chat?id=' + item.uid" class='v-cell v-cell-2' v-for='(item, index) in chatList' :key='item.uid'>
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <mt-badge type="error" size='small' class='v-cell-badge' v-if='item.new_chat_num > 0'>{{ item.new_chat_num }}</mt-badge>
        <span class='btn-txt'>{{ item.created_at.split(' ')[1].substr(0, 5) }}</span>
      </mt-cell>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';

export default {
  name: 'ChatList',
  components: {VSearch},
  data() {
    return {
      chatList: [], //聊天列表
    }
  },

  created() {
    this.getChatList();
  },

  methods: {
    // 获取聊天列表
    getChatList() {
      this.$api.getChatList()
      .then(res => {
        if (res.code == '00') {
          this.chatList = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },
  }
}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.chat-list-page {
  .v-search {
    position: static;
    top: 0;
  }

  .page-bd {
    .btn-txt {
      font-size: .12rem;
      color: @gray;
    }
    .v-cell-badge {
      position: absolute;
      top: .06rem;
      left: .37rem;
      padding: .01rem .04rem;
    }
  }
}
</style>