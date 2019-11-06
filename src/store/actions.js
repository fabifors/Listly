export default {
  init ({ dispatch }) {
    dispatch('lists/initLists', { root:true });
    dispatch('todos/initTodos', { root:true });
    dispatch('categories/initCategories', { root:true });
  },

  // updateStorage () {
  //   localStorage.state = JSON.stringify(this.getters.getState);
  // },

};