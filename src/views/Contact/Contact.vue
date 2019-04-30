<template>
  <section class="page contact-page page-has-search">
    <!-- 右上角添加联系人图标 -->
    <i class="iconfont icon-jiahaoyou v-header-r" @click='$router.push({name: "AddContact"})'></i>

    <v-search></v-search>

    <div class="page-bd">
      <mt-index-list>
        <!-- 上方四个选项 -->
        <mt-cell :title="item.title" :to='item.url' class='v-cell' v-for='item in hds' :key='item.title'>
          <img slot="icon" :src="item.img" class='img-head'>
          <span class="red-point" v-if='item.title == "新的朋友" && newAddContactNum > 0 '></span>
        </mt-cell>

        <mt-index-section :index="key" v-for='(contacts, key) in contactList' :key='key'>
          <mt-cell :title="item.username" class='v-cell' :to="'/personalDetail?id=' + item.id" v-for='item in contacts' :key='item.id'><img slot="icon" :src="getImgURL(item.avatar)" class='img-head'></mt-cell>
        </mt-index-section>

        <div class="list-tips">{{ totalContactNum }}位联系人</div>
      </mt-index-list>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';
import {mapState} from 'vuex';

export default {
  name: 'Contact',
  components: {VSearch},
  data() {
    return {
      hds: [
        {title: '新的朋友', img: require('../../assets/img/contact/contact_top-friend-notify.png'), url: '/newFriend'},
        // {title: '群聊', img: require('../../assets/img/contact/contact_top-addgroup.png'), url: '/group'},
        // {title: '标签', img: require('../../assets/img/contact/contact_top-tag.png'), url: '/tag'},
        // {title: '公众号', img: require('../../assets/img/contact/contact_top-offical.png'), url: '/office'},
      ],
    }
  },

  computed: {
    ...mapState({
      contactList: state => state.contactList, //通讯录好友列表
      newAddContactNum: state => state.newAddContactNum,
      totalContactNum: state => state.totalContactNum,
    })
  },

  created() {
    if (!this.contactList) {
      this.getContactList();
    }
  },

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.contact-page {
  .page-bd {
    touch-action: pan-y;

    .red-point {
      display: inline-block;
      width: .06rem;
      height: .06rem;
      border-radius: 50%;
      background-color: @red;
      margin-right: .2rem;
    }
    .mint-indexsection-index {
      padding: .02rem 0 .02rem .15rem;
      background-color: @bgc;
    }
    .mint-indexlist-content {
      margin-right: 0 !important;
    }
    .mint-indexlist-nav {
      background: none;
      border-left: none;
      color: @gray;
    }

    .list-tips {
      height: .45rem;
      line-height: .45rem;
      text-align: center;
      background-color: #fff;
      color: @gray;
    }
  }
}
</style>