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
    reorder(list, type, list_id ) {
      switch(type){
        case 'lists': {
          console.log(list);
          const listObj = list.reduce((acc, item) => {
            const id = item.id;
            delete item.id;
            acc[id] = { ...item };
            return acc;
          }, {});
          this.$store.dispatch('lists/reorderLists', listObj, { root: true });
          break;
        }
        case 'todos': {
          const todos = list.reduce((acc, item) => {
            const id = item.id;
            acc[id] = true;
            return acc;
          }, {});
          const payload = {
            todos,
            list_id
          };
          this.$store.dispatch('lists/reorderTodos', payload, { root: true });
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