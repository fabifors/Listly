export default function Moderator (store) {
  store.subscribe(({type, payload}) => {
    switch(type) {
      // React on todo changes
      case 'todos/ADD_TODO': {
        const { todo_id, list_id } = payload;
        return store.dispatch('lists/addTodo', { todo_id, list_id }, { root: true});
      }
      case 'todos/REMOVE_TODO': {
        return store.dispatch('lists/removeTodo', payload, { root: true });
      }

      // Update list timestamp
      case 'lists/ADD_TODO': {
        return store.dispatch('lists/updateTimestamp', payload.list_id);
      }
      case 'lists/REMOVE_TODO': {
        return store.dispatch('lists/updateTimestamp', payload.list_id);
      }
      case 'lists/UPDATE_TITLE': {
        return store.dispatch('lists/updateTimestamp', payload.list_id);
      }
    }
  });
}