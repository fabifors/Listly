import hash from '@/utilities/hash';
import INITIAL_STATE from '../../../INITIAL_STATE';

const state = {
  todos: {
    id: {
      content: 'This is the to-do',
      list_id: 'adwa-awd-a-2-2d-',
      done: false,
      editing: false
    },
    id: {
      content: 'This is the to-do',
      list_id: 'adwa-awd-a-2-2d-',
      done: false,
      editing: false
    },
    id: {
      content: 'This is the to-do',
      list_id: 'adwa-awd-a-2-2d-',
      done: false,
      editing: false
    },
  },
};

const mutations = {
  ADD_TODO (state, payload) {
    const todo_id = hash();
    state.todos[todo_id]({
      content: payload.content,
      list_id: payload.list_id,
      done: false,
      editing: false,
    });
  },

  REMOVE_TODO (state, todo_id) {
    delete state.todos[todo_id];
  },

  EDIT_TODO (state, todo_id) {
    state.todos[todo_id].editing = true;
  },

  SAVE_TODO (state, payload) {
    state.todos[payload.todo_id].content = payload.content;
    state.todos[payload.todo_id].editing = false;
  },

  MARK_DONE (state, todo_id) {
    state[todo_id].done = true;
  },
  
  UNMARK_DONE (state, todo_id) {
    state[todo_id].done = false;
  },

  REPLACE_TODOS (state, payload) {
    state.todos = payload;
  },
};

const actions = {
  initTodos () {
    if (!localStorage.todos) {
      state.todos = INITIAL_STATE.todos;
      return;
    }
    state.todos = JSON.parse(localStorage.todos);
  },

  storeTodos (state) {
    localStorage.todos = JSON.stringify(state.todos);
  },

  addTodo ({ commit, dispatch }, payload) {
    commit('ADD_TODO', payload.todo);
    dispatch('lists/updateTimestamp', payload.list_id, { root: true });
    dispatch('storeTodos');
  },

  removeTodo ({ commit, dispatch }, {todo, listId}) {
    commit('REMOVE_TODO', {todo, listId});
    dispatch('lists/updateTimestamp', listId, { root: true });
    dispatch('updateStorage', { root: true });
  },

  editTodo ({ commit, dispatch }, {todo, listId}) {
    commit('EDIT_TODO', {todo, listId});
    dispatch('lists/updateTimestamp', listId, { root: true });
    dispatch('updateStorage', { root: true });
  },

  saveTodo ({ commit, dispatch }, {todo, update, listId}) {
    commit('SAVE_TODO', {todo, update, listId});
    dispatch('lists/updateTimestamp', listId, { root: true });
    dispatch('updateStorage', { root: true });
  },

  markDone ({ commit, dispatch }, { todo, listId }) {
    commit('MARK_DONE', { todo, listId });
    dispatch('lists/updateTimestamp', listId, { root: true });
    dispatch('updateStorage', { root: true });
  },

  reorderTodos ({ commit, dispatch }, { list, listId }) {
    commit('REPLACE_TODOS', { list, listId });
    dispatch('updateStorage', { root: true });
  },
};

const getters = {
  
};

export default {
  namespaced: true,
  mutations,
  actions,
  getters
};