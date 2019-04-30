<template>
  <section class="page create-moment-page">
    <i class="iconfont icon-send v-header-r" @click='submit'></i>

    <div class="page-hd">
      <mt-field placeholder="把现在的记忆记录下来吧" type="textarea" rows="6" v-model="form.content" class='v-cell'></mt-field>
    </div>

    <div class="page-bd">
      <v-uploader input-name='file' @uploaded='uploaded' v-for='i in (form.imgs.length + 1)' v-if='i < 5'></v-uploader>
      <!-- <v-uploader input-name='file' @uploaded='uploaded'></v-uploader> -->
      <!-- <v-uploader input-name='file' @uploaded='uploaded'></v-uploader> -->
      <!-- <v-uploader input-name='file' @uploaded='uploaded'></v-uploader> -->
    </div>
  </section>
</template>


<script>
import VUploader from '@/components/VUploader';

export default {
  name: 'CreateMoment',
  components: {VUploader},
  data() {
    return {
      form: {
        content: '',
        imgs: [],
      },
    }
  },

  methods: {
    // 表单提交
    submit() {
      if (this.validate(this.form)) {
        this.$api.createMoment(this.form)
        .then(res => {
          if (res.code == '00') {
            this.$router.push({name: 'Person'});
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 读取头像后
    uploaded(res) {
      this.form.imgs.push(res.data[0]);
    },
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.create-moment-page {
  .v-header-r {
    color: @blue;
  }
  .page-bd {
    padding: .3rem .15rem;
    display: flex;
    .v-uploader {
      margin-right: .15rem;
    }
  }
}
</style>