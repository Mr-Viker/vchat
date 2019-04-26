<template>
  <section class="page add-contact-page">
    <div class="page-hd">
      <mt-search v-model="keyword" placeholder="微信号/手机号" class='hd-search'>
        <div class="search-list" v-infinite-scroll="search" infinite-scroll-disabled="loading" infinite-scroll-distance="100" infinite-scroll-immediate-check='false'>
          <mt-cell :title="item.username" :label='item.signature' :to="'/personalDetail?id=' + item.id" is-link class='v-cell v-cell-2' v-for='item in list' :key='item.id'>
            <img slot="icon" :src="getImgURL(item.avatar)" class='img-head'>
          </mt-cell>
        </div>
        <div class="hd-tips" v-if='showNoResult'>暂无数据</div>
      </mt-search>

      <div class="hd-tips">我的微信号: {{userInfo.vchat_id}}</div>
    </div>

    <div class="page-bd">
      <mt-cell :title="item.title" :label='item.label' is-link class='v-cell v-cell-2' v-for='item in bds' :key='item.id'>
        <img slot="icon" :src="item.img" class='img-head'>
      </mt-cell>
    </div>
    
  </section>
</template>


<script>
import {mapState} from 'vuex';
import axios from '@/assets/js/http';

export default {
  name: 'AddContact',
  data() {
    return {
      bds: [
        {id: 1, title: '雷达加好友', label: '添加身边的朋友', img: require('../../assets/img/contact/contact_add-friend-reda.png')},
        {id: 2, title: '面对面建群', label: '与身边的朋友进入同一个群聊', img: require('../../assets/img/contact/contact_top-addgroup.png')},
        {id: 3, title: '扫一扫', label: '扫描二维码名片', img: require('../../assets/img/contact/contact_add-friend-scanqr.png')},
        {id: 4, title: '手机联系人', label: '添加通讯录中的朋友', img: require('../../assets/img/contact/contact_add-friend-contacts.png')},
        {id: 5, title: '公众号', label: '获得更多资讯和服务', img: require('../../assets/img/contact/contact_top-offical.png')},
      ],
      keyword: '', //搜索关键字
      list: [], //搜索结果
      page: 1,
      pageNum: 15,
      loading: false, //加载状态
      timer: null, // 计时器
      showNoResult: false,
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    })
  },

  watch: {
    keyword(newVal, oldVal) {
      this.reset();
      clearTimeout(this.timer);
      if (newVal) {
        this.timer = setTimeout(() => {
          this.search();
        }, 500);
      }
    }
  },

  methods: {
    // 重置
    reset() {
      this.list = [];
      this.page = 1;
      this.pageNum = 15;
      this.loading = false;
    },

    // 搜索
    search() {
      if (this.loading) {return;}
      this.loading = true;
      var form = {
        search: this.keyword,
        page: this.page,
        pageNum: this.pageNum,
      };
      this.$api.search(form)
      .then(res => {
        if (res.code == '00') {
          // 如果请求的关键词和当前的关键词相同才显示，否则就是之前请求的 不作处理
          if (this.keyword == form.search) {
            this.list = this.list.concat(res.data);

            if (this.page < res.last_page) {
              this.page++;
              this.loading = false;
            }

            if (this.list.length <= 0) {
              this.showNoResult = true;
            } else {
              this.showNoResult = false;
            }
          }
        } else {
          this.$toast(res.msg);
          if (this.list.length <= 0) {
            this.showNoResult = true;
          }
        }
      })
    },
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.add-contact-page {
  .page-hd {
    .hd-search {
      height: .47rem;
      border-bottom: 1px solid @disabled-bgc;
    }
    .mint-searchbar {
      padding: .05rem .1rem;
      background-color: #fff;
      z-index: 20;
      border-bottom: 1px solid @border-c;
    }
    .mintui-search {
      font-size: .16rem;
      color: @green;
      margin-right: .1rem;
    }
    .hd-tips {
      height: .4rem;
      line-height: .4rem;
      text-align: center;
    }
    .mint-search-list {
      z-index: 10;
      padding-top: .93rem;
      min-height: 100vh;
      background-color: #fff;
      box-sizing: border-box;
    }
  }

  .page-bd {
    margin-top: .3rem;
  }
}
</style>