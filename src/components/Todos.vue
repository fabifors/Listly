<template>
  <div class="wrapper">
    <sorted-list
      v-model="sortedTodos"
      :use-drag-handle="true"
      @sort-start="dragStart()"
      @input="dragEnd($event)"
    >
      <to-do
        v-for="(todo, index) in todos"
        v-show="todos"
        :key="index"
        :index="index"
        :todo="todo"
        :dragging="dragging"
      />
    </sorted-list>
  </div>
</template>

<script>
import Todo from './Todo';
import { mapGetters, mapState } from 'vuex';
import SortedList from './SortedList';
import { setTimeout } from 'timers';

export default {
  name: 'Todos',
  components: {
    'sorted-list': SortedList,
    'to-do': Todo
  },
  data: () => {
    return {
      sortedTodos: [],
      dragging: false
    };
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos'
    })
  },
  methods: {
    dragStart() {
      this.dragging = true;
      this.sortedTodos = Array.from(this.todos);
    },
    dragEnd(list) {
      this.$store.dispatch('reorderTodos', list);
      setTimeout(() => {
        this.dragging = false;
      }, 0);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  padding: 1rem;
  .todos {
    padding: 0;
    list-style: none;
    
  }
}


</style>
