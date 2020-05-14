import INITIAL_STATE from '@/INITIAL_STATE';
import { Database } from '@/firebase';

const state = {
  currentList: '',
  lists : {},
};

const mutations = {
  ADD_LIST (state, payload) {
    const prevState = { ...state.lists };
    state.lists = {
      [payload.list_id]: {
        title: payload.title,
        id: payload.list_id,
        category: '',
        todos: {},
        created: timestamp,
        updated: timestamp
      },
      ...prevState,
    };
  },

  REMOVE_LIST (state, payload) {
    const prevState = {
      ...state.lists
    };
    delete prevState[payload.list_id];
    state.lists = {
      ...prevState
    };
  },

  CHANGE_ACTIVE_LIST (state, payload) {
    state.currentList = payload.list_id;
  },

  CHANGE_LIST_TITLE (state, payload) {
    state.lists[payload.list_id].title = payload.title;
  },

  UPDATE_LIST_CATEGORY (state, payload) {
    state.lists[payload.list_id].category = payload.category_id;
  },

  REPLACE_LISTS (state, payload) {
    const lists = {};
    for ( let key in payload ) {
      lists[key] = { ...payload[key], id: key };
    }
    state.lists = lists;
  },

  UPDATE_TIMESTAMP (state, payload) {
    state.lists[payload.list_id].updated = payload.timestamp;
  },

  // ADD OR REMOVE TWO WAY CONNECTION WITH TODOS
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
  initLists ({ commit }, { uid, data }) {
    return new Promise((resolve, reject) => {
      if (typeof uid === 'undefined') {
        reject({ status: 'error', messsage: 'Invalid UID param' });
      }
      
      if (data === null) {
        // Create initial state
        const payload = { uid, data: INITIAL_STATE.lists };
        Database.init('lists', payload);
        commit('REPLACE_LISTS', payload.data);
        resolve({ status: 'success', message: 'Created new state.' });
      }
      
      const currentList = localStorage.getItem('currentList') || '';
      commit('REPLACE_LISTS', data);
      commit('CHANGE_ACTIVE_LIST', { list_id: currentList });
      resolve({ status: 'success', message: 'Data fetch complete!' });
    });
  },

  setLists ({commit}, payload) {
    commit('REPLACE_LISTS', payload);
  },

  storeCurrentList ({ state }) {
    localStorage.currentList = JSON.stringify(state.currentList);
  },

  addList ({ rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const timestamp = Date.now();
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid || !payload) reject('No valid payload/uid');

      const data = {
        ...payload,
        created: timestamp,
        updated: timestamp
      };
      Database.create('lists', { uid, data });
      resolve(data);
    });
  },

  removeList ({ rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid || !payload) reject('No valid payload/uid');

      Database.deleteOne('lists', { uid, key: payload.list_id });
      commit('CHANGE_ACTIVE_LIST', '');
      resolve();
    });
  },

  changeList ({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_ACTIVE_LIST', payload);
      dispatch('storeCurrentList');
      resolve();
    });
  },

  updateListCategory ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid || !payload) reject('No valid payload/uid');
      const data = { uid, key: payload.list_id, data: payload.category_id };
      
      try {
        Database.update('lists', data);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  
  removeCategoryFromLists ({ state, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      const updates = {/* [key]: category: null */};

      for (let key in state.lists) {
        let list = state.lists[key];
        if (list.category === payload.category_id) {
          updates[key] = { category: null };
        }
      }
      try {
        Database.updateAll('lists', { uid, updates });
        resolve({ uid, updates });
      } catch (error) {
        reject(error);
      }
    });
  },

  changeListTitle ({ rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      const timestamp = new Date().getTime();
      const data = { uid: uid, key: payload.list_id, data: { title: payload.title, updated: timestamp } };
      try {
        Database.update('lists', data);
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  },

  // updateTimestamp ({ commit, dispatch }, list_id) {
  //   return new Promise((resolve, reject)=> {
  //     const payload = {
  //       timestamp: new Date().getTime(),
  //       list_id
  //     };
  //     commit('UPDATE_TIMESTAMP', payload);
  //     dispatch('storeLists');
  //     resolve();
  //   });
  // },

  reorderLists ({ rootGetters }, lists) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid && !lists) reject('No valid UID or lists object');
      const data = { uid, data: { lists } };
      try {
        Database.replace('lists', data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
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
    if(state.currentList === '') return {};
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