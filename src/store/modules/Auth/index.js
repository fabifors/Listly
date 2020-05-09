import { Firebase, Database } from '../../../firebase';
import InitialState from './initialState';
import initialState from './initialState';
const state = {
  ...InitialState
};

const mutations = {
  SET_USER: function (state, payload) {
    state.user = payload;
  },

  SET_TOKEN: function (state, payload) {
    state.token = payload;
  }
};

const actions = {
  init: function ({ commit }, authUser) {
    return new Promise(async (resolve, reject) => {
      if (authUser) {
        const { displayName, email, photoURL, uid } = authUser;
        const payload = { user: { displayName, email, photoURL, uid } };
        commit('SET_USER', payload.user);
      } else {
        commit('SET_USER', InitialState.user);
      }
      resolve(authUser);
    });
  },

  loginUserWithGoogle: function ({ commit }) {
    return new Promise((resolve, reject) => {
      Firebase.logInWithGoogle().then(payload => {
        if (payload.isNewUser) {
          Database.createUser(payload.user);
        }
        commit('SET_USER', payload.user);
        resolve(payload);
      }).catch(error => {
        console.error(error.code, error.message);
        commit('SET_USER', initialState.user);
        reject(error);
      });
    });
  },

  logoutUser: function ({ commit }) {
    return new Promise((resolve, reject) => {
      Firebase.signOutUser().then((success) => {
        localStorage.removeItem('token');
        commit('SET_USER', initialState.user);
        resolve(success);
      }).catch(error => {
        console.error(error.code, error.message);
        reject(error);
      });
    });
  },

  storeToken: function (_, payload) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('token', payload);
      if (localStorage.getItem('token') === payload) {
        resolve({ status: true, payload });
      } else {
        reject({ status: false, payload });
      }
    });
  }
};

const getters = {
  getCurrentUser: state => {
    return state.user;
  },
  getCurrentToken: state => {
    return state.token;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};