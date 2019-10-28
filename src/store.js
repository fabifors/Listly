import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

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
      const todos = state.lists[listId].todos;
      const id = hash();
      todos.unshift({
        content: todo,
        done: false,
        editing: false,
        id: id,
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
    ADD_LIST (state, { listId, title, catId }) {
      const timestamp = Date.now();
      state.lists = {
        ...state.lists,
        [listId]: {
          title: title,
          id: listId,
          category: catId,
          todos: [],
          created: timestamp,
          updated: timestamp
        }
      };
    },

    REMOVE_LIST (state, list) {
      delete state.lists[list];
    },

    CHANGE_ACTIVE_LIST (state, list_ID) {
      state.currentList = list_ID;
    },

    CHANGE_LIST_TITLE (state, { title, listId }) {
      state.lists[listId].title = title;
    },

    UPDATE_LIST_CATEGORY (state, { listId, catId }) {
      state.lists[listId].category = catId;
    },

    REPLACE_LISTS (state, lists) {
      state.lists = lists;
    },

    UPDATE_TIMESTAMP (state, { listId, timestamp }) {
      state.lists[listId].updated = timestamp;
    },

    // Categories 
    ADD_CATEGORY (state, { name, catId }) {
      state.categories[catId] = {
        id: catId,
        name,
        lists: []
      };
    },

    ADD_LIST_TO_CATEGORY (state, { listId, catId }) {
      state.categories[catId].lists.push(listId);
    },

    REMOVE_LIST_FROM_CATEGORY (state, { listId, catId }) {
      const index = state.categories[catId].lists.indexOf(listId);
      state.categories[catId].lists.splice(index, 1);
    },

    DELETE_CATEGORY (state, id) {
      delete state.categories[id];
    },

    UPDATE_CATEGORY_NAME (state, { name, catId }) {
      state.categories[catId].name = name;
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

      if (!rootState.currentList) {
        router.push('/lists');
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
      dispatch('updateStorage');
    },

    /* List Actions */

    addList ({ commit, dispatch }, { title, cat }) {
      const listId = hash();
      if (!cat.name) {
        commit('ADD_LIST', { title, listId, cat: '' });
      } 
      if (!cat.id) {
        const catId = hash();
        dispatch('addNewCategory', { name: cat.name, catId, listId });
        commit('ADD_LIST', {title, listId, cat: catId});
      } else {
        commit('ADD_LIST', { title, listId, catId: cat.id });
        commit('ADD_LIST_TO_CATEGORY', { catId: cat.id, listId });
      }
      dispatch('updateStorage');
      commit('CHANGE_ACTIVE_LIST', listId);
    },

    removeList ({ commit, dispatch }, listId) {
      commit('REMOVE_LIST', listId);
      commit('CHANGE_ACTIVE_LIST', '');
      dispatch('updateStorage');
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
    },

    reorderLists ({ commit, dispatch }, lists) {
      commit('REPLACE_LISTS', lists);
      dispatch('updateStorage');
    },

    // Categories
    async addNewCategory ({ commit, dispatch }, { name, catId, listId }) {
      await commit('ADD_CATEGORY', { catId, name});
      commit('ADD_LIST_TO_CATEGORY', { catId, listId });
      commit('UPDATE_LIST_CATEGORY', { catId, listId });
      dispatch('updateStorage');
    },

    removeListFromCategory ({ commit, dispatch }, { catId, listId }) {
      commit('REMOVE_LIST_FROM_CATEGORY', { catId, listId });
      commit('UPDATE_LIST_CATEGORY', { listId, catId: '' });
      dispatch('updateStorage');
    },

    updateCategoryName ({ commit, dispatch }, { catId, name }) {
      commit('UPDATE_CATEGORY_NAME', { catId, name });
      dispatch('updateStorage');
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
      return state.categories;
    },
    getListCategory: state => listId => {
      const categoryID = Object.keys(state.categories).filter(cat => state.categories[cat].lists.includes(listId));
      if(categoryID) {
        return state.categories[categoryID];
      } else {
        return false;
      }
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
    },
    'kas2d-ad-a2d-a2d-2ae': {
      id: 'kas2d-ad-a2d-a2d-2ae',
      name: 'Lök',
      lists: ['as2-asd2-asd3-k2-asd4']
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
    },
    'as2-asd2-asd3-k2-asd4': {
      id: 'as2-asd2-asd3-k2-asd4',
      title: 'An Awesome List',
      category: 'kas2d-ad-a2d-a2d-2ae',
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
    },
    'as2-asd2-asd3-k2-asd1': {
      id: 'as2-asd2-asd3-k2-asd1',
      title: 'An Awesome List',
      category: '',
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