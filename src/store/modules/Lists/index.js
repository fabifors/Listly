import hash from '@/utilities/hash';
import INITIAL_STATE from '@/INITIAL_STATE';

const state = {
  currentList: '',
  lists : {},
};

const mutations = {
  ADD_LIST (state, payload) {
    const timestamp = Date.now();
    state.lists = {
      ...state.lists,
      [payload.list_id]: {
        title: payload.title,
        id: payload.list_id,
        category: payload.category_id,
        todos: {},
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

  CHANGE_ACTIVE_LIST (state, list_id) {
    state.currentList = list_id;
  },

  CHANGE_LIST_TITLE (state, { title, list_id }) {
    state.lists[list_id].title = title;
  },

  UPDATE_LIST_CATEGORY (state, { list_id, cat_id }) {
    state.lists[list_id].category = cat_id;
  },

  REPLACE_LISTS (state, lists) {
    state.lists = lists;
  },

  UPDATE_TIMESTAMP (state, { list_id, timestamp }) {
    state.lists[list_id].updated = timestamp;
  },

  // ADD OR REMOVE TWO WAY CONNECTION TO TODOS
  ADD_TODO (state, payload) {
    const oldState = state.lists[payload.list_id].todos;
    state.lists[payload.list_id].todos = {
      ...oldState,
      [payload.todo_id]: true
    };
  },

  REMOVE_TODO (state, payload) {
    const newState = {
      ...state.lists[payload.list_id].todos
    };
    delete newState[payload.todo_id];
    state.lists[payload.list_id].todos = {
      ...newState
    };
  }

};

const actions = {
  initLists ({ commit }) {
    if (!localStorage.lists && !localStorage.currentList) {
      commit('REPLACE_LISTS', INITIAL_STATE.lists);
      return; 
    }
    const payload = {
      lists: JSON.parse(localStorage.lists),
      currentList: JSON.parse(localStorage.currentList)
    };
    commit('REPLACE_LISTS', payload.lists);
    commit('CHANGE_ACTIVE_LIST', payload.currentList);
  },

  storeLists ({ state }) {
    localStorage.lists = JSON.stringify(state.lists);
    localStorage.currentList = JSON.stringify(state.currentList);
  },

  addList ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject)=> {
      const list_id = hash();
      payload.list_id = list_id;
      commit('ADD_LIST', payload);
      dispatch('storeLists');
      resolve();
    });
    // const listId = hash();
    // if (!cat.name) {
    //   commit('ADD_LIST', { title, listId, cat: '' });
    // } 
    // if (!cat.id) {
    //   const catId = hash();
    //   dispatch('categories/addNewCategory', { name: cat.name, catId, listId }, { root: true });
    //   commit('ADD_LIST', {title, listId, cat: catId});
    // } else {
    //   commit('ADD_LIST', { title, listId, catId: cat.id });
    //   commit('categories/ADD_LIST_TO_CATEGORY', { catId: cat.id, listId }, { root: true });
    // }
    // dispatch('storeLists');
    // commit('CHANGE_ACTIVE_LIST', listId);
  },

  removeList ({ commit, dispatch }, listId) {
    return new Promise((resolve, reject)=> {
      commit('REMOVE_LIST', listId);
      commit('CHANGE_ACTIVE_LIST', '');
      dispatch('storeLists');
      resolve();
    });
  },

  changeList ({ commit }, listId) {
    return new Promise((resolve, reject)=> {
      commit('CHANGE_ACTIVE_LIST', listId);
      resolve();
    });
  },

  changeListTitle ({ commit, dispatch, rootState }, title) {
    return new Promise((resolve, reject)=> {
      const listId = rootState.currentList;
      commit('CHANGE_LIST_TITLE', title);
      dispatch('updateTimestamp', listId);
      dispatch('storeLists');
      resolve();
    })
  },

  updateTimestamp ({ commit }, listId) {
    return new Promise((resolve, reject)=> {
      const timestamp = new Date().getTime();
      commit('UPDATE_TIMESTAMP', { listId, timestamp });
      dispatch('storeLists');
      resolve();
    })
  },

  reorderLists ({ commit, dispatch }, lists) {
    return new Promise((resolve, reject)=> {
      commit('REPLACE_LISTS', lists);
      dispatch('storeLists');
      resolve();
    })
  },
  // TODO's
  addTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject)=> {
      commit('ADD_TODO', payload);
      dispatch('storeLists')
      resolve();
    })
  },

  removeTodo ({ commit, dispatch }, payload) {
    console.log(payload);
    return new Promise((resolve, reject) => {
      commit('REMOVE_TODO', payload);
      dispatch('storeLists');
      resolve();
    })
  }
};

const getters = {
  getCurrentListId: state => {
    return state.currentList;
  },

  getCurrentList: state => {
    return {
      id: state.currentList,
      ...state.lists[state.currentList]
    };
  },

  getAllLists: state => {
    function getObjectWithKey (key) {
      return {
        id: key,
        ...state.lists[key]
      };
    }
    return Object.keys(state.lists).map(getObjectWithKey);
  },

  getCurrentListTitle: state => {
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