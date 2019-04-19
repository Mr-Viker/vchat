<template>
  <mt-header fixed :title="title" class='v-header'>
    <span slot='left'><slot name='left'></slot></span>
    <span slot='right'><slot name='right'></slot></span>
  </mt-header>
</template>


<script>
export default {
  name: 'VHeader',
  props: [ 'title' ],
  data() {
    return {
      
    };
  },

  methods: {

  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-header {
  height: .46rem;
  background: linear-gradient(to bottom, #303036, #3c3b40);
  .mint-header-title {
    font-size: .18rem;
  }
}
</style>