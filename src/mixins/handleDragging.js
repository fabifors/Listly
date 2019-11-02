import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      handleDrag: {
        sortedTodos: [],
        bool: false
      }
    };
  },
  methods: {
    dragStart(e, todos) {
      console.log('dragStart(): Todos comming in are: ', todos);
      this.handleDrag.sortedTodos = Array.from(todos);
    },
    sortEnd() {
      this.handleDrag.bool = true;
    },
    reorder(list, type, listId ) {
      switch(type){
        case 'lists': {
          console.log(list);
          const listObj = list.reduce((acc, item) => {
            acc[item.id] = { ...item };
            return acc;
          }, {});
          this.$store.dispatch('lists/reorderLists', listObj, { root: true });
          break;
        }
        case 'todos': {
          this.$store.dispatch('todos/reorderTodos', { list, listId }, { root: true });
          break;
        }
        default: {
          throw Error('reorder(): Must have valid type argument.');
        }
      }
      setTimeout(() => {
        this.handleDrag.bool = false;
      }, 10);
    }
  }
};