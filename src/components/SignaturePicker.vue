<!-- 个性签名弹框 -->
<template>
  <section class="signature-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>

      <mt-field label="个性签名" placeholder="请输入个性签名" v-model="signature"></mt-field>
    </mt-popup>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'SignaturePicker',
  props: ['visible'],
  data() {
    return {
      signature: '',
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  created() {
    this.signature = this.userInfo.signature;
  },

  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },


    confirm() {
      this.$emit('confirm', this.signature);
    }
  },
}
</script>


<style lang='less'>
.signature-picker {
  .popup-container {
    width: 100%;
    min-height: 20vh;
  }
}

</style>
