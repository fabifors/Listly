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
      return Database.create('lists', { uid, data }).then(res => resolve(res), reject);
    });
  },

  removeList ({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid || !payload) reject('No valid payload/uid');

      return Database.deleteOne('lists', { uid, key: payload.list_id }).then(res => {
        commit('CHANGE_ACTIVE_LIST', '');
        resolve(res);
      }, reject);
    });
  },

  changeList ({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_ACTIVE_LIST', payload);
      dispatch('storeCurrentList').then(res => resolve(res), reject);
    });
  },

  updateListCategory ({ rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid || !payload) reject('No valid payload/uid');

      const data = { uid, key: payload.list_id, data: payload.category_id };
      
      return Database.update('lists', data).then(res => resolve(res), reject);
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
      return Database.updateAll('lists', { uid, updates }).then(res => resolve(res), reject);     
    });
  },

  changeListTitle ({ rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      const timestamp = new Date().getTime();
      const data = { 
        uid,
        key: payload.list_id,
        data: { title: payload.title, updated: timestamp }
      };
      return Database.update('lists', data).then(res => resolve(res), reject);
    });
  },

  updateTimestamp ({ rootGetters }, list_id) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid && !list_id) reject('No valid UID or list id');

      const data = {
        uid,
        key: list_id,
        data: { timestamp: new Date().getTime() }
      };

      Database.update('lists', data)
        .then(res => resolve(res), reject);
    });
  },

  reorderLists ({ rootGetters }, lists) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid && !lists) reject('No valid UID or lists object');

      const data = { uid, data: { lists } };
      
      return Database.replace('lists', data).then(res => resolve(res), reject);
    });
  },

  // TODO's
  addTodo ({ rootGetters }, payload) {
    return new Promise((resolve, reject)=> {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid && !lists) reject('No valid UID or payload object');

      const { todo_id, list_id } = payload;
      const data = { uid, key: list_id, data: { [todo_id]: true } };

      return Database.update('lists', data)
        .then(res => resolve(res), reject);
    });
  },

  removeTodo ({ rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if (!uid && !lists) reject('No valid UID or payload object');

      const { todo_id, list_id } = payload;
      const data = { uid, key: list_id, data: { [todo_id]: null } };

      return Database.update('lists', data)
        .then(res => resolve(res), reject);
    });
  },
  
  reorderTodos ({ rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const uid = rootGetters['auth/getCurrentUser'].uid;
      if(!uid && !payload) reject('No valid UID or payload object');

      const { list_id, todos } = payload;
      const data = { uid, key: list_id, data: { todos } };
      
      return Database.update('lists', data)
        .then(res => resolve(res), reject);
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