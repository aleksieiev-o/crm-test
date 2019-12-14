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

  },
})
