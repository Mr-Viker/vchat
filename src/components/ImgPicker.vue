<template>
  <div class="img-picker" v-if='visible' @click='cancel'>
    <div class="v-modal"></div>
    <mt-swipe :auto="0" :show-indicators="false" :continuous='false' :default-index='index'>
      <mt-swipe-item v-for='item in imgs' ><img :src="getImgURL(item)" alt="" class="img-w"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  name: 'ImgPicker',
  props: ['visible', 'imgs', 'index'],
  data() {
    return {

    };
  },

  methods: {
    cancel() {
      this.$emit('cancel');
    }
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.img-picker {
  position: fixed;
  z-index: 102;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  touch-action: none;

  .img-w {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 100vw;
    height: auto;

  }
}
</style>