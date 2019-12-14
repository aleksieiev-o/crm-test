
import firebase from 'firebase/app'

export default {
  state: {
    uInfo: null,
  },
  getters: {
    getUInfo(state) {
      return state.uInfo
    },
  },
  mutations: {
    setUInfo(state, payload) {
      state.uInfo = payload
    },
    clearUInfo(state) {
      state.uInfo = null
    },
  },
  actions: {
    async loadUInfo({ commit, dispatch }) {
      try {
        const userId = await dispatch('loadUserId')
        const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
        commit('setUInfo', info)
      } catch (e) {}
    },
  },
}
