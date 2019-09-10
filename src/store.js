import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        content: '1st todo',
        done: false,
        editing: false
      }
    ]
  },
  mutations: {
    ADD_TODO(state, { content }) {
      state.todos.push({
        content,
        done: false,
        editing: false
      })
    },
    REMOVE_TODO(state, todo) {
      const index = state.todos.indexOf(todo)
      state.todos.splice(index, 1)
    },
    EDIT_TODO(state, todo) {
      const index = state.todos.indexOf(todo)
      state.todos[index].editing = true
    },
    SAVE_TODO(state, { todo, update }) {
      const index = state.todos.indexOf(todo)
      state.todos[index].content = update
      state.todos[index].editing = false
    },
    MARK_DONE(state, todo) {
      const index = state.todos.indexOf(todo)
      state.todos[index].done = !state.todos[index].done
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo)
    },
    removeTodo({ commit }, todo) {
      commit('REMOVE_TODO', todo)
    },
    editTodo({ commit }, todo) {
      commit('EDIT_TODO', todo)
    },
    saveTodo({ commit }, todo) {
      commit('SAVE_TODO', todo)
    },
    markDone({ commit }, todo) {
      commit('MARK_DONE', todo)
    }
  },
  getters: {
    getTodos: state => {
      return state.todos
    },
    getDoneTodos: state => {
      return state.todos.filter(todo => todo.done === true)
    }
  }
})
