import INITIAL_STATE from '@/INITIAL_STATE';

const state = {
  categories: {},
};

const mutations = {
  ADD_CATEGORY (state, { name, catId }) {
    state.categories[catId] = {
      id: catId,
      name,
      lists: []
    };
  },

  ADD_LIST_TO_CATEGORY (state, { listId, catId }) {
    state.categories[catId].lists.push(listId);
  },

  REMOVE_CATEGORY_FROM_LIST (state, { listId, catId }) {
    const index = state.categories[catId].lists.indexOf(listId);
    state.categories[catId].lists.splice(index, 1);
  },

  DELETE_CATEGORY (state, id) {
    delete state.categories[id];
  },

  UPDATE_CATEGORY_NAME (state, { name, catId }) {
    state.categories[catId].name = name;
  },

  REPLACE_CATEGORIES (state, payload) {
    state.categories = payload;
  }
};

const actions = {
  initCategories ({ commit }) {
    if (!localStorage.categories) {
      commit('REPLACE_CATEGORIES', INITIAL_STATE.categories);
      return;
    }
    const payload = JSON.parse(localStorage.categories);
    commit('REPLACE_CATEGORIES', payload);
  },

  storeCategories ({ state }) {
    localStorage.categories = JSON.stringify(state.categories);
  },

  async addNewCategory ({ commit, dispatch }, { name, catId, listId }) {
    await commit('ADD_CATEGORY', { catId, name});
    commit('ADD_LIST_TO_CATEGORY', { catId, listId });
    commit('lists/UPDATE_LIST_CATEGORY', { catId, listId }, { root: true });
    dispatch('storeCategories');
  },

  removeListFromCategory ({ commit, dispatch }, { catId, listId }) {
    commit('REMOVE_CATEGORY_FROM_LIST', { catId, listId });
    commit('lists/UPDATE_LIST_CATEGORY', { listId, catId: '' }, { root: true });
    dispatch('storeCategories');
  },

  updateCategoryName ({ commit, dispatch }, { catId, name }) {
    commit('UPDATE_CATEGORY_NAME', { catId, name });
    dispatch('storeCategories');
  }
};

const getters = {
  getAllListCategories: state => {
    return state.categories;
  },
  getCategoryById: state => id => {
    return state.categories[id];
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};