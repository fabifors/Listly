import Vue from 'vue';
import Vuex from 'vuex';

import { hash } from './functions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentList: 'as2-asd2-asd3-k2-asd2',
    lists : {
      'as2-asd2-asd3-k2-asd2': {
        id: 'as2-asd2-asd3-k2-asd2',
        title: 'My list',
        todos: [
          {
            content: 'Example todo 1',
            done: false,
            editing: false,
            id: hash()
          }, 
          {
            content: 'Example todo 2',
            done: false,
            editing: false,
            id: hash()
          },
          {
            content: 'Example todo 3',
            done: false,
            editing: false,
            id: hash()
          },
          { 
            content: 'Example todo 4',
            done: false,
            editing: false,
            id: hash()
          }
        ]
      }
    }
  },
  mutations: {
    
    /* Todo mutations */
    ADD_TODO (state, content) {
      const todos = state.lists[state.currentList].todos;
      todos.unshift({
        content,
        done: false,
        editing: false,
        id: hash()
      });
    },
    REMOVE_TODO (state, todo) {
      const index = state.lists[state.currentList].todos.indexOf(todo);
      state.lists[state.currentList].todos.splice(index, 1);
    },
    EDIT_TODO (state, todo) {
      const index = state.lists[state.currentList].todos.indexOf(todo);
      state.lists[state.currentList].todos[index].editing = true;
    },
    SAVE_TODO (state, { todo, update }) {
      const index = state.lists[state.currentList].todos.indexOf(todo);
      state.lists[state.currentList].todos[index].content = update;
      state.lists[state.currentList].todos[index].editing = false;
    },
    MARK_DONE (state, todo) {
      const index = state.lists[state.currentList].todos.indexOf(todo);
      state.lists[state.currentList].todos[index].done = !state.todos[index].done;
    },
    REPLACE_TODOS (state, todos) {
      state.lists[state.currentList].todos = [...todos];
    },

    /* List Mutation */
    ADD_LIST (state, list) {
      const newListId = hash();
      state.lists = {
        ...state.lists,
        [newListId]: {
          title: list,
          id: newListId,
          list: []
        }
      };
    },

    REMOVE_LIST (state, list) {
      delete state.lists[list];
    },

    UPDATE_LIST_TODOS (state, update) {
      state.lists.find(list => list.id === update.id).todos = update.todos;
    },

    CHANGE_ACTIVE_LIST (state, list_ID) {
      state.currentList = list_ID;
    },

    REPLACE_STATE(state, newState) {
      state.currentList = newState.currentList;
      state.lists = { ...newState.lists };
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
    },

    changeList({commit, dispatch}, list_ID) {
      commit('CHANGE_ACTIVE_LIST', list_ID);
      dispatch('updateStorage');
    },
  },
  getters: {
    getState: state => {
      return state;
    },
    getCurrentList: (state) => {
      return state.lists[state.currentList];
    },
    getAllLists: state => {
      return state.lists;
    },
  }
});
