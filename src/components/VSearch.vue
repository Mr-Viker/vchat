<template>
  <mt-search class='v-search' v-model="value"></mt-search>
</template>


<script>
export default {
  name: 'VSearch',
  data() {
    return {
      value: '',
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
  height: .5rem;
  z-index: 1;
  .mint-searchbar {
    background-color: @bgc;
    padding: .1rem;
  }
  .mint-searchbar-inner {
    padding: 0;
    height: .3rem;
    padding: 0 .1rem;
  }
}
</style>