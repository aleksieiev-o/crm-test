
import firebase from 'firebase/app'

export default {
  state: {
    categories: [],
    category: null,
  },
  getters: {
    getCategories(state) {
      return state.categories
    },
    getCategory(state) {
      return state.category
    },
  },
  mutations: {
    _setCategories(state, payload) {
      state.categories = payload
    },
    _setCategory(state, payload) {
      state.category = payload
    },
  },
  actions: {
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
    async loadCategoryById({ commit, dispatch }, id) {
      try {
        const userId = await dispatch('loadUserId')
        const category = (await firebase.database().ref(`users/${userId}/categories`).child(id).once('value')).val() || {}
        commit('_setCategory', { ...category, id })
      } catch (e) {
        commit('_setError', e)
        throw e
      }
    },
  },
}
