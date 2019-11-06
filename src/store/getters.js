export default {
  getState (state) {
    return state;
  },
  getListTodos: (state) => (id) => {
    return state.todos.filter(todo => todo.list_id === id);
  }
};