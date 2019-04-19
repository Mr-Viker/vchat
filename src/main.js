import Vue from 'vue'
import Mint from 'mint-ui';
import 'normalize.css';
import 'mint-ui/lib/style.css';

import App from './App.vue'
import router from './router'
import store from './store'

import common from '@/assets/js/common'
import validator from '@/assets/js/validator'
import api from '@/assets/js/api'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.use(Mint);
Vue.use(common)
Vue.use(validator)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
