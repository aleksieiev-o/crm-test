
import firebase from 'firebase/app'

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(commit, dispatch)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearUInfo')
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 10000,
          name,
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    loadUserId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
  },
}
