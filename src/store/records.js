
import firebase from 'firebase/app'

export default {
  state: {
    records: [],
    record: null,
  },
  getters: {
    getRecords(state) {
      return state.records
    },
    getRecord(state) {
      return state.record
    },
  },
  mutations: {
    _setRecords(state, payload) {
      state.records = payload
    },
    _setRecord(state, payload) {
      state.record = payload
    },
  },
  actions: {
    async createRecord({ commit, dispatch }, payload) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/records/${payload.categoryId}`).set({ ...payload })
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
    async loadRecordById({ commit, dispatch }, id) {
      try {
        const userId = await dispatch('loadUserId')
        const record = (await firebase.database().ref(`users/${userId}/records`).child(id).once('value')).val() || {}
        commit('_setRecord', { ...record })
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
  },
}
