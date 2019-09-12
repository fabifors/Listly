<template>
  <div id="app">
    <div class="layout-section">
      <new-todo />
    </div>
    <div class="layout-section">
      <to-dos />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import NewTodo from './components/NewTodo'

export default {
  name: 'TodoApp',
  components: {
    'to-dos': Todos,
    'new-todo': NewTodo
  },
  mounted () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 2rem;

  * {
    box-sizing: border-box;
  }
}

.layout-section {
  max-width: 700px;
  padding: 0 1rem;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 500px) {
    padding: 0 1.5rem;
  }
}
</style>
