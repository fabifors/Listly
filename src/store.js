import Vue from 'vue';
import Vuex from 'vuex';

import { hash } from './functions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentList: '',
    todos: [
      {
        content: 'Example todo',
        done: false,
        editing: false,
        id: hash()
      }
    ],
    lists : [
      {
        id: hash(),
        title: 'My list',
        todos: [ 
          {
          content: 'Example todo 2',
          done: false,
          editing: false,
          id: hash()
          }
        ]
      }
    ]
  },
  mutations: {
    
    /* Todo mutations */
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
    },

    /* List Mutation */
    ADD_LIST (state, list) {
      state.lists.unshift({
        title: list,
        id: hash(),
        list: []
      });
    },
    REMOVE_LIST (state, list) {
      const index = state.lists.indexOf(list);
      state.lists.splice(index, 1);
    },
    UPDATE_LIST (state, update) {
      state.lists.find(li => li.id === update.id).todos = update.todos;
    },

    REPLACE_STATE(state, newState) {
      state.currentList = newState.currentList;
      state.todos = [ ...newState.todos ];
      state.lists = [ ...newState.lists ];
    }
  },
  actions: {
    init ({commit}) {
      if(localStorage.state) {
        commit('REPLACE_STATE', JSON.parse(localStorage.state)); 
      }
    },

    updateStorage () {
      localStorage.state = JSON.stringify(this.getters.getState);
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
    getState: state => {
      return state;
    },
    getTodos: state => {
      return state.todos;
    },
    getAllLists: state => {
      return state.lists;
    },
    getDoneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    getUnDoneTodos: state => {
      return state.todos.filter(todo => !todo.done);
    }
  }
});
