import hash from '@/utilities/hash';
import INITIAL_STATE from '../../../INITIAL_STATE';
import view from './test.vue';

const state = {
  todos: {},
};

const mutations = {
  ADD_TODO (state, payload) {
    const todo_id = hash();
    state.todos = {
      ...state.todos,
      [todo_id] : {
        content: payload.content,
        list_id: payload.list_id,
        done: false,
        editing: false,
      }
    };
  },

  REMOVE_TODO (state, todo_id) {
    const newState = {
      ...state.todos
    };
    delete newState[todo_id];
    state.todos = {
      ...newState
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
    state.todos = payload;
  },
};

const actions = {
  initTodos ({ commit }) {
    if (!localStorage.todos) {
      commit('REPLACE_TODOS', INITIAL_STATE.todos);
      return;
    }
    console.log('Parsing JSON');
    const payload = JSON.parse(localStorage.todos);
    console.log('JSON Parsed: ', payload);
    commit('REPLACE_TODOS', payload);
  },

  storeTodos ({ state, commit }) {
    localStorage.todos = JSON.stringify(state.todos);
  },

  addTodo ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('ADD_TODO', payload);
      dispatch('storeTodos');
      resolve();
    });
  },
  
  removeTodo ({ commit, dispatch }, todo_id) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TODO', todo_id);
      dispatch('storeTodos');
      resolve();
    });
  },
  
  editTodo ({ commit}, todo_id) {
    return new Promise((resolve, reject) => {
      commit('EDIT_TODO', todo_id);
      resolve();
    });
  },

  saveTodo ({ commit, dispatch }, payload) {
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
  getListTodos: (state) => (id) => {
    function todosOwnedByList (todo) { 
      return state.todos[todo].list_id === id;
    }
    
    function todoObject (todo_id) { 
      return {...state.todos[todo_id], id: todo_id, };
    }

    return Object.keys(state.todos).filter(todosOwnedByList).map(todoObject);
  },
  getAllTodos: state => {
    return state.todos;
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