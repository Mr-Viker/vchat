<template>
  <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='50' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='v-uploader flex-v'>
    <img :src="getImgURL(imgSrc)" alt="" v-if='imgSrc' class="img-response">
    <i class="iconfont icon-photography icon" v-else></i>
  </vue-core-image-upload>
</template>


<script>
import VueCoreImageUpload  from 'vue-core-image-upload';

export default {
  name: 'VUploader',
  components: {VueCoreImageUpload},
  props: [ 'inputName' ],
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/upload',
        // headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: this.inputName,
        extensions: 'png, jpeg, jpg, gif',
      },
      imgSrc: '', //预览图片地址
    };
  },

  methods: {
    // 读取头像前
    uploading(res) {
      this.$indicator.open();
    },

    // 读取头像后
    uploaded(res) {
      this.$indicator.close();
      if (res.code === '00') {
        this.imgSrc = res.data[this.inputName];
      } else {
        this.$toast(res.msg);
      }
      this.$emit('uploaded', res);
    },

    // 上传失败
    errorhandle(err) {
      this.$indicator.close();
      this.$toast(err);
    },
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

</style>