<template>
  <div class="wrapper">
    <sorted-list
      :pressDelay="200"
      v-model="sortedTodos"
      @sort-start="dragStart()"
      @input="dragEnd($event)"
    >
      <to-do
        v-show="todos"
        v-for="(todo, index) in todos"
        :index="index"
        :key="index"
        :todo="todo"
      />
    </sorted-list>
  </div>
</template>

<script>
import Todo from './Todo'
import { mapGetters, mapState } from 'vuex'
import SortedList from './SortedList'

export default {
  name: 'Todos',
  props: {
    data: Array
  },
  data: () => {
    return {
      sortedTodos: []
    }
  },
  components: {
    'sorted-list': SortedList,
    'to-do': Todo
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos'
    })
  },
  methods: {
    dragStart() {
      this.sortedTodos = Array.from(this.todos)
    },
    dragEnd(list) {
      this.$store.dispatch('reorderTodos', list)
    }
  }
}
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
