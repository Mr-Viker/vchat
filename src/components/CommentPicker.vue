<!-- 用户名弹框 -->
<template>
  <section class="comment-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>

      <mt-field placeholder="请输入..." type='textarea' rows='3' v-model="content"></mt-field>
    </mt-popup>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'CommentPicker',
  props: ['visible'],
  data() {
    return {
      content: '',
    }
  },

  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },


    confirm() {
      if (this.content) {
        this.$emit('confirm', this.content);
        this.content = '';
      } else {
        this.$toast('内容不能为空');
      }
    }
  },
}
</script>


<style lang='less'>
.comment-picker {
  .popup-container {
    width: 100%;
    min-height: 40vh;
  }
  .mint-cell:last-child {
    background-image: none;
  }
}

</style>
