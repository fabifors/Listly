import hash from '@/utilities/hash';
import INITIAL_STATE from '@/INITIAL_STATE';

const state = {
  currentList: '',
  lists : {},
};

const mutations = {
  ADD_LIST (state, { listId, title, catId }) {
    const timestamp = Date.now();
    state.lists = {
      ...state.lists,
      [listId]: {
        title: title,
        id: listId,
        category: catId,
        todos: [],
        created: timestamp,
        updated: timestamp
      }
    };
  },

  REMOVE_LIST (state, list) {
    const newState = {
      ...state.lists
    };
    delete newState[list];
    state.lists = {
      ...newState
    };
  },

  CHANGE_ACTIVE_LIST (state, list_ID) {
    state.currentList = list_ID;
  },

  CHANGE_LIST_TITLE (state, { title, listId }) {
    state.lists[listId].title = title;
  },

  UPDATE_LIST_CATEGORY (state, { listId, catId }) {
    state.lists[listId].category = catId;
  },

  REPLACE_LISTS (state, lists) {
    state.lists = lists;
  },

  UPDATE_TIMESTAMP (state, { listId, timestamp }) {
    state.lists[listId].updated = timestamp;
  },

};

const actions = {
  initLists ({ commit }) {
    if (localStorage.lists) {
      commit('REPLACE_LISTS', JSON.parse(localStorage.lists));
      if (localStorage.currentList) {
        commit('CHANGE_ACTIVE_LIST', JSON.parse(localStorage.currentList));
      }
    } else {
      commit('REPLACE_LISTS', INITIAL_STATE.lists);
    }
  },

  storeState ({ state }) {
    localStorage.lists = JSON.stringify(state.lists);
    localStorage.currentList = JSON.stringify(state.currentList);
  },

  addList ({ commit, dispatch }, { title, cat }) {
    const listId = hash();
    if (!cat.name) {
      commit('ADD_LIST', { title, listId, cat: '' });
    } 
    if (!cat.id) {
      const catId = hash();
      dispatch('categories/addNewCategory', { name: cat.name, catId, listId }, { root: true });
      commit('ADD_LIST', {title, listId, cat: catId});
    } else {
      commit('ADD_LIST', { title, listId, catId: cat.id });
      commit('categories/ADD_LIST_TO_CATEGORY', { catId: cat.id, listId }, { root: true });
    }
    dispatch('storeState');
    commit('CHANGE_ACTIVE_LIST', listId);
  },

  removeList ({ commit, dispatch }, listId) {
    commit('REMOVE_LIST', listId);
    commit('CHANGE_ACTIVE_LIST', '');
    dispatch('storeState');
  },

  changeList ({ commit }, listId) {
    commit('CHANGE_ACTIVE_LIST', listId);
  },

  changeListTitle ({ commit, dispatch, rootState }, title) {
    const listId = rootState.currentList;
    commit('CHANGE_LIST_TITLE', title);
    dispatch('updateTimestamp', listId);
    dispatch('storeState');
  },

  updateTimestamp ({ commit }, listId) {
    const timestamp = new Date().getTime();
    commit('UPDATE_TIMESTAMP', { listId, timestamp });
    dispatch('storeState');
  },

  reorderLists ({ commit, dispatch }, lists) {
    commit('REPLACE_LISTS', lists);
    dispatch('storeState');
  },
};

const getters = {
  getCurrentListId: state => {
    return state.currentList;
  },
  getCurrentList: state => {
    return state.lists[state.currentList];
  },
  getAllLists: state => {
    return state.lists;
  },
  getListTitle: state => {
    if(state.currentList) {
      const title = state.lists[state.currentList].title;
      if(title){
        return title;
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};