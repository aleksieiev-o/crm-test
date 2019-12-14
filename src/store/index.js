import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
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
