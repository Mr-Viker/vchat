<!-- 性别选择器 -->
<template>
  <section class="sex-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>
      
      <mt-radio title="" v-model="sex" :options="options"></mt-radio>
    </mt-popup>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'AddressPicker',
  props: ['visible'],
  data() {
    return {
      options: [
        {label: '男', value: '0'},
        {label: '女', value: '1'},
      ],
      sex: '',
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  created() {
    this.sex = this.userInfo.sex + '';
  },

  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },


    confirm() {
      this.$emit('confirm', this.sex);
    }
  },
}
</script>


<style lang='less'>
.sex-picker {
  .popup-container {
    width: 100vw;
  }
  .picker-item {
    font-size: .14rem;
    text-align: center;
  }
}

</style>
