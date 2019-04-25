<template>
  <section class="page new-friend-page page-has-search">
    <!-- 右上角添加联系人图标 -->
    <i class="iconfont icon-jiahaoyou icon-add-contact" @click='$router.push({name: "AddContact"})'></i>

    <v-search></v-search>

    <div class="page-hd">
      <i class="iconfont icon-iphone"></i>
      <span>添加手机联系人</span>
    </div>

    <div class="page-bd" v-infinite-scroll="getAddContactList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <mt-cell :title="item.username" :label='item.pivot.content' :to="'/personalDetail?id=' + item.id" class='v-cell v-cell-2' v-for='(item, index) in addContactList' :key='item.id'>
        <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
        <mt-button class="btn-green" type='primary' size="small" v-if='item.pivot.status == 0' @click.native.prevent.stop='editAddContact(item.id, 1, index)'>接受</mt-button>
        <mt-button class="btn-reject" type='danger' size="small" v-if='item.pivot.status == 0' @click.native.prevent.stop='editAddContact(item.id, 2, index)'>拒绝</mt-button>
        <span class='btn-txt' v-if='item.pivot.status == 1'>已添加</span>
        <span class='btn-txt' v-if='item.pivot.status == 2'>已拒绝</span>
      </mt-cell>
    </div>
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';

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

  created() {
    this.getAddContactList();
    this.readAddContact();
  },

  methods: {
    // 告知已读添加请求列表
    readAddContact() {
      
    },

    // 获取添加通讯录好友请求列表
    getAddContactList() {
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
    editAddContact(id, status, index) {
      this.$api.editAddContact({id: id, status, status})
      .then(res => {
        if (res.code == '00') {
          this.$set(this.addContactList[index].pivot, 'status', status);
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
  .icon-add-contact {
    position: fixed;
    z-index: 10;
    top: .14rem;
    right: .1rem;
    font-size: .18rem;
  }

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
    .btn-reject {
      margin-left: .1rem;
    }
  }
}
</style>