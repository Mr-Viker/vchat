<template>
  <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='70' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='v-uploader flex-v' :crop="crop" :crop-ratio='cropRatio' :crop-btn="{ok:'确定','cancel':'取消'}">
    <img :src="getImgURL(showImg)" alt="" class="img-response" v-if='showImg'>
    <i :class="['iconfont icon', icon]" v-else-if='icon'></i>
    <i class="iconfont icon-photography icon" v-else></i>
    <i class="mintui mintui-field-error icon-del" v-if='showDel && showImg' @click='del'></i>
  </vue-core-image-upload>
</template>


<script>
import VueCoreImageUpload  from 'vue-core-image-upload';

export default {
  name: 'VUploader',
  components: {VueCoreImageUpload},
  // index: 主要用于发布记忆时知道当前是第几个vuploader
  // showImg: 用于上传图片后的显示
  // cropRatio: 裁剪比例 1:1 auto 
  // icon: 未上传图像时的显示图标
  props: [ 'inputName', 'showDel', 'crop', 'cropRatio', 'index', 'showImg', 'icon'],
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/upload',
        // headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: this.inputName,
        extensions: 'png, jpeg, jpg, gif',
      },
      // imgs: '', //预览图片地址
    };
  },

  methods: {
    // 删除该上传的图片
    del() {
      // this.imgs = '';
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
        // this.imgs = res.data;
        this.$emit('uploaded', res, this.index);
      } else {
        this.$toast(res.msg);
      }
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