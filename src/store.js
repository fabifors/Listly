import Vue from 'vue';
import Vuex from 'vuex';

import { hash } from './functions';

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    currentList: '',
    lists : {},
    categories: {},
    theme: {
      color: 70,
      dark_mode: false
    }
  },
  mutations: {
    
    /* Todo mutations */
    ADD_TODO (state, { todo, listId }) {
      const timestamp = Date.now();
      const todos = state.lists[listId].todos;
      todos.unshift({
        content: todo,
        done: false,
        editing: false,
        id: hash(),
        created: timestamp,
        edited: timestamp
      });
    },

    REMOVE_TODO (state, { todo, listId }) {
      const index = state.lists[listId].todos.indexOf(todo);
      state.lists[listId].todos.splice(index, 1);
    },

    EDIT_TODO (state, { todo, listId }) {
      const index = state.lists[listId].todos.indexOf(todo);
      state.lists[listId].todos[index].editing = true;
    },

    SAVE_TODO (state, { todo, update, listId }) {
      const index = state.lists[listId].todos.indexOf(todo);
      state.lists[listId].todos[index].content = update;
      state.lists[listId].todos[index].editing = false;
    },

    MARK_DONE (state, { todo, listId }) {
      const index = state.lists[listId].todos.indexOf(todo);
      const stateTodo = state.lists[listId].todos[index];
      stateTodo.done = !stateTodo.done;
    },

    REPLACE_TODOS (state, { list , listId }) {
      state.lists[listId].todos = [...list];
    },

    /* List Mutation */
    ADD_LIST (state, id) {
      const timestamp = Date.now();
      state.lists = {
        ...state.lists,
        [id]: {
          title: 'List title',
          id,
          todos: [],
          created: timestamp,
          updated: timestamp
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

    CHANGE_LIST_TITLE (state, { title, listId }) {
      state.lists[listId].title = title;
    },

    UPDATE_TIMESTAMP (state, {listId, timestamp}) {
      state.lists[listId].updated = timestamp;
    },

    REPLACE_STATE(state, newState) {
      state.currentList = newState.currentList;
      state.lists = { ...newState.lists };
      state.categories = {...newState.categories};
    }
  },
  actions: {
    init ({ rootState, commit }) {
      if(localStorage.state) {
        commit('REPLACE_STATE', JSON.parse(localStorage.state)); 
      } else {
        commit('REPLACE_STATE', INITIAL_STATE);
      }

      // Maybe relocate user to list view if no current list is selected on boot.
      if (!rootState.currentList) {
        this.$router.replace('/lists');
      }
    },

    updateStorage () {
      localStorage.state = JSON.stringify(this.getters.getState);
    },

    /* Todo Actions */

    addTodo ({ commit, dispatch }, {todo, listId}) {
      commit('ADD_TODO', { todo, listId });
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    removeTodo ({ commit, dispatch }, {todo, listId}) {
      commit('REMOVE_TODO', {todo, listId});
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    editTodo ({ commit, dispatch }, {todo, listId}) {
      commit('EDIT_TODO', {todo, listId});
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    saveTodo ({ commit, dispatch }, {todo, update, listId}) {
      commit('SAVE_TODO', {todo, update, listId});
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    markDone ({ commit, dispatch }, { todo, listId }) {
      commit('MARK_DONE', { todo, listId });
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    reorderTodos ({ commit, dispatch }, { list, listId }) {
      commit('REPLACE_TODOS', { list, listId });
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    /* List Actions */

    addList ({ commit, dispatch }, title) {
      const id = hash();
      commit('ADD_LIST', {title, id});
      dispatch('updateStorage');
      commit('CHANGE_ACTIVE_LIST', id);
    },

    changeList ({ commit, dispatch }, listId) {
      commit('CHANGE_ACTIVE_LIST', listId);
      dispatch('updateStorage');
    },

    changeListTitle ({ commit, dispatch, rootState }, title) {
      const listId = rootState.currentList;
      commit('CHANGE_LIST_TITLE', title);
      dispatch('updateTimestamp', listId);
      dispatch('updateStorage');
    },

    updateTimestamp ({ commit }, listId) {
      const timestamp = new Date().getTime();
      commit('UPDATE_TIMESTAMP', { listId, timestamp });
    }
  },
  getters: {
    getState: state => {
      return state;
    },
    getCurrentListId: state => {
      return state.currentList;
    },
    getCurrentList: (state) => {
      return state.lists[state.currentList];
    },
    getAllLists: state => {
      return state.lists;
    },
    getListTitle: state => {
      if(state.currentList) {
        const title = state.lists[state.currentList].title;
        if(title){
          return title;
        }
      }
    },
    getAllListCategories: state => {
      console.log(state);
      return state.categories;
    }
  }
});

const INITIAL_STATE = {
  theme: {
    color: 70,
    dark_mode: false
  },
  currentList: '',
  categories: {
    'kas2d-ad-a2d-a2d-2ad': {
      id: 'kas2d-ad-a2d-a2d-2ad',
      name: 'Daily',
      lists: ['as2-asd2-asd3-k2-asd2']
    }
  },
  lists: {
    'as2-asd2-asd3-k2-asd2': {
      id: 'as2-asd2-asd3-k2-asd2',
      title: 'An Awesome List',
      category: 'kas2d-ad-a2d-a2d-2ad',
      todos: [
        {
          content: 'Code like a monkey',
          done: false,
          editing: false,
          id: hash()
        }, 
        {
          content: 'Pet the cat',
          done: false,
          editing: false,
          id: hash()
        },
        {
          content: 'Take a dump',
          done: false,
          editing: false,
          id: hash()
        },
        { 
          content: 'Make something useless',
          done: true,
          editing: false,
          id: hash()
        }
      ],
      created: new Date().getTime(),
      updated: new Date().getTime()
      
    }
  }
};