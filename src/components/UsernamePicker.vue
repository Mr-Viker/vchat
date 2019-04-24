<!-- 用户名弹框 -->
<template>
  <section class="username-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>

      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    </mt-popup>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'UsernamePicker',
  props: ['visible'],
  data() {
    return {
      username: '',
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  created() {
    this.username = this.userInfo.username;
  },

  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },


    confirm() {
      if (this.username) {
        this.$emit('confirm', this.username);
      } else {
        this.$toast('请填写用户名');
      }
    }
  },
}
</script>


<style lang='less'>
.username-picker {
  .popup-container {
    width: 100%;
    min-height: 20vh;
  }
}

</style>
