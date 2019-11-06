import Vue from 'vue';
import Vuex from 'vuex';

import INITIAL_STATE from '@/INITIAL_STATE';
import router from '@/router';

import Lists from './modules/Lists';
import Todos from './modules/Todos';
import Categories from './modules/Categories';
import Moderator from './moderator';

Vue.use(Vuex);

export default new Vuex.Store({
  state : {
    theme: {
      color: 70,
      dark_mode: false
    }
  },

  mutations: {
    REPLACE_STATE(state, newState) {
      state.currentList = newState.currentList;
      state.lists = { ...newState.lists };
      state.categories = {...newState.categories};
    }
  },

  actions: {
    init ({ commit }) {
      if(localStorage.state) {
        commit('REPLACE_STATE', JSON.parse(localStorage.state)); 
      } else {
        commit('REPLACE_STATE', INITIAL_STATE);
      }
  
      if (!localStorage.currentList) {
        router.push('/lists');
      }
    },
  },

  getters: {
    getState (state) {
      return state;
    },
  },

  modules: {
    todos: Todos,
    categories: Categories,
    lists: Lists,
  },

  plugins: [Moderator]
});