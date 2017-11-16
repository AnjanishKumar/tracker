import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,

  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },


  mutations: {
    setToken(state, token) {
      state.token = token;

      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },

    setUser(state, user) {
      state.user = user;
    },

    clearStore(state) {
      state.token = null;
      state.user = null;
    },
  },


  actions: {
    setToken({commit}, token) {
      commit('setToken', token);
    },

    setUser({commit}, user) {
      commit('setUser', user);
    },

    logout({commit}) {
      commit('setToken', null);
      commit('setUser', null);
    },

    clearStore({commit}) {
      commit('clearStore');
    },
  },
});

export default store;
