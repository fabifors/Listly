<template>
  <div class="wrapper">
    <ul class="todos">
      <to-do v-show="todos" v-for="(todo, index) in todos" :key="index" :todo="todo" />
    </ul>
  </div>
</template>

<script>
import Todo from './Todo'
import { mapGetters } from 'vuex'

export default {
  name: 'Todos',
  props: {
    data: Array
  },
  components: {
    'to-do': Todo
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos'
    })
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
