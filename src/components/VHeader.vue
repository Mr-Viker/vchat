<template>
  <mt-header fixed :title="title" class='v-header'>
    <span slot='left'><mt-button icon="back" slot='left' v-if='showBack' @click.native='back'>返回</mt-button></span>
    <span slot='right'><slot name='right'></slot></span>
  </mt-header>
</template>


<script>
export default {
  name: 'VHeader',
  props: [ 'title', 'showBack' ],
  data() {
    return {
      
    };
  },

  methods: {
    back() {
      return this.$router.back();
    }
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-header {
  height: .46rem;
  background: linear-gradient(to bottom, #303036, #3c3b40);
  .mint-header-title {
    font-size: .16rem;
  }
}
</style>