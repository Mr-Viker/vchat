<template>
  <section class="page chat-list-page">
    <!-- <v-search></v-search> -->

    <div class="page-bd">
      <mt-cell-swipe :title="item.username" :label='item.content' :to="'/Chat?id=' + item.uid + '&num=' + item.new_chat_num" class='v-cell v-cell-2' v-for='(item, index) in chatList' :key='item.uid' :right="[{content: '删 除', style: { background: '#f44336', color: '#fff' }, handler: () => delChatList(item)}]" :left="[{content: '置 顶', style: { background: '#bbb', color: '#fff' }, handler: () => $messagebox.confirm('确定置顶')}]">
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <mt-badge type="error" size='small' class='v-cell-badge' v-if='item.new_chat_num > 0'>{{ item.new_chat_num }}</mt-badge>
        <span class='btn-txt'>{{ item.created_at.split(' ')[1].substr(0, 5) }}</span>
      </mt-cell-swipe>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';
import {mapState} from 'vuex';

export default {
  name: 'ChatList',
  components: {VSearch},
  data() {
    return {
      // chatList: [], //聊天列表
    }
  },

  computed: {
    ...mapState({
      chatList: state => state.chatList, //聊天列表
    })
  },

  methods: {
    // 删除该项聊天记录
    delChatList(item) {
      this.$store.commit('delChatList', item);
    }
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
    .mint-cell-swipe-buttongroup {
      width: .7rem;
    }
    .mint-cell-swipe-button {
      line-height: .6rem;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
  }
}
</style>