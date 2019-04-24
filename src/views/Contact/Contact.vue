<template>
  <section class="page contact-page page-has-search">
    <v-search></v-search>

    <mt-index-list>
      <mt-index-section index="A">
        <mt-cell title="Aaron" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';

export default {
  name: 'Contact',
  components: {VSearch},
  data() {
    return {
      contactList: [],
    }
  },

  created() {
    this.getContactList();
  },

  methods: {
    // 获取通讯录列表
    getContactList() {
      this.$api.getContactList()
      .then(res => {
        if (res.code == '00') {
          this.contactList = res.data;
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
  
.contact-page {
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
</style>