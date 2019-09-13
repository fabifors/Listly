<template>
  <div id="app">
    <div class="layout-section">
      <new-todo />
    </div>
    <div class="layout-section">
      <to-dos />
    </div>
    <footer-section />
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import NewTodo from './components/NewTodo'
import Footer from './components/Footer'

export default {
  name: 'TodoApp',
  components: {
    'footer-section': Footer,
    'to-dos': Todos,
    'new-todo': NewTodo
  },
  mounted () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body { margin: 0;}

#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 2rem;
  min-height: 100vh;
}

.layout-section {
  max-width: 700px;
  padding: 0 0.5rem;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 500px) {
    padding: 0 1.5rem;
  }
}
</style>
