export default function configureModerator (store, router) {
  store.subscribe(({type, payload}, state) => {
    switch(type) {
      case 'todos/ADD_TODO':
        delete payload.content
        return store.dispatch('lists/addTodo', payload, { root: true});

      case 'todos/REMOVE_TODO':
        return store.dispatch('lists/removeTodo', payload, { root: true });
    }
  });
}