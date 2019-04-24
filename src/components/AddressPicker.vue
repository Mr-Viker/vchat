<!-- 省市选择器 -->
<template>
  <section class="address-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>
      
      <mt-picker :slots="slots" @change='change'></mt-picker>
    </mt-popup>
  </section>
</template>


<script>
import area from '@/assets/js/area.json';
import {mapState} from 'vuex';

export default {
  name: 'AddressPicker',
  props: ['visible'],
  data() {
    return {
      selectedProvince: '',
      selectedCity: '',
      slots: [{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'right'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: [],
        className: 'slot3',
        textAlign: 'left'
      }],
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },

    change(picker, values) {
      // 初始化
      if (typeof values[0] == 'undefined') {
        // 如果用户有地址信息则默认选中该项
        if (this.userInfo.area) {
          var arr = this.userInfo.area.split(' ');
          this.selectedProvince = arr[0]
          this.selectedCity = arr[1];
        } else {
          this.selectedProvince = area.provinces[2];
          this.selectedCity = area.cities[this.selectedProvince][0];
        }

        this.$nextTick(function() {
          picker.setSlotValues(0, area.provinces);
          picker.setSlotValue(0, this.selectedProvince);
          picker.setSlotValues(1, area.cities[this.selectedProvince]);
          picker.setSlotValue(1, this.selectedCity);
        })
        return;
      }
      
      if (values[0] != this.selectedProvince) {
        this.selectedProvince = values[0];
        picker.setSlotValues(1, area.cities[this.selectedProvince]);
      } else if (values[1] != this.selectedCity) {
        this.selectedCity = values[1];
      }
    },

    confirm() {
      if (this.selectedProvince && this.selectedCity) {
        this.$emit('confirm', {selectedProvince: this.selectedProvince, selectedCity: this.selectedCity});
      } else {
        this.$toast('请选择地址');
      }
    }
  },
}
</script>


<style lang='less'>
.address-picker {
  .popup-container {
    width: 100%;
  }
  .picker-item {
    font-size: .14rem;
    text-align: center;
  }
}

</style>
