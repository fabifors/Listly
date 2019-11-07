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
      [payload.list_id]: {
        title: payload.title,
        id: payload.list_id,
        category: payload.category_id,
        todos: {},
        created: timestamp,
        updated: timestamp
      },
      ...state.lists,
    };
  },

  REMOVE_LIST (state, list) {
    const prevState = {
      ...state.lists
    };
    delete prevState[list];
    state.lists = {
      ...prevState
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

  REPLACE_LISTS (state, payload) {
    state.lists = payload;
  },

  UPDATE_TIMESTAMP (state, payload) {
    state.lists[payload.list_id].updated = payload.timestamp;
  },

  // ADD OR REMOVE TWO WAY CONNECTION TO TODOS
  ADD_TODO (state, payload) {
    const prevState = state.lists[payload.list_id].todos;
    state.lists[payload.list_id].todos = {
      [payload.todo_id]: true,
      ...prevState,
    };
  },

  REMOVE_TODO (state, payload) {
    const prevState = {
      ...state.lists[payload.list_id].todos
    };
    delete prevState[payload.todo_id];
    state.lists[payload.list_id].todos = {
      ...prevState
    };
  },

  REORDER_TODOS (state, payload) {
    state.lists[payload.list_id].todos = {
      ...payload.todos
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
  },

  removeList ({ commit, dispatch }, list_id) {
    return new Promise((resolve, reject)=> {
      commit('REMOVE_LIST', list_id);
      commit('CHANGE_ACTIVE_LIST', '');
      dispatch('storeLists');
      resolve();
    });
  },

  changeList ({ commit }, list_id) {
    return new Promise((resolve, reject)=> {
      commit('CHANGE_ACTIVE_LIST', list_id);
      resolve();
    });
  },

  changeListTitle ({ state, commit, dispatch }, title) {
    return new Promise((resolve, reject)=> {
      const list_id = state.currentList;
      commit('CHANGE_LIST_TITLE', title);
      dispatch('updateTimestamp', list_id);
      dispatch('storeLists');
      resolve();
    });
  },

  updateTimestamp ({ commit, dispatch }, list_id) {
    return new Promise((resolve, reject)=> {
      const payload = {
        timestamp: new Date().getTime(),
        list_id
      };
      commit('UPDATE_TIMESTAMP', payload);
      dispatch('storeLists');
      resolve();
    });
  },

  reorderLists ({ commit, dispatch }, lists) {
    return new Promise((resolve, reject)=> {
      commit('REPLACE_LISTS', lists);
      dispatch('storeLists');
      resolve();
    });
  },
  // TODO's
  addTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject)=> {
      commit('ADD_TODO', payload);
      dispatch('storeLists');
      resolve();
    });
  },

  removeTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TODO', payload);
      dispatch('storeLists');
      resolve();
    });
  },
  
  reorderTodos ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('REORDER_TODOS', payload);
      dispatch('storeLists');
      resolve();
    });
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

  getListTodos: state => list_id => {
    return state.lists[list_id].todos;
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