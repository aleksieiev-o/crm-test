
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
    setCategories(state, payload) {
      state.categories = payload
    },
    clearCategories(state) {
      state.categories = []
    },
  },
  actions: {
    async loadCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch('loadUserId')
        const categories = (await firebase.database().ref(`users/${userId}/categories`).once('value')).val() || {}
        commit('setCategories', Object.keys(categories).map(key => ({ ...categories[key], id: key })))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const userId = await dispatch('loadUserId')
        const category = await firebase.database().ref(`users/${userId}/categories`).push({ name, limit })
        return { name, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { id, name, limit }) {
      try {
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`users/${userId}/categories`).child(id).update({ name, limit })
        await dispatch('loadCategories')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
