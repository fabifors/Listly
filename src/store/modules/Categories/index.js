import INITIAL_STATE from '@/INITIAL_STATE';

const state = {
  categories: {},
};

const mutations = {
  ADD_CATEGORY (state, { name, catId }) {
    state.categories[catId] = {
      id: catId,
      name,
      lists: {}
    };
  },

  ADD_LIST_TO_CATEGORY (state, { list_id, category_id }) {
    const prevState = {
      ...state.categories
    };
    state.categories[category_id].lists = {
      [list_id]: true,
      ...prevState
    };
  },

  REMOVE_LIST_FROM_CATEGORY (state, { list_id, category_id }) {
    const prevState = {
      ...state.categories
    };
    delete prevState[category_id].lists[list_id];
    state.categories = {
      ...prevState
    };
  },

  DELETE_CATEGORY (state, id) {
    const prevState = {
      ...state.categories
    };
    delete prevState[id];
    state.categories = {
      ...prevState
    };
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

  addNewCategory ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('ADD_CATEGORY', payload);
      dispatch('storeCategories');
      resolve();
    });
  },

  removeListFromCategory ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_CATEGORY_FROM_LIST', payload);
      dispatch('storeCategories');
      resolve();
    });
  },

  updateCategoryName ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_CATEGORY_NAME', payload);
      dispatch('storeCategories');
      resolve();
    });
  }
};

const getters = {
  getAllListCategories: state => {
    function getObjectWithKey (key) {
      return {
        id: key,
        ...state.categories[key]
      };
    }
    return Object.keys(state.categories).map(getObjectWithKey);
  },

  getCategoryByName: state => name => {
    function categoryByName (id) {
      const item = state.categories[id].name.toLowerCase();
      return item === name.toLowerCase();
    }
    const result = Object.keys(state.categories).find(categoryByName);
    return result ? result : false;
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