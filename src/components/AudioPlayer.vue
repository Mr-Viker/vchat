<!-- 录音组件 使用了两种方式 在app内调用plus.audio来操作 否则调用recorder.js -->
<template>
  <div class="audio-player">
    <audio ref='player' class='player'></audio>
  </div>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'AudioPlayer',
  props: ['options'],
  data() {
    return {
      player: '', //播放器
      timer: '', //计时器
    };
  },

  computed: {
    ...mapState({
      recordList: state => state.recordList,
    })
  },

  watch: {
    options(newVal, oldVal) {
      clearInterval(this.timer);
      // 如果点的是同一个语音
      if (newVal.same) {

        // 有两种情况 1还在播放 则暂停  2已播放完或已暂停 则再次播放
        if (this.player.paused || this.player.ended) {
          this.player.play();
          this.countdown();
        } else {
          this.player.pause();
        }

      } else {
        // 如果是不同视频 则换源 
        // 换源前先将还在播放的语音的时长变回总长
        if (!this.player.paused && !this.player.ended && oldVal) {
          this.$emit('change', {index: oldVal.index, duration: Math.ceil(this.player.duration)});
        }
        this.player.pause();
        this.player.src = this.getImgURL(this.recordList[newVal.index]['content']);
        this.player.play();
        this.countdown();
      }
    }
  },

  mounted() {
    this.player = this.$refs.player;
  },

  methods: {
    // 倒计时
    countdown() {
      console.log('start:', this.player.duration, this.player.currentTime);
      this.timer = setInterval(() => {
        console.log('interval:', this.player.duration, this.player.currentTime);
        var leftTime = Math.ceil(this.player.duration - this.player.currentTime);

        if (leftTime > 0) {
          this.$emit('change', {index: this.options.index, duration: leftTime});
        } else {
          this.$emit('change', {index: this.options.index, duration: Math.ceil(this.player.duration)});
          clearInterval(this.timer);
        }
      }, 1000);
    }
  }
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-audio {
  .audio-icon {
    font-size: .3rem;
    color: #fff;
  }
}
</style>