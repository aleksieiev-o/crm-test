
import firebase from 'firebase/app'

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
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
  },
}
