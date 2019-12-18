
import firebase from 'firebase/app'

export default {
  state: {
    records: [],
  },
  getters: {
    getRecords(state) {
      return state.records
    },
  },
  mutations: {
    _setRecords(state, payload) {
      state.records = payload
    },
  },
  actions: {
    async createRecord({ commit, dispatch }, payload) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/records`).push(payload)
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
    async loadRecords({ commit, dispatch }) {
      try {
        const userId = await dispatch('loadUserId')
        const records = (await firebase.database().ref(`users/${userId}/records`).once('value')).val() || {}
        commit('_setRecords', Object.keys(records).map(key => ({ ...records[key], id: key })))
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
  },
}
