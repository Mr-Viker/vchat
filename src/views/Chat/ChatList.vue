<template>
  <section class="page chat-list-page">
    <v-search></v-search>

    <div class="page-bd">
      <mt-cell :title="item.username" :label='item.pivot.content' :to="'/Chat?id=' + item.id" class='v-cell v-cell-2' v-for='(item, index) in chatList' :key='item.id'>
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <span class='btn-txt'>10:00</span>
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

}
</style>