<template>
  <section class="page chat-list-page">
    <v-search></v-search>

    <div class="page-bd">
      <mt-cell :title="item.username" :label='item.contents[0].msg' :to="'/Chat?id=' + item.from_id" class='v-cell v-cell-2' v-for='(item, index) in chatList' :key='item.from_id'>
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <span class='btn-txt'>{{ item.contents[0].time.split(' ')[1] }}</span>
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
  }
}
</style>