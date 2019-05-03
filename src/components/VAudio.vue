<!-- 录音组件 -->
<template>
  <div class="v-audio">
    <i class="iconfont icon-huatongyuyin audio-icon" @touchstart.prevent='start' @touchend.prevent='stop'></i>
    <!-- <audio class='audio-player' ref='player'></audio> -->
  </div>
</template>


<script>
export default {
  name: 'VAudio',
  data() {
    return {
      audio: Recorder(), //使用默认配置，mp3格式
      // audioUrl: '', //上传后的音频地址
      toaster: '', //消息提示框实例 用于手动关闭消息提示框
    };
  },

  created() {
    this.init();
  },

  methods: {
    // 判断是否支持录音 不会判断和调起用户授权
    init() {
      if (!Recorder.Support()) {
        this.$toast('很抱歉，您手机暂时不支持发送语音功能哦');
      }
    },

    // 开始录音
    start() {
      this.toaster = this.$toast({message: '', iconClass: 'iconfont icon-huatongyuyin', duration: -1});

      this.audio.open(() => {
        this.audio.start();
      }, (err, reject) => {
        this.toaster && this.toaster.close();
        this.$toast(err);
      })
    },

    // 停止录音
    stop() {
      this.toaster && this.toaster.close();

      this.audio.stop((blob, duration) => {
        this.audio.close(); //释放录音资源
        this.submit(blob, Math.ceil(duration / 1000));
        // this.$refs.player.src = URL.createObjectURL(blob);
        // this.$refs.player.play();
      }, (err) => {
        this.$toast(err);
      });
    },

    // 保存至服务器
    submit(blob, duration) {
      var form = new FormData();
      form.append('file', blob, 'template.mp3');

      this.$api.upload(form)
      .then(res => {
        if (res.code == '00') {
          this.$emit('success', {url: res.data[0], duration: duration});
          // this.audioUrl = res.data[0];
          // this.$refs.player.src = this.getImgURL(this.audioUrl);
          // this.$refs.player.play();
        } else {
          this.$toast(res.msg);
        }
      })
    }
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-audio {
  .audio-icon {
    font-size: .26rem;
    color: #fff;
  }
  // .audio-player {
  //   visibility: hidden;
  // }
}
</style>