<template>
  <section class="page find-page page-has-hd">
    <mt-navbar v-model="selected" fixed class='hd-navbar'>
      <mt-tab-item id="1">大厅</mt-tab-item>
      <mt-tab-item id="2">好友</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="find-card">
          
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">

      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>


<script>
export default {
  name: 'Find',
  data() {
    return {
      selected: '1',
    }
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.find-page {
  .hd-navbar {
    padding: 0 30vw;

    .mint-tab-item {
      padding: .14rem 0;

      &.is-selected {
        color: @green;
        border-bottom: 2px solid @green;
        margin-bottom: -2px;
      }
    }
    .mint-tab-item-label {
      font-size: .15rem;
    }
  }
}
</style>