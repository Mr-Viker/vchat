<template>
  <mt-search class='v-search' v-model="value"></mt-search>
</template>


<script>
export default {
  name: 'VSearch',
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

.v-search {
  position: fixed;
  top: .46rem;
  width: 100vw;
  height: .4rem;
  z-index: 1;
  .mint-searchbar {
    background-color: @bgc;
    padding: .08rem .1rem;
  }
  .mint-searchbar-inner {
    padding: 0;
    height: .24rem;
    padding: 0 .1rem;
  }
}
</style>