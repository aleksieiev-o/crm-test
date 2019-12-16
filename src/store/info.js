
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
    _setUInfo(state, payload) {
      state.uInfo = payload
    },
  },
  actions: {
    async loadUInfo({ commit, dispatch }) {
      try {
        const userId = await dispatch('loadUserId')
        const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
        commit('_setUInfo', info)
      } catch (e) {}
    },
  },
}
