<template>
  <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='70' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='v-uploader flex-v' :multiple="options.multiple" :multiple-size="4" :crop="crop" :crop-ratio='cropRatio'>
    <i class="iconfont icon-photography icon" v-if='!imgs'></i>
    <img :src="getImgURL(item)" alt="" class="img-response" v-for='item in imgs' :key='item'>
    <i class="mintui mintui-field-error icon-del" v-if='showDel && imgs' @click='del'></i>
  </vue-core-image-upload>
</template>


<script>
import VueCoreImageUpload  from 'vue-core-image-upload';

export default {
  name: 'VUploader',
  components: {VueCoreImageUpload},
  props: [ 'inputName', 'multi', 'showDel', 'crop', 'cropRatio'],
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/upload',
        // headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: this.inputName,
        multiple: this.multi || false,
        extensions: 'png, jpeg, jpg, gif',
      },
      imgs: '', //预览图片地址
    };
  },

  methods: {
    // 删除该上传的图片
    del() {
      this.imgs = '';
      this.$emit('del');
    },

    // 读取头像前
    uploading(res) {
      this.$indicator.open();
    },

    // 读取头像后
    uploaded(res) {
      this.$indicator.close();
      if (res.code === '00') {
        this.imgs = res.data;
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

.v-uploader {
  overflow: visible;
  .icon-del {
    position: absolute;
    top: -.08rem;
    right: -.08rem;
    z-index: 10;
  }
}
</style>