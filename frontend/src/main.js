import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import common from './js/common.js'

Vue.config.productionTip = false
Vue.prototype.$common = common

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
