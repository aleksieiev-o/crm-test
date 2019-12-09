import Vue from 'vue'
import App from './App'

import './registerServiceWorker'

import router from './router'
import store from './store'

import dateFilter from './filters/dateFilter'

import 'materialize-css/dist/js/materialize.min'

Vue.filter('date', dateFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
