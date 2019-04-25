<template>
  <section class="page add-contact-page page-has-search">
    <!-- 右上角添加联系人图标 -->

    <v-search></v-search>

    <div class="page-bd">
      <mt-index-list>
        <!-- 上方四个选项 -->
        <mt-cell :title="item.title" :to='item.url' class='v-cell' v-for='item in hds' :key='item.title'><img slot="icon" :src="item.img" class='img-head'></mt-cell>

        <mt-index-section :index="key" v-for='(contacts, key) in contactList' :key='key'>
          <mt-cell :title="item.username" class='v-cell' v-for='item in contacts' :key='item.id'><img slot="icon" :src="getImgURL(item.avatar)" class='img-head'></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';
import {isChinese, getPinYinFirstCharacter} from '@/assets/js/pinyin';

export default {
  name: 'AddContact',
  components: {VSearch},
  data() {
    return {
      hds: [
        {title: '新的朋友', img: require('../../assets/img/contact/contact_top-friend-notify.png'), url: '/addContact'},
        {title: '群聊', img: require('../../assets/img/contact/contact_top-addgroup.png'), url: '/group'},
        {title: '标签', img: require('../../assets/img/contact/contact_top-tag.png'), url: '/tag'},
        {title: '公众号', img: require('../../assets/img/contact/contact_top-offical.png'), url: '/office'},
      ],
      contactList: {},
    }
  },

  created() {
    if (this.$store.state.contactList) {
      this.contactList = this.$store.state.contactList;
    } else {
      this.getContactList();
    }
  },

  methods: {
    // 获取通讯录列表
    getContactList() {
      this.$api.getContactList()
      .then(res => {
        if (res.code == '00') {
          this.contactList = this.formatContact(res.data);
          this.$store.commit('setContactList', this.contactList);
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 格式化通讯录数组
    formatContact(data) {
      var result = {};
      var charArr = [];
      var res = {};

      data.forEach((item) => {
        var key = getPinYinFirstCharacter(item.username).substr(0,1).toUpperCase();
        if (typeof result[key] == 'undefined') {
          result[key] = [];
          charArr.push(key);
        }
        result[key].push(item);
      });

      // 排序
      charArr.sort();
      charArr.forEach((val) => {
        res[val] = result[val];
      })

      return res;
    }
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.contact-page {
  .icon-add-contact {
    position: fixed;
    z-index: 10;
    top: .14rem;
    right: .1rem;
    font-size: .18rem;
  }

  .page-bd {
    touch-action: pan-y;
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
  }
}
</style>