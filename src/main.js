import Vue from 'vue'
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'

import App from './App'
import router from './router'
import store from './store'

import notificationsMessage from './helpers/notificationMessage'

import dateFilter from './helpers/filters/dateFilter'
import courseFilter from './helpers/filters/courseFilter'

import tooltip from './helpers/directives/tooltip'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

import PreLoader from './components/PreLoader'

Vue.use(Vuelidate)
Vue.use(notificationsMessage)

Vue.filter('date', dateFilter)
Vue.filter('course', courseFilter)

Vue.directive('tooltip', tooltip)

Vue.component('PreLoader', PreLoader)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyDENzKF8oLWE7Bp5i2bIps9SB3mSfYKUSg',
  authDomain: 'vue-test-crm-47bbc.firebaseapp.com',
  databaseURL: 'https://vue-test-crm-47bbc.firebaseio.com',
  projectId: 'vue-test-crm-47bbc',
  storageBucket: 'vue-test-crm-47bbc.appspot.com',
  messagingSenderId: '282156607592',
  appId: '1:282156607592:web:2ae476beb6856bf5ab73dd',
  measurementId: 'G-77FH4JTGTC',
})
firebase.analytics()

let app = null

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
