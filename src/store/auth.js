
import firebase from 'firebase/app'

export default {
  state: {
    userInfo: null,
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
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
    async logout() {
      await firebase.auth().signOut()
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const userId = await dispatch('loadUserId')
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 10000,
          name,
        })
        // await commit('setUserInfo', {
        //   userId, name, email, password,
        // })
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
