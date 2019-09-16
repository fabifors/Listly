<template>
  <div class="wrapper">
    <div id="app">
      <div class="layout-section">
        <new-todo />
      </div>
      <div class="layout-section">
        <to-dos />
      </div>
      <repo-information />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import NewTodo from './components/NewTodo';
import RepoInformation from './components/RepoInformation';

export default {
  name: 'TodoApp',
  components: {
    'repo-information': RepoInformation,
    'to-dos': Todos,
    'new-todo': NewTodo
  },
  mounted () {
    this.$store.dispatch('init');
  }
};
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
  padding-bottom: 10rem;
}

.wrapper {

  max-width: 700px;
  margin: 0 auto;
  position: relative;
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
