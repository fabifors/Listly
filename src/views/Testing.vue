<template>
  <div class="layout-section">
    <todo-testing />
  </div>
</template>

<script>
import todos from '@/store/modules/Todos';

export default {
  name: 'Testing',
  components: {
    'todo-testing': todos.view 
  },
  beforeCreate () {
    this.$store.dispatch('todos/initTodos', { root: true });
  }
};
</script>