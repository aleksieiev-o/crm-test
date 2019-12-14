import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, info,
  },
  state: {
    error: null,
  },
  getters: {
    getError(state) {
      return state.error
    },
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
    async loadCourse() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return res.json()
    },
  },
})
