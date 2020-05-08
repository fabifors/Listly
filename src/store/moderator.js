import hash from '@/utilities/hash';

export default function Moderator (store) {
  store.subscribe(({ type, payload }) => {
    switch(type) {
      /**
       * React on all the Auth module changes
       */
      case 'auth/SET_USER': {
        if (payload && payload.user && payload.user.uid) {
          return store.dispatch('todos/initTodos', payload.user.uid, { root : true });
        } 
        break;
      }

      /**
       * React on all changes that happens in the todo module
       */
      case 'todos/ADD_TODO': {
        const { todo_id, list_id } = payload;
        return store.dispatch('lists/addTodo', { todo_id, list_id }, { root: true});
      }
      case 'todos/REMOVE_TODO': {
        return store.dispatch('lists/removeTodo', payload, { root: true });
      }

      /**
       * React on changes to the store that should update the timestamp
       */
      case 'lists/ADD_TODO': {
        return store.dispatch('lists/updateTimestamp', payload.list_id, { root: true });
      }
      case 'lists/REMOVE_TODO': {
        return store.dispatch('lists/updateTimestamp', payload.list_id, { root: true });
      }
      case 'lists/UPDATE_TITLE': {
        return store.dispatch('lists/updateTimestamp', payload.list_id, { root: true });
      }

      /**
       * React on different list module store commits
       */
      case 'lists/REMOVE_LIST': {
        return store.dispatch('todos/nukeTodos', payload, { root: true });
      }

      case 'lists/ADD_LIST': {
        const { category, list_id } = payload;
        if (category.id) {
          const _payload = {
            list_id,
            category_id: category.id
          };
          return store.dispatch('categories/addListToCategory', _payload, { root : true });
        }

        if (category.name && !category.id) {
          const _payload = {
            list_id,
            category_id: hash(),
            category_name: category.name
          };
          return store.dispatch('categories/addNewCategory', _payload, { root: true });
        }

        if(!category.name) {
          return;
        }
      }

      /**
       * React on all store changes that happens in the categories module
       */
      case 'categories/ADD_LIST_TO_CATEGORY': {
        return store.dispatch('lists/updateListCategory', payload, { root: true });
      }

      case 'categories/ADD_CATEGORY': {
        if (!payload.list_id) {
          return;
        }
        return store.dispatch('categories/addListToCategory', payload, { root: true });
      }

      case 'categories/DELETE_CATEGORY': {
        return store.dispatch('lists/removeCategoryFromLists', payload, { root: true });
      }

    }
  });
}
