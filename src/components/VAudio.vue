<!-- 录音组件 使用了两种方式 在app内调用plus.audio来操作 否则调用recorder.js -->
<template>
  <div class="v-audio">
    <i class="iconfont icon-huatongyuyin audio-icon icon-1" @touchstart.prevent='start1' @touchend.prevent='stop1' v-if='isApp()'></i>
    <i class="iconfont icon-huatongyuyin audio-icon icon-2" @touchstart.prevent='start2' @touchend.prevent='stop2' v-else></i>
    <!-- <audio class='audio-player' ref='player'></audio> -->
  </div>
</template>


<script>
export default {
  name: 'VAudio',
  data() {
    return {
      audio: '', //使用默认配置，mp3格式
      // audioUrl: '', //上传后的音频地址
      toaster: '', //消息提示框实例 用于手动关闭消息提示框
      startTime: 0, // 录音时长 因为plus.audio.record得到的只有文件路径，没有时长，这里就简单获取用户按住语音按钮的时长了
      stopTime: 0, // 录音时长 因为plus.audio.record得到的只有文件路径，没有时长，这里就简单获取用户按住语音按钮的时长了
    };
  },

  created() {
    // 获取音频对象
    if (this.isApp()) {
      this.audio = plus.audio.getRecorder();
    } else if (!Recorder.Support()) {
      // 判断是否支持录音 不会判断和调起用户授权
      this.$toast('很抱歉，当前设备不支持发送语音功能哦');
    } else {
      this.audio = Recorder();
    }
  },

  methods: {
    // app开始录音
    start1() {
      if (!this.audio) { return this.$toast('语音设备未准备好'); }
      this.showReordToast();
      this.startTime = Date.now();

      this.audio.record({filename: '_doc/audio/', format: 'mp3'}, (file) => {
        if (this.endTime - this.startTime < 1000) {
          return this.$toast('语音时长太短！');
        }
        this.submitByPlus(file); // 如果录音成功则上传至服务器  file为本地文件路径

      }, (err) => {
        this.closeRecordToast();
        this.$toast(err.message);
      });
    },

    // app停止录音
    stop1() {
      this.closeRecordToast();
      this.endTime = Date.now();
      this.audio.stop();
    },

    // 上传至服务器
    submitByPlus(file) {
      var task = plus.uploader.createUpload(this.$store.state.baseURL + '/upload', {
        method: 'POST',
      }, (res, status) => {
        // 如果上传成功 则将返回的reponseText解析后获取在服务器端的地址 emit出去
        if (status == '200') {
          var url = JSON.parse(res.responseText).data[0];
          var duration = Math.ceil((this.endTime - this.startTime) / 1000);
          this.$emit('success', {url: url, duration: duration});
        } else {
          this.$toast('上传至服务器失败:' + status);
        }
      });
      task.addFile(file, {key: 'file'});
      task.start();
    },


    // web开始录音
    start2() {
      this.showReordToast();

      this.audio.open(() => {
        this.audio.start();

      }, (err, reject) => {
        this.closeRecordToast();
        this.$toast(err);
      })
    },

    // web停止录音
    stop2() {
      this.closeRecordToast();

      this.audio.stop((blob, duration) => {
        this.audio.close(); //释放录音资源
        if (duration < 1000) {
          return this.$toast('语音时长太短！');
        }
        this.submit(blob, Math.ceil(duration / 1000));

      }, (err) => {
        this.$toast(err);
      });
    },

    // 保存至服务器
    submit(blob, duration) {
      var form = new FormData();
      form.append('file', blob, 'audio_' + Date.now() + '.mp3');

      this.$api.upload(form)
      .then(res => {
        if (res.code == '00') {
          this.$emit('success', {url: res.data[0], duration: duration});
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 显示录音中的弹框
    showReordToast() {
      this.toaster = this.$toast({message: '', iconClass: 'iconfont icon-huatongyuyin', duration: -1});
    },

    closeRecordToast() {
      this.toaster && this.toaster.close();
    }
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-audio {
  .audio-icon {
    font-size: .3rem;
    color: #fff;
  }
  // .audio-player {
  //   visibility: hidden;
  // }
}
</style>