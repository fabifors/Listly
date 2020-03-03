import hash from '@/utilities/hash';
import INITIAL_STATE from '../../../INITIAL_STATE';
import view from './test.vue';

const state = {
  todos: {},
};

const mutations = {
  ADD_TODO (state, payload) {
    state.todos = {
      [payload.todo_id] : {
        content: payload.content,
        list_id: payload.list_id,
        done: false,
        editing: false,
      },
      ...state.todos,
    };
  },

  REMOVE_TODO (state, payload) {
    const prevState = { ...state };
    delete prevState[payload.todo_id];
    state.todos = {
      ...prevState
    };
  },

  NUKE_TODOS (state, payload) {
    const prevState = {
      ...state
    };
    for (let key in prevState) {
      if (prevState[key].list_id === payload.list_id) {
        delete prevState[key];
      }
    }
    state.todos = {
      ...prevState
    };
  },

  EDIT_TODO (state, todo_id) {
    state.todos[todo_id].editing = true;
  },

  SAVE_TODO (state, payload) {
    state.todos[payload.todo_id].content = payload.content;
    state.todos[payload.todo_id].editing = false;
  },

  MARK_DONE (state, todo_id) {
    state.todos[todo_id].done = true;
  },
  
  UNMARK_DONE (state, todo_id) {
    state.todos[todo_id].done = false;
  },

  REPLACE_TODOS (state, payload) {
    state.todos = { ...payload };
  },
};

const actions = {
  initTodos ({ commit }) {
    if (!localStorage.todos) {
      commit('REPLACE_TODOS', INITIAL_STATE.todos);
      return;
    }
    const payload = JSON.parse(localStorage.todos);
    commit('REPLACE_TODOS', payload);
  },

  storeTodos ({ state }) {
    localStorage.todos = JSON.stringify(state.todos);
  },

  addTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const todo_id = hash();
      payload = {
        ...payload,
        todo_id
      };
      commit('ADD_TODO', payload);
      dispatch('storeTodos');
      resolve();
    });
  },
  
  removeTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TODO', payload);
      dispatch('storeTodos');
      resolve();
    });
  },

  nukeTodos ({ commit , dispatch }, payload) {
    return new Promise((resolve, reject) => {
      
    });
  },
  
  editTodo ({ commit}, todo_id) {
    return new Promise((resolve, reject) => {
      commit('EDIT_TODO', todo_id);
      resolve();
    });
  },

  saveTodo ({ commit, dispatch }, payload = Object) {
    return new Promise((resolve, reject) => {
      commit('SAVE_TODO', payload);
      dispatch('storeTodos');
      resolve();
    });
  },

  markDone ({ commit, dispatch }, todo_id) {
    return new Promise((resolve, reject) => {
      commit('MARK_DONE', todo_id);
      dispatch('storeTodos');
      resolve();
    });
  },
  
  unmarkDone ({ commit, dispatch }, todo_id) {
    return new Promise((resolve, reject) => {
      commit('UNMARK_DONE', todo_id);
      dispatch('storeTodos');
      resolve();
    });
  },

  reorderTodos ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('REPLACE_TODOS', payload);
      dispatch('storeTodos');
      resolve();
    });
  },
};

const getters = {
  getListTodos: (state) => (_list_id) => {
    function listTodos (todo) {
      return state.todos[todo].list_id === _list_id;
    } 
    function getObjectWithKey(id) {
      return {
        id,
        ...state.todos[id]
      };
    }
    return Object.keys(state.todos).filter(listTodos).map(getObjectWithKey);
  },

  getListTodosFromObj: state => obj => {
    function getTodos(id) {
      return {
        id,
        ...state.todos[id]
      };
    }
    return Object.keys(obj).map(getTodos);
  },

  getAllTodos: state => {
    function getObjectWithKey (key) {
      return {
        id: key,
        ...state.todos[key]
      };
    }
    return Object.keys(state.todos).map(getObjectWithKey);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  view
};