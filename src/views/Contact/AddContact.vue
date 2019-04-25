<template>
  <section class="page add-contact-page page-has-search">

    <v-search></v-search>

    
  </section>
</template>


<script>
import VSearch from '@/components/VSearch';

export default {
  name: 'AddContact',
  components: {VSearch},
  data() {
    return {
      
    }
  },

  methods: {
    
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.add-contact-page {
  
}
</style>