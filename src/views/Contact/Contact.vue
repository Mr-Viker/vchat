<template>
  <section class="page contact-page">
    <!-- <mt-search v-model="value"></mt-search> -->

    <mt-index-list>
      <mt-index-section index="A">
        <mt-cell title="Aaron" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
        <mt-cell title="Alden" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
        <mt-cell title="Austin" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
      </mt-index-section>
      <mt-index-section index="B">
        <mt-cell title="Baldwin" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
        <mt-cell title="Braden" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
      </mt-index-section>
      <mt-index-section index="Z">
        <mt-cell title="Zack" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
        <mt-cell title="Zane" class='v-cell'><img slot="icon" src="../../assets/img/person/logo.jpg" class='img-head'></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </section>
</template>


<script>
export default {
  name: 'Contact',
  data() {
    return {
      value: '',
    }
  }

}
</script>


<style lang="less">
@import '../../assets/css/_variable.less';
  
.contact-page {
  .mint-indexsection-index {
    padding: .02rem 0 .02rem .15rem;
    background-color: @bgc;
  }
  .mint-indexlist-content {
    margin-right: 0 !important;
  }
  .mint-indexlist-nav {
    background: none;
    border-left: none;
    color: @gray;
  }
}
</style>