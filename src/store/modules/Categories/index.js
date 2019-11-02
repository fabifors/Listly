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
    if (localStorage.categories) {
      commit('REPLACE_CATEGORIES', localStorage.categories);
    } else {
      commit('REPLACE_CATEGORIES', INITIAL_STATE.categories);
    }
  },

  storeState ({ state }) {
    localStorage.categories = JSON.stringify(state.categories);
  },

  async addNewCategory ({ commit, dispatch }, { name, catId, listId }) {
    await commit('ADD_CATEGORY', { catId, name});
    commit('ADD_LIST_TO_CATEGORY', { catId, listId });
    commit('lists/UPDATE_LIST_CATEGORY', { catId, listId }, { root: true });
    dispatch('updateStorage', { root: true });
  },

  removeListFromCategory ({ commit, dispatch }, { catId, listId }) {
    commit('REMOVE_CATEGORY_FROM_LIST', { catId, listId });
    commit('lists/UPDATE_LIST_CATEGORY', { listId, catId: '' }, { root: true });
    dispatch('updateStorage', { root: true });
  },

  updateCategoryName ({ commit, dispatch }, { catId, name }) {
    commit('UPDATE_CATEGORY_NAME', { catId, name });
    dispatch('updateStorage', { root: true });
  }
};

const getters = {
  getAllListCategories: state => {
    return state.categories;
  },
  getListCategory: state => listId => {
    const categoryID = Object.keys(state.categories).filter(cat => state.categories[cat].lists.includes(listId));
    if(categoryID) {
      return state.categories[categoryID];
    } else {
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};