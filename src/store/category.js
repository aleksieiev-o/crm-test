
import firebase from 'firebase/app'

export default {
  state: {
    categories: [],
  },
  getters: {
    getCategories(state) {
      return state.categories
    },
  },
  mutations: {
    _setCategories(state, payload) {
      state.categories = payload
    },
  },
  actions: {
    async loadCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch('loadUserId')
        const categories = (await firebase.database().ref(`users/${userId}/categories`).once('value')).val() || {}
        commit('_setCategories', Object.keys(categories).map(key => ({ ...categories[key], id: key })))
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/categories`).push({ name, limit })
        await dispatch('loadCategories')
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
    async createRecord({ commit, dispatch }, payload) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/records`).push(payload)
        // await dispatch('loadCategories')
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
    async updateCategory({ commit, dispatch }, { id, name, limit }) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/categories`).child(id).update({ name, limit })
        await dispatch('loadCategories')
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
  },
}
