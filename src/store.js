import Vue from 'vue';
import Vuex from 'vuex';

import { hash } from './functions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        content: 'Example todo',
        done: false,
        editing: false,
        id: hash()
      }
    ]
  },
  mutations: {
    ADD_TODO (state, content) {
      state.todos.unshift({
        content,
        done: false,
        editing: false,
        id: hash()
      });
    },
    REMOVE_TODO (state, todo) {
      const index = state.todos.indexOf(todo);
      state.todos.splice(index, 1);
    },
    EDIT_TODO (state, todo) {
      const index = state.todos.indexOf(todo);
      state.todos[index].editing = true;
    },
    SAVE_TODO (state, { todo, update }) {
      const index = state.todos.indexOf(todo);
      state.todos[index].content = update;
      state.todos[index].editing = false;
    },
    MARK_DONE (state, todo) {
      const index = state.todos.indexOf(todo);
      state.todos[index].done = !state.todos[index].done;
    },
    REPLACE_TODOS (state, todos) {
      state.todos = [...todos];
    }
  },
  actions: {
    init ({commit}, todos) {
      if(localStorage.todos) {
        commit('REPLACE_TODOS', JSON.parse(localStorage.todos)); 
      }
    },

    updateStorage () {
      localStorage.todos = JSON.stringify(this.getters.getTodos);
    },

    addTodo ({ commit, dispatch }, todo) {
      commit('ADD_TODO', todo);
      dispatch('updateStorage');
    },

    removeTodo ({ commit, dispatch }, todo) {
      commit('REMOVE_TODO', todo);
      dispatch('updateStorage');
    },

    editTodo ({ commit, dispatch }, todo) {
      commit('EDIT_TODO', todo);
      dispatch('updateStorage');
    },

    saveTodo ({ commit, dispatch }, todo) {
      commit('SAVE_TODO', todo);
      dispatch('updateStorage');
    },

    markDone ({ commit, dispatch }, todo) {
      commit('MARK_DONE', todo);
      dispatch('updateStorage');
    },

    reorderTodos ({ commit, dispatch }, todos) {
      commit('REPLACE_TODOS', todos);
      dispatch('updateStorage');
    }
  },
  getters: {
    getTodos: state => {
      return state.todos;
    },
    getDoneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    getUnDoneTodos: state => {
      return state.todos.filter(todo => !todo.done);
    }
  }
});
