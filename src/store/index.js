import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import info from './info';
import category from './category';
import records from './records';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, info, category, records,
  },
  state: {
    error: null,
  },
  getters: {
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    _setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async loadCourse() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
      return res.json();
    },
  },
});
